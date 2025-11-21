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

    const correctAlbumReleaseYear = parseInt(correctAlbumReleaseDate.substring(0,4));
    const correctAlbumReleaseMonth = parseInt(correctAlbumReleaseDate.substring(5,7));
    const albumReleaseYear = parseInt(albumReleaseDate.substring(0,4));
    const albumReleaseMonth = parseInt(albumReleaseDate.substring(5,7));


    console.log(correctAlbumReleaseYear);
    console.log(correctAlbumReleaseMonth);

    const isYounger = () => {

        if (correctAlbumReleaseYear === albumReleaseYear){
            return correctAlbumReleaseMonth >= albumReleaseMonth;
        } else {
            return correctAlbumReleaseYear >= albumReleaseYear;
        }

    }


    const correct = songAlbum === correctSong.album;
    const younger = isYounger();
    const older = !younger;


    // If the selected song is older than the correct song it sets background to blue, if younger sets to red
    const cellState = correct ? "correct" : younger ? "younger": older ? "older" : "error";

    const arrow = correct ? '' : younger ? '↑' : '↓';

    
  return (
    <div className="songalbum" id={cellState}>
        <span>{songAlbum}</span>{arrow && <span className="arrow">{arrow}</span>}
    </div>
  )
}

export default SongAlbum