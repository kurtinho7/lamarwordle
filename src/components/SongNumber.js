import React, {useContext} from 'react'
import { AppContext } from '../App';

function SongNumber({attemptValue}) {
    const {board, correctSong} = useContext(AppContext);
    const songNumber = board[attemptValue][2];



    const correct = correctSong.songNumber === songNumber;
    const almost = songNumber > 0 && (Math.abs(songNumber - correctSong.songNumber) <= 3 && Math.abs(songNumber - correctSong.songNumber) !== 0);

    const cellState = correct ? "correct" : almost ? "almost" : "error";

  return (
    <div className="songnumber" id={cellState}>{songNumber}</div>
  )
}

export default SongNumber