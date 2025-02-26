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
            // 1. Get Spotify access token
            const token = await fetchSpotifyToken();
    
            // 2. Fetch Kendrick Lamar's albums
            const albums = await fetchKendrickAlbums(token);
    
            // 3. Get and enrich tracks from all albums
            const allTracks = await getAllTracks(token, albums);
            setSongs(allTracks);
    
            // 4. Randomly choose one song as the correct answer for the game
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
    
      if (loading) {
        return <div>Loading...</div>;
      }


  return (
    <div className="App">
        <nav>
            <h1>Lamardle</h1>
        </nav>
        <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, correctSong, songs, setSongs}}>
            <div className="game">
                <TextBox />
                <Board />
            </div>
        </AppContext.Provider>
    </div>
  );
}





export default App;
