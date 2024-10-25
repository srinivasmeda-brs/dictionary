import { useState, useEffect } from "react";
import "./index.css";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  const getData = async () => {
    if (!word) return;

    setLoading(true);
    setError(null);

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setDefinition(data[0]); // Get the first entry for simplicity
    } catch (err) {
      setError(err.message);
      setDefinition(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="dictionary-container">
      <h1>Dictionary</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={word}
          placeholder="Enter a word"
          onChange={(e) => setWord(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loader"></div>} {/* Loader component */}

      {error && <p className="error">{error}</p>}

      {definition && (
        <div className="definition-container">
          <h2 className="word-title">{definition.word}</h2>
          <p className="phonetic">{definition.phonetic}</p>
          <h3>Meaning:</h3>
          {definition.meanings.map((meaning, index) => (
            <div key={index} className="meaning">
              <p className="part-of-speech">{meaning.partOfSpeech}</p>
              <ul>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx}>{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
