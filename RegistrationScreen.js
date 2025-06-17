import React, { useState } from 'react';

const RegistrationScreen = ({ onRegister, onAnonymousLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email });
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Registrace / Anonymní režim</h2>
      <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto">
        <div className="mb-4 text-left">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Jméno (volitelné):</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vaše jméno"
          />
        </div>
        <div className="mb-6 text-left">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail (volitelný):</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vas.email@example.com"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 w-full mb-4"
        >
          Pokračovat s registrací
        </button>
      </form>
      <div className="relative flex py-5 items-center max-w-md mx-auto">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500">NEBO</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button
        onClick={onAnonymousLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-md"
      >
        Pokračovat anonymně
      </button>
      <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
        Pokud budete pokračovat anonymně, bude vám vygenerován unikátní kód pro identifikaci vašich výsledků.
      </p>
    </div>
  );
};

export default RegistrationScreen;