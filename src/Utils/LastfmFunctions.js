//Fetches users data
export async function handleFetchLastFmUserData(username, setLastFmUserData) {
  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
  )
    .then((response) => response.json())
    .then((data) => setLastFmUserData(data.user));
}

//Fetches a users 50 most recently played songs from LastFM
export async function handleFetchRecentSongs(username, setSongs) {
  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
  )
    .then((response) => response.json())
    .then((data) => setSongs(data.recenttracks.track));
}

//Fetches songs played between two UNIX dateTimes from LastFM
export async function handleFetchSongsBetweenDateRange(username, from, to) {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&from=${from}&to=${to}&limit=200&format=json`
  );

  const data = await response.json();
  return data.recenttracks.track;
}

//Fetches songs played between two UNIX dateTimes from LastFM
export async function handleFetchSongsForActivityRange(username, from, to) {
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&from=${from}&to=${to}&limit=200&format=json`
  );
  const data = await response.json();

  return data.recenttracks.track;
}
