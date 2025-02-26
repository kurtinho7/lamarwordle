import React, {useContext} from 'react'
import { AppContext } from '../App';
import { formatDuration } from '../Songs'

function SongLength({attemptValue}) {
    const {board, correctSong} = useContext(AppContext);
    const songLength = board[attemptValue][3];

    const correct = songLength === correctSong.songLength;
    const almost = (songLength > 0) && (Math.abs(songLength - correctSong.songLength) <= 30000);

    const cellState = correct ? "correct" : almost ? "almost" : "error";

    const songLengthFormatted = formatDuration(songLength);
    

  return (
    <div className="songlength" id={cellState}>{songLengthFormatted}</div>
  )
}

export default SongLength