import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';

function TextBox({ onSubmit }) {
  const [songName, setSongName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { board, setBoard, currAttempt, setCurrAttempt, songs } = useContext(AppContext);




  const handleChange = (e) => {
    const input = e.target.value;
    setSongName(input);
    console.log('User input:', input);

    if (input.length > 0) {
      const filtered = songs.filter(song =>
        song.songName.toLowerCase().includes(input.toLowerCase())
      );
      console.log('Filtered suggestions:', filtered);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedSongName) => {
    setSongName(suggestedSongName);
    setSuggestions([]);
  };

  const searchSongByName = (songs, guess) => {
    if (!guess || typeof guess !== 'string') {
      console.error('searchSongByName: Invalid guess provided:', guess);
      return undefined;
    }
    const normalizedGuess = guess.trim().toLowerCase();
    return songs.find(song => song.songName.toLowerCase() === normalizedGuess);
  };

  const guessSong = (guessInput) => {
    const songGuess = searchSongByName(songs, guessInput);

    if (!songGuess) {
      alert('Song not found. Please check your spelling or try another song.');
      return;
    }

    // Copy the board so we can update it
    const newBoard = [...board];
    newBoard[currAttempt.attempt][0] = songGuess.songName;
    newBoard[currAttempt.attempt][1] = songGuess.album;
    newBoard[currAttempt.attempt][2] = songGuess.songNumber;
    newBoard[currAttempt.attempt][3] = songGuess.songLength;
    newBoard[currAttempt.attempt][4] = songGuess.features;

    setBoard(newBoard);
    setCurrAttempt({ attempt: currAttempt.attempt + 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guessSong(songName);
    setSongName('');
    setSuggestions([]);
  };

  return (
    <div className="textbox-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Song Name"
          value={songName}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit">Guess</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((song, idx) => (
            <li key={idx} onClick={() => handleSuggestionClick(song.songName)}>
              {song.songName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TextBox;
