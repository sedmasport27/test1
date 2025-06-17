import React from 'react';

const IntroductionScreen = ({ onStartTest }) => (
  <div className="text-center p-6">
    <h1 className="text-4xl font-bold text-indigo-700 mb-4 rounded-lg p-2">Psychologický test pro uchazeče o Policii ČR</h1>
    <p className="text-lg mb-8">
      Tento komplexní psychologický test posuzuje vaše kognitivní, osobnostní a psychomotorické předpoklady
      nezbytné pro výkon služby u Policie České republiky.
    </p>
    <button
      onClick={onStartTest}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      Začít test
    </button>
    <div className="mt-8 text-sm text-gray-500">
      Jazykové rozhraní: <span className="font-semibold">Čeština</span> / English (pouze pro demo)
    </div>
  </div>
);

export default IntroductionScreen;