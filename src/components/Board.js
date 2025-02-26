import React, { useContext } from "react";
import { AppContext } from "../App";
import SongName from "./SongName";
import SongAlbum from "./SongAlbum";
import SongNumber from "./SongNumber";
import SongLength from "./SongLength";
import SongFeatures from "./SongFeatures";

function Board() {
    const { currAttempt } = useContext(AppContext);
    const totalRows = 8; // total possible guesses
  
    return (
      <div className="board">
        {Array.from({ length: totalRows }).map((_, index) => {
          // Only render rows with index <= currAttempt.attempt
          if (index > currAttempt.attempt - 1) return null;
          return (
            <div className="row" key={index}>
              <SongName attemptValue={index} />
              <SongAlbum attemptValue={index} />
              <SongNumber attemptValue={index} />
              <SongLength attemptValue={index} />
              <SongFeatures attemptValue={index} />
            </div>
          );
        })}
      </div>
    );
  }

export default Board;