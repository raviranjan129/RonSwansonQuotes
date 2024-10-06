import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the current quote and the saved quotes
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Function to fetch a random quote from the API
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  // Function to save the current quote to the saved list
  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full text-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Ron Swanson Quotes</h1>
        <p className="text-lg italic mb-6">{quote ? quote : 'Loading...'}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={fetchQuote}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Get New Quote
          </button>
          <button
            onClick={saveQuote}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Save to List
          </button>
        </div>
      </div>

      {/* Saved Quotes Section */}
      <div className="w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Saved Quotes</h2>
        {savedQuotes.length === 0 ? (
          <p className="text-gray-400">No quotes saved yet.</p>
        ) : (
          <div className="space-y-4">
            {savedQuotes.map((savedQuote, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
              >
                <p className="italic">{savedQuote}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
