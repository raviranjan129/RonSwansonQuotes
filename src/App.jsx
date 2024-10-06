import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Ron Swanson Quotes</h1>
        <p className="text-lg italic mb-6">{quote ? quote : 'Loading...'}</p>
        <button
          onClick={fetchQuote}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
