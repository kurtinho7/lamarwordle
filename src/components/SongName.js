import React, {useContext} from 'react'
import { AppContext } from '../App';

function SongName({attemptValue}) {
    const {board, correctSong} = useContext(AppContext);
    const songName = board[attemptValue][0];

    const correct = songName === correctSong.songName;
    const almost = false;

    const cellState = correct ? "correct" : almost ? "almost" : "error";
    
  return (
    <div className="songname" id={cellState}>{songName}</div>
  )
}

export default SongName