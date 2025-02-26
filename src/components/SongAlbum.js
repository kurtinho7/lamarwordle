import React, {useContext} from 'react'
import { AppContext } from '../App';
import {searchSongByName} from '../App'


function SongAlbum({attemptValue}) {
    const {board, correctSong, songs} = useContext(AppContext);
    const songAlbum = board[attemptValue][1];
    const correctAlbumReleaseDate = correctSong.releaseDate;
    const songName = board[attemptValue][0];
    if (!songName){    
        return;
    }
    console.log(correctAlbumReleaseDate);

    const song = searchSongByName(songs, songName);
    const albumReleaseDate = song.releaseDate;

    const correctAlbumReleaseYear = correctAlbumReleaseDate.substring(0,4);
    const correctAlbumReleaseMonth = correctAlbumReleaseDate.substring(5,7);
    const albumReleaseYear = albumReleaseDate.substring(0,4);
    const albumReleaseMonth = albumReleaseDate.substring(5,7);


    console.log(correctAlbumReleaseYear);
    console.log(correctAlbumReleaseMonth);

    //const songAlbumReleaseDate = albumReleaseDate.subString(0,3);



    const correct = songAlbum === correctSong.album;
    const younger = false;
    const older = false;

    const cellState = correct ? "correct" : "error";

    
  return (
    <div className="songalbum" id={cellState}>{songAlbum}</div>
  )
}

export default SongAlbum