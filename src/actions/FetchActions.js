import axios from "axios";
//Get acess token from Spotify API , token has to be renewed every hour, ( implicit grant flow)
export const setAcessToken = (acessToken) => (dispatch) => {
  dispatch({
    type: "SETTOKEN",
    payload: acessToken,
  });
};
//After geting the acess token its possible to get information about the user

export const getUser = (code) => (dispatch) => {
  return axios({
    method: "get",
    url: "https://api.spotify.com/v1/me",

    headers: { Authorization: "Bearer " + code },
  })
    .then((res) => {
      dispatch({
        type: "USERINFO",
        payload: res.data,
      });
    })
    .catch((res) => {
      dispatch({
        type: "SET_ERROR",
        payload: res.response.data.error.status,
      });
    });
};
//Retrives lists of playlist objest from given  Acess token
//not even used
export const getPlaylist = (code) => (dispatch) => {
  axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/playlists",
    headers: { Authorization: "Bearer " + code },
  }).then((res) => {
    dispatch({
      type: "PLAYLIST",
      payload: res.data.items,
    });
  });
};
//simple actions to add/remove  aritst/trakcs from seeds
/////////////////////////
//This should be moved to UiActions since it onyl iteracts with the ui

//to set the tracks and artist its necessary to know how many tracks and artist there are, since the seed pool can only have up to 5 items;
//so to be easier to display the alerts of erros  this action will need the others artist/track in the pool of seeds
export const setTrackSeed = (track, other_tracks, other_artists) => (
  dispatch
) => {
  //first checking for duplicate tracks
  if (other_tracks.length + other_artists.length < 5) {
    let is_duplicate = other_tracks.findIndex((ele) => {
      return ele.id == track.id;
    });
    if (is_duplicate == -1) {
      dispatch({
        type: "SET_TRACK_SEED",
        payload: track,
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        message: "Essa musica já foi selecionada",
        success: "error",
      });
    }
  } else {
    let is_duplicate = other_tracks.findIndex((ele) => {
      return ele.id == track.id;
    });
    if (is_duplicate == -1) {
      dispatch({
        type: "SET_MESSAGE",
        message: "Escolha até no máximo 5 items",
        success: "error",
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        message: "Essa musica já foi selecionada",
        success: "error",
      });
    }
  }
};

export const setArtistsSeed = (artist, other_artists, other_tracks) => (
  dispatch
) => {
  if (other_artists.length + other_tracks.length < 5) {
    let is_duplicate = other_artists.findIndex((ele) => {
      return ele.id == artist.id;
    });
    if (is_duplicate == -1) {
      dispatch({
        type: "SET_ARTISTS_SEED",
        payload: artist,
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        message: "Esse artista já foi escolhido",
        success: "error",
      });
    }
  } else {
    let is_duplicate = other_artists.findIndex((ele) => {
      return ele.id == artist.id;
    });
    if (is_duplicate == -1) {
      dispatch({
        type: "SET_MESSAGE",
        message: "Escolha até no máximo 5 items",
        success: "error",
      });
    } else {
      dispatch({
        type: "SET_MESSAGE",
        message: "Esse artista já foi escolhido",
        success: "error",
      });
    }
  }
};
// remove tracks and artist doesnt show notificiations anymore, its very clear when an seed is removed
export const remTrackSeed = (value) => (dispatch) => {
  dispatch([
    {
      type: "REM_TRACK_SEED",
      payload: value,
    },
  ]);
};

export const remArtistSeed = (value) => (dispatch) => {
  dispatch([
    {
      type: "REM_ARTIST_SEED",
      payload: value,
    },
  ]);
};
/////////////////////

// MAYBE THIS SHOULD BE MOVE TO UI ACTIONS
// only set
export const setTracksResults = (value) => (dispatch) => {
  dispatch({ type: "SET_TRACKS_RESULTS", payload: value });
};
export const setArtistsResults = (value) => (dispatch) => {
  dispatch({ type: "SET_ARTISTS_RESULTS", payload: value });
};

