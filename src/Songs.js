// KendrickSongs.js
import React, { useState, useEffect } from 'react';

function KendrickSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // 1. Get Spotify access token
        const token = await fetchSpotifyToken();

        // 2. Fetch Kendrick Lamar's albums
        const albums = await fetchKendrickAlbums(token);
        // For simplicity, we'll take the first album and fetch its tracks.

        const allTracks = await getAllTracks(token, albums);

        setSongs(allTracks); // Update the state here

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
    for (const album of albums) {
      const albumTracks = await fetchAlbumTracks(album.id, accessToken);
      if (!albumTracks) {
        console.error(`No tracks returned for album: ${album.name}`);
        continue;
      }
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
      allTracks = allTracks.concat(enrichedTracks);
    }
    return allTracks;
  };

  // In your spotifyApi.js file

export const fetchSongDataByGuess = async (songGuess) => {
    // First, get an access token
    const token = await fetchSpotifyToken();
  
    // Encode the guess for URL use
    const query = encodeURIComponent(songGuess);
  
    // Use the search endpoint: limit=1 for simplicity (or adjust as needed)
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
