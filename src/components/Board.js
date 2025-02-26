import React, { useContext } from "react";
import { AppContext } from "../App";
import SongName from "./SongName";
import SongAlbum from "./SongAlbum";
import SongNumber from "./SongNumber";
import SongLength from "./SongLength";
import SongFeatures from "./SongFeatures";

function Board() {
  return (
    <div className="board">
      {" "}
      <div className="row">
        <SongName attemptValue={0}/>
        <SongAlbum attemptValue={0}/>
        <SongNumber attemptValue={0}/>
        <SongLength attemptValue={0}/>
        <SongFeatures attemptValue={0}/>
      </div>
      <div className="row">
        <SongName attemptValue={1}/>
        <SongAlbum attemptValue={1}/>
        <SongNumber attemptValue={1}/>
        <SongLength attemptValue={1}/>
        <SongFeatures attemptValue={1}/>
      </div>
      <div className="row">
        <SongName attemptValue={2}/>
        <SongAlbum attemptValue={2}/>
        <SongNumber attemptValue={2}/>
        <SongLength attemptValue={2}/>
        <SongFeatures attemptValue={2}/>
      </div>
      <div className="row">
        <SongName attemptValue={3}/>
        <SongAlbum attemptValue={3}/>
        <SongNumber attemptValue={3}/>
        <SongLength attemptValue={3}/>
        <SongFeatures attemptValue={3}/>
      </div>
      <div className="row">
        <SongName attemptValue={4}/>
        <SongAlbum attemptValue={4}/>
        <SongNumber attemptValue={4}/>
        <SongLength attemptValue={4}/>
        <SongFeatures attemptValue={4}/>
      </div>
      <div className="row">
        <SongName attemptValue={5}/>
        <SongAlbum attemptValue={5}/>
        <SongNumber attemptValue={5}/>
        <SongLength attemptValue={5}/>
        <SongFeatures attemptValue={5}/>
      </div>
      <div className="row">
        <SongName attemptValue={6}/>
        <SongAlbum attemptValue={6}/>
        <SongNumber attemptValue={6}/>
        <SongLength attemptValue={6}/>
        <SongFeatures attemptValue={6}/>
      </div>
      <div className="row">
        <SongName attemptValue={7}/>
        <SongAlbum attemptValue={7}/>
        <SongNumber attemptValue={7}/>
        <SongLength attemptValue={7}/>
        <SongFeatures attemptValue={7}/>
      </div>
    </div>
  );
}

export default Board;