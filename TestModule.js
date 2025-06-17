// Kompletní obsah z minulé odpovědi, pro jistotu znovu:

import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const TestModule = ({
  module,
  currentQuestion,
  timeRemaining,
  progress,
  onAnswer,
  onNext,
  onPause,
}) => {
  const [localAnswer, setLocalAnswer] = useState('');
  const [stimulusVisible, setStimulusVisible] = useState(false);
  const [stimulusStartTime, setStimulusStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);
  const [displayMemoryStimulus, setDisplayMemoryStimulus] = useState(false);
  const [memoryStimulus, setMemoryStimulus] = useState('');
  const [memoryCorrectAnswer, setMemoryCorrectAnswer] = useState('');
  const user = useContext(UserContext);

  useEffect(() => {
    setLocalAnswer('');
    setStimulusVisible(false);
    setStimulusStartTime(null);
    setReactionTime(null);
    setMessage('');
    setDisplayMemoryStimulus(false);

    if (module.type === 'reaction-test') {
      const displayDelay = Math.random() * 2000 + 1000;
      setTimeout(() => {
        setStimulusVisible(true);
        setStimulusStartTime(performance.now());
      }, displayDelay);
    } else if (module.type === 'input-recall') {
      if (currentQuestion.id === 'qm1') {
        const generateRandomSequence = (length) => {
          let sequence = '';
          for (let i = 0; i < length; i++) {
            sequence += Math.floor(Math.random() * 10);
          }
          return sequence;
        };
        const randomNumbers = generateRandomSequence(7);
        setMemoryStimulus(randomNumbers.split('').join('-'));
        setMemoryCorrectAnswer(randomNumbers);
        setDisplayMemoryStimulus(true);
        setMessage('Zapamatujte si tuto sérii čísel.');
        setTimeout(() => {
          setDisplayMemoryStimulus(false);
          setMessage('Nyní zadejte čísla, která si pamatujete do pole níže.');
        }, 10000);
      }
    } else if (module.type === 'dynamic-adaptation') {
      setMessage('Připravte se na rychle se měnící instrukce!');
    }
  }, [currentQuestion, module.type]);

  useEffect(() => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    if (message) {
      messageTimeoutRef.current = setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [message]);

  const handleSubmitAnswer = () => {
    if (
      module.type !== 'reaction-test' &&
      module.type !== 'dynamic-adaptation' &&
      !localAnswer &&
      module.type !== 'input-recall'
    ) {
      setMessage('Prosím, vyberte/zadejte odpověď před pokračováním.');
      return;
    }
    if (module.type === 'reaction-test' && reactionTime === null && stimulusVisible) {
      setMessage('Prosím, klikněte na podnět pro záznam reakce.');
      return;
    }
    if (module.type === 'input-recall' && displayMemoryStimulus) {
      setMessage('Nejdříve si prosím zapamatujte čísla a počkejte na zobrazení pole pro zadání odpovědi.');
      return;
    }
    if (module.type === 'input-recall' && !displayMemoryStimulus && !localAnswer) {
      setMessage('Prosím, zadejte čísla, která si pamatujete.');
      return;
    }
    if (module.type === 'input-recall') {
      onAnswer(currentQuestion.id, {
        userAnswer: localAnswer,
        correctAnswer: memoryCorrectAnswer,
      });
    } else if (module.type === 'reaction-test') {
      onAnswer(currentQuestion.id, reactionTime);
    } else {
      onAnswer(currentQuestion.id, localAnswer);
    }
    onNext();
  };

  const handleReactionClick = () => {
    if (stimulusStartTime && stimulusVisible) {
      const endTime = performance.now();
      const measuredTime = endTime - stimulusStartTime;
      setReactionTime(measuredTime);
      setMessage(`Vaše reakční doba: ${measuredTime.toFixed(2)} ms`);
      setStimulusVisible(false);
    }
  };

  const renderQuestion = () => {
    switch (module.type) {
      case 'multiple-choice':
      case 'likert-scale':
      case 'scenario-choice':
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold">{currentQuestion.text}</p>
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={localAnswer === option}
                  onChange={(e) => setLocalAnswer(e.target.value)}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-3 text-base">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'reaction-test':
        return (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-300 rounded-lg h-64 bg-indigo-50">
            <p className="text-xl font-semibold mb-4 text-indigo-800">{currentQuestion.text.split(':')[0]}</p>
            {stimulusVisible ? (
              currentQuestion.id === 'pmr2' ? (
                <div
                  className="w-48 h-48 rounded-full bg-red-500 animate-pulse"
                  onClick={handleReactionClick}
                ></div>
              ) : (
                <button
                  onClick={handleReactionClick}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Klikněte zde!
                </button>
              )
            ) : reactionTime === null ? (
              <p className="text-gray-500">Čekám na stimul...</p>
            ) : null}
            {reactionTime !== null && (
              <p className="text-lg font-bold text-green-700 mt-4">
                Vaše reakční doba: {reactionTime.toFixed(2)} ms
              </p>
            )}
            <p className="text-sm text-gray-600 mt-4"> (Klikněte na podnět, jakmile se objeví)</p>
          </div>
        );
      case 'input-recall':
        return (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-300 rounded-lg h-64 bg-indigo-50">
            {displayMemoryStimulus ? (
              <p className="text-4xl font-bold text-indigo-800 animate-pulse">
                {memoryStimulus}
              </p>
            ) : (
              <>
                <p className="text-xl font-semibold mb-4 text-indigo-800">
                  Nyní zadejte čísla, která si pamatujete:
                </p>
                <input
                  type="text"
                  value={localAnswer}
                  onChange={(e) => setLocalAnswer(e.target.value)}
                  className="shadow appearance-none border rounded-lg w-full max-w-xs py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                  placeholder="Zadejte, co si pamatujete..."
                />
                <p className="text-sm text-gray-600 mt-4"> (Zadejte sérii čísel bez mezer a pomlček)</p>
              </>
            )}
          </div>
        );
      case 'dynamic-adaptation':
        return (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-300 rounded-lg h-64 bg-indigo-50">
            <p className="text-xl font-semibold mb-4 text-indigo-800">{currentQuestion.text}</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setLocalAnswer('blue')} className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600">Modrá</button>
              <button onClick={() => setLocalAnswer('green')} className="bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600">Zelená</button>
              <button onClick={() => setLocalAnswer('yellow')} className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow hover:bg-yellow-600">Žlutá</button>
              <button onClick={() => setLocalAnswer('red')} className="bg-red-500 text-white py-3 px-6 rounded-lg shadow hover:bg-red-600">Červená</button>
            </div>
            <p className="text-sm text-gray-600 mt-4"> (Simulace - klikněte na libovolnou barvu pro pokračování)</p>
          </div>
        );
      default:
        return <p>Typ otázky není podporován.</p>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center text-indigo-600">{module.title}</h2>
      <p className="text-center text-gray-600 mb-6">{module.description}</p>
      <div className="flex justify-between items-center mb-6">
        <div className="w-3/4 bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-lg font-mono text-gray-700 ml-4">
          Čas: {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-4">Průběh testu: {progress}% hotovo</p>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
        <p className="text-sm text-gray-500 mb-2">Otázka {currentQuestion.id} (Modul: {module.id})</p>
        {renderQuestion()}
      </div>
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onPause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-300 transform hover:scale-105"
        >
          Přerušit a pokračovat později
        </button>
        <button
          onClick={handleSubmitAnswer}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            (['multiple-choice', 'likert-scale', 'scenario-choice'].includes(module.type) && !localAnswer) ||
            (module.type === 'input-recall' && (displayMemoryStimulus || !localAnswer)) ||
            (module.type === 'reaction-test' && reactionTime === null && stimulusVisible)
          }
        >
          Pokračovat
        </button>
      </div>
    </div>
  );
};

export default TestModule;