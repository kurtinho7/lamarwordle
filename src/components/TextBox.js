import React, { useState, useContext } from 'react'
import { AppContext } from '../App';
import {searchSongByName} from '../App'
import {
    fetchSpotifyToken,
    fetchKendrickAlbums,
    getAllTracks,
    fetchSongDataByGuess
  } from '../Songs';

function TextBox({onSubmit}) {
    const [songName, setSongName] = useState('');

    const {board, setBoard, currAttempt, setCurrAttempt, songs, setSongs, correctSong} = useContext(AppContext);


    const handleChange = (e) => {
        setSongName(e.target.value);
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
        // Do something with the song name, for example, pass it to a parent component
        guessSong(songName);
        // Clear the textbox after submission (optional)
        setSongName('');
      };

  return (
    <div className="songname">
        <form onSubmit={handleSubmit}>
        <input
            type = "text"
            placeholder = "Enter Song Name"
            value = {songName}
            onChange = {handleChange}
        />
        <button type ="submit">Guess</button>

        </form>
    </div>
  );
}



export default TextBox