//logic: get recomendation ->Create playlist-> add musics to playlist (from get recomendations) -> update state with error/ success

//Spotify API can give recommendations based on 5 artits 5 track and 5 genres, or any combinations of these
//Maybe later add Genre seed
// ALSO NEED ERROR HANDLING
export const getRecommendations = (code, artists, tracks, quantity) => (
  dispatch
) => {
  var seed = "";
  //it basicaly check for length of arguments to only include arguments with more than 0 elements
  //and add those elements in the proper request to the API
  if (artists.length > 0) {
    seed += "seed_artists=";
    artists.forEach((item, ind) => {
      if (ind < artists.length - 1) {
        seed += item.id + ",";
      } else if (tracks.length > 0) seed += item.id + "&";
      else seed += item.id;
    });
  }
  if (tracks.length > 0) {
    seed += "seed_tracks=";
    tracks.forEach((item, ind) => {
      if (ind < tracks.length - 1) {
        seed += item.id + ",";
      } else seed += item.id;
    });
  }
  if (tracks.length + artists.length > 0) {
    let url = "https://api.spotify.com/v1/recommendations?" + seed;

    axios({
      method: "get",
      url: url + "&limit=" + quantity,
      headers: { Authorization: "Bearer " + code },
    })
      .catch((res) => {
        dispatch({
          type: "SET_ERROR",
          payload: res.response.data.error.status,
        });
      })

      .then((res) => {
        dispatch({
          type: "PLAYLIST",
          payload: res.data.tracks,
        });
      });
  }
};

export const remTrackPlaylist = (value) => (dispatch) => {
  dispatch({
    type: "REM_TRACK_PLAYLIST",
    payload: value,
  });
};
export const addMusicToPlaylist = (code, user_id, playlist_id, tracks) => (
  dispatch
) => {
  let t = [];
  for (var key in tracks) {
    t.push("spotify:track:" + tracks[key].id);
  }
  let url = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?";

  return axios({
    method: "post",
    url: url,
    headers: { Authorization: "Bearer " + code },
    data: {
      uris: t,
    },
  })
    .then((res) => {
      dispatch([
        { type: "PLAYLIST_SUCCESS", success: true },
        getPlaylistInfo(code, playlist_id),
      ]);
    })
    .catch((res) => {
      dispatch({ type: "SET_ERROR", payload: res.response.data.error.status });
    });
};
//when the playlist is created , the url to it is also set
export const createPlaylist = (code, user_id, playlist_name, tracks) => (
  dispatch
) => {
  let url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";
  axios({
    method: "post",
    url: url,
    headers: { Authorization: "Bearer " + code },
    data: {
      name: playlist_name,
    },
  })
    .catch((res) => {
      dispatch({ type: "SET_ERROR", payload: res.response.data.error.status });
    })
    .then((res) => {
      dispatch([
        addMusicToPlaylist(code, user_id, res.data.id, tracks),
        {
          type: "SET_PLAYLIST_URL",
          payload: res.data.external_urls.spotify,
        },
      ]);
    });
};
//getting exta info from the playlist after its created and the tracks are already in the playlist
export const getPlaylistInfo = (code, playlist_id) => (dispatch) => {
  let url = "https://api.spotify.com/v1/playlists/" + playlist_id;
  axios({
    method: "get",
    url: url,
    headers: { Authorization: "Bearer " + code },
  })
    .catch((res) => {
      //no need to handle error , this is just a "cosmetic" thing
      dispatch({
        type: "SET_PLAYLIST_INFO",
        payload: { name: null, images: null },
      });
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: "SET_PLAYLIST_INFO",
        payload: { name: res.data.name, images: res.data.images },
      });
    });
};
export const setErro = (error) => (dispatch) => {
  dispatch({ type: "SET_ERROR", payload: error });
};
