import './App.css';
import Board from './components/Board';
import { createContext, useState, useEffect } from 'react';
import { boardDefault } from './Words';
import TextBox from './components/TextBox';
import {
    fetchSpotifyToken,
    fetchKendrickAlbums,
    getAllTracks,
  } from './Songs';
import HeaderRow from './components/HeaderRow';

export const AppContext = createContext();

export const searchSongByName = (songs, guess) => {
    // Ensure guess is a non-empty string
    if (!guess || typeof guess !== 'string') {
      console.error('searchSongByName: Invalid guess provided:', guess);
      return undefined;
    }
    const normalizedGuess = guess.trim().toLowerCase();
    return songs.find(song => {
      // Check if songName exists and is a string before calling toLowerCase()
      if (!song.songName || typeof song.songName !== 'string') {
        return false;
      }
      return song.songName.toLowerCase() === normalizedGuess;
    });
  };


function App() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0});
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [correctSong, setCorrectSong] = useState([]);



    useEffect(() => {
        const fetchSongs = async () => {
          try {
            const token = await fetchSpotifyToken();
    
            const albums = await fetchKendrickAlbums(token);
    
            const allTracks = await getAllTracks(token, albums);
            setSongs(allTracks);
    
            const randomSong = allTracks[Math.floor(Math.random() * allTracks.length)];
            setCorrectSong(randomSong);
            console.log(randomSong.songName);
          } catch (error) {
            console.error('Error fetching songs:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchSongs();
      }, []);
    
    


  return (
    <div className="App">
        <nav>
            <h1>Lamardle</h1>
        </nav>
        <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, correctSong, songs, setSongs}}>
            <div className="game">
                <h1>Guess The Kendrick Song</h1>
                <TextBox />
                <HeaderRow />
                <Board />
            </div>
        </AppContext.Provider>
    </div>
  );
}





export default App;
