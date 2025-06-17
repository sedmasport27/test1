import React, { useState } from 'react';
import mockTestModules from '../data/mockTestModules';

const ResultsScreen = ({ answers, user }) => {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const generateAnalysis = async () => {
    setIsLoadingResults(true);
    setAiAnalysis(null);

    const simplifiedAnswers = Object.entries(answers).map(([moduleId, moduleAnswers]) => {
      const module = mockTestModules.find(m => m.id === moduleId);
      const moduleTitle = module?.title || moduleId;
      const questionDetails = Object.entries(moduleAnswers).map(([questionId, answer]) => {
        const question = module?.questions.find(q => q.id === questionId);
        const questionText = question?.text || questionId;
        if (moduleId === 'cognitive-memory' && typeof answer === 'object' && answer.userAnswer) {
          return `- ${questionText}: Uživatelská odpověď: "${answer.userAnswer}", Správná odpověď: "${answer.correctAnswer}"`;
        } else if (typeof answer === 'number') {
          return `- ${questionText}: ${answer.toFixed(2)} ms`;
        }
        return `- ${questionText}: ${answer}`;
      }).join('\n');
      return `Modul ${moduleTitle}:\n${questionDetails}`;
    }).join('\n\n');

    const prompt = `Vyhodnoťte následující odpovědi uchazeče na psychologický test pro Policii ČR. Zaměřte se na kognitivní schopnosti, osobnostní rysy a psychomotorické dovednosti. Poskytněte stručné shrnutí silných stránek a doporučení pro pohovor. Použijte češtinu.
    \n--- Odpovědi uchazeče ---\n${simplifiedAnswers}`;

    try {
      setAiAnalysis('Demo: AI analýza není v této ukázce dostupná.');
    } catch (error) {
      setAiAnalysis('Nepodařilo se vygenerovat analýzu kvůli chybě s API.');
    } finally {
      setIsLoadingResults(false);
    }
  };

  const calculateScore = () => {
    let score = {
      cognitive: 0,
      personality: 0,
      psychomotor: [],
      policeSpecific: 0,
    };

    mockTestModules.forEach(module => {
      if (answers[module.id]) {
        Object.entries(answers[module.id]).forEach(([questionId, userAnswer]) => {
          const question = module.questions.find(q => q.id === questionId);

          if (question) {
            switch (module.id) {
              case 'cognitive-verbal':
              case 'cognitive-numerical':
              case 'cognitive-logical':
              case 'cognitive-attention':
              case 'cognitive-decision':
                if (question.correctAnswer && userAnswer === question.correctAnswer) {
                  score.cognitive += 1;
                }
                break;
              case 'cognitive-memory':
                if (typeof userAnswer === 'object' && userAnswer.userAnswer && userAnswer.correctAnswer) {
                  const cleanedUserAnswer = userAnswer.userAnswer.replace(/-/g, '');
                  if (cleanedUserAnswer === userAnswer.correctAnswer) {
                    score.cognitive += 1;
                  }
                }
                break;
              case 'personality-stress':
              case 'personality-emotional-stability':
              case 'personality-social-intelligence':
              case 'personality-moral-integrity':
              case 'personality-assertiveness':
                if (question.scoringMap && userAnswer in question.scoringMap) {
                  score.personality += question.scoringMap[userAnswer];
                }
                break;
              case 'psychomotor-reaction':
                if (typeof userAnswer === 'number') {
                  score.psychomotor.push(userAnswer);
                }
                break;
              case 'psychomotor-adaptation':
                if (userAnswer) {
                  // placeholder
                }
                break;
              case 'police-conflict':
              case 'police-pressure':
              case 'police-ethics':
                if (question.correctAnswer && userAnswer === question.correctAnswer) {
                  score.policeSpecific += 1;
                }
                break;
              default:
                break;
            }
          }
        });
      }
    });

    return score;
  };

  const scores = calculateScore();
  const averageReactionTime = scores.psychomotor.length > 0
    ? (scores.psychomotor.reduce((sum, time) => sum + time, 0) / scores.psychomotor.length).toFixed(2)
    : 'N/A';

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">Výsledky testu</h2>
      <p className="text-lg text-gray-700 mb-6">
        Děkujeme za vyplnění psychologického testu, {user?.name || 'anonymní uživateli'}!
      </p>

      <div className="bg-indigo-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold mb-3 text-indigo-600">Souhrnný profil</h3>
        <p className="text-xl font-bold text-indigo-800">Celkové kognitivní skóre: {scores.cognitive} bodů</p>
        <p className="text-xl font-bold text-indigo-800">Celkové osobnostní skóre: {scores.personality} bodů</p>
        <p className="text-xl font-bold text-indigo-800">Průměrná reakční doba: {averageReactionTime} ms</p>
        <p className="text-xl font-bold text-indigo-800">Policejní specifické skóre: {scores.policeSpecific} bodů</p>
        <p className="text-gray-600 mt-2">
          (Detailní vyhodnocení by proběhlo interně na základě psychometrických norem.)
        </p>

        <div className="mt-6">
          <button
            onClick={generateAnalysis}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoadingResults}
          >
            {isLoadingResults ? 'Generuji analýzu...' : 'Generovat AI analýzu výsledků'}
          </button>
          {isLoadingResults && (
            <p className="text-gray-500 mt-2">Prosím, počkejte, generuji detailní AI analýzu...</p>
          )}
          {aiAnalysis && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg text-left border border-purple-200">
              <h4 className="text-xl font-semibold text-purple-700 mb-2">AI analýza:</h4>
              <p className="whitespace-pre-wrap">{aiAnalysis}</p>
              <p className="text-sm text-gray-500 mt-4">
                (Analýza generovaná AI modelem Gemini-2.0-flash)
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-base mb-4">
        Váš interní profil pro psychologa (obsahující detailnější metriky) bude automaticky vygenerován a uložen
        do systému pro další zpracování.
      </p>
      <p className="text-gray-600 text-base">
        Brzy vás budeme kontaktovat s dalšími kroky ve výběrovém řízení.
      </p>

      <button
        className="mt-8 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={() => console.log('Simulace stažení PDF profilu')}
      >
        Stáhnout Souhrnný profil (PDF) - Demo
      </button>
    </div>
  );
};

export default ResultsScreen;