// KendrickSongs.js
import React, { useState, useEffect } from 'react';

function KendrickSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = await fetchSpotifyToken();

        const albums = await fetchKendrickAlbums(token);

        const allTracks = await getAllTracks(token, albums);

        setSongs(allTracks);

        return allTracks;
        
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

  return;
}

// Helper function to format duration from milliseconds to minutes:seconds
export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const fetchSpotifyToken = async () => {
  const clientId = '141d499f327846f6b36edf58ece0c29d'; // Replace with your client ID
  const clientSecret = 'dbe1ce19557d496797b4db022b4667e3'; // Replace with your client secret
  const authString = `${clientId}:${clientSecret}`;
  const encodedAuthString = btoa(authString);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedAuthString}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
};

export const fetchKendrickAlbums = async (token) => {
  const artistId = '2YZyLoL8N0Wb9xBt1NhZWg';
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=50`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.items;
};

const fetchAlbumTracks = async (albumId, token) => {
    const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      console.warn(`Rate limited. Retrying after ${retryAfter} seconds.`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      // Retry the request after waiting
      return fetchAlbumTracks(albumId, token);
    }
    
    if (!response.ok) {
      throw new Error(`Error fetching album tracks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.items;
  };
  

export const getAllTracks = async (accessToken, albums) => {
    let allTracks = [];
    const allowedAlbums = ["To Pimp A Butterfly", "Section.80", "good kid, m.A.A.d city", "Overly Dedicated", "untitled  unmastered.", "DAMN.", "Mr. Morale & The Big Steppers", "GNX"];
    const notAllowed = ["DAMN. COLLECTORS EDITION"];
    const filteredAlbums = albums.filter(
        (album) =>
          allowedAlbums.includes(album.name) && !notAllowed.includes(album.name)
    );

    const trackPromises = filteredAlbums.map(async (album) => {
        const albumTracks = await fetchAlbumTracks(album.id, accessToken);
        const enrichedTracks = albumTracks.map(track => ({
            ...track,
            songName: track.name,
            album: album.name,
            songNumber: track.track_number,
            songLength: track.duration_ms,
            features: track.artists
              .filter(artist => artist.name !== 'Kendrick Lamar')
              .map(artist => artist.name),
            releaseDate: album.release_date,
            albumImage: (album.images)[0],
          }));
          return enrichedTracks;
    })

    const tracksPerAlbum = await Promise.all(trackPromises);

    allTracks = tracksPerAlbum.flat()

    return allTracks;
  };


export const fetchSongDataByGuess = async (songGuess) => {
    const token = await fetchSpotifyToken();
  
    const query = encodeURIComponent(songGuess);
  
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching song data: ${response.statusText}`);
    }
  
    const data = await response.json();
    
    // Return the first matching track
    return data.tracks.items[0];
  };
  

  

  

export default KendrickSongs;
