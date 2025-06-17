import React, { useState } from 'react';

const ConsentScreen = ({ onConsent }) => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-indigo-600">Informovaný souhlas</h2>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm h-64 overflow-y-auto mb-6">
        <p className="mb-2">Vážený uchazeči/uchazečko,</p>
        <p className="mb-2">tímto potvrzujete, že jste byl/a seznámen/a s účelem a průběhem psychologického testování pro uchazeče o práci u Policie České republiky.</p>
        <ul className="list-disc list-inside mb-2">
          <li>Účelem testování je posouzení vašich předpokladů pro výkon služby.</li>
          <li>Veškeré získané údaje jsou důvěrné a budou použity výhradně pro účely výběrového řízení.</li>
          <li>Data jsou zpracovávána v souladu s platnými právními předpisy ČR a nařízením GDPR.</li>
          <li>Máte právo na přístup ke svým osobním údajům a jejich opravu.</li>
        </ul>
        <p className="mb-2">Vyplněním a odesláním testu dáváte svůj informovaný souhlas se zpracováním vašich osobních a testových dat pro uvedené účely.</p>
        <p className="mb-2">Pro více informací si můžete stáhnout kompletní text souhlasu zde: <a href="/souhlas.pdf" target="_blank" className="text-indigo-600 hover:underline">Stáhnout PDF souhlasu</a> (demo odkaz)</p>
        <p className="font-semibold mt-4">Děkujeme za vaši spolupráci.</p>
      </div>
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="consentCheckbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="form-checkbox h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"
        />
        <label htmlFor="consentCheckbox" className="ml-2 text-base font-medium">Souhlasím s podmínkami testování</label>
      </div>
      <button
        onClick={onConsent}
        disabled={!agreed}
        className={`w-full py-3 px-6 rounded-full font-bold transition-all duration-300 ${
          agreed ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transform hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Pokračovat k registraci
      </button>
    </div>
  );
};

export default ConsentScreen;