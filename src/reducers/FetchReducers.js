const initialState = {
  code: null,
  userName: null,
  userEmail: null,
  userId: null,
  playlist_url: null,
  playlists: [],
  artists_seed: [],
  tracks_seed: [],
  genres_seed: [],
  artists_results: [],
  tracks_results: [],
  quantity_rec: 40,
  error: null,
  playlist_info: { name: null, images: [] },
};

export default function (state = initialState, action, dispatch) {
  switch (action.type) {
    case "AUTHORIZE":
      return {
        ...state,
        code: action.payload,
      };
    case "SETTOKEN":
      return {
        ...state,
        code: action.payload,
      };
    case "USERINFO":
      return {
        ...state,
        userName: action.payload.display_name,
        userEmail: action.payload.email,
        userId: action.payload.id,
      };
    case "PLAYLIST":
      return {
        ...state,
        playlists: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_ARTISTS_SEED":
      if (state.artists_seed.length < 5) {
        let index = state.artists_seed.findIndex((el) => {
          return el.id == action.payload.id;
        });

        if (index == -1) {
          return {
            ...state,
            artists_seed: [
              ...state.artists_seed,
              // { name: action.payload.name, id: action.payload.id },
              action.payload,
            ],
          };
        }
        //return react alert for duplicate
        return state;
      }

      //retu react alert for quantity
      else return state;

    case "SET_TRACK_SEED":
      if (state.tracks_seed.length < 5) {
        let index1 = state.tracks_seed.findIndex((el) => {
          return el.id == action.payload.id;
        });
        if (index1 == -1) {
          return {
            ...state,
            tracks_seed: [...state.tracks_seed, action.payload],
          };
        }
        //return react alert for duplicate
        return state;
      }
      //return react alert for quantity
      else return state;
    case "REM_TRACK_SEED":
      return {
        ...state,
        tracks_seed: [
          ...state.tracks_seed.filter((item) => {
            return item.id != action.payload.id;
          }),
        ],
      };
    case "REM_ARTIST_SEED":
      return {
        ...state,
        artists_seed: [
          ...state.artists_seed.filter((item) => {
            return item.id != action.payload.id;
          }),
        ],
      };
    case "SET_ARTISTS_RESULTS":
      return {
        ...state,
        artists_results: action.payload,
      };
    case "SET_TRACKS_RESULTS":
      return {
        ...state,
        tracks_results: action.payload,
      };
    case "REM_TRACK_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists.filter((item) => {
            return item.id != action.payload;
          }),
        ],
      };
    case "SET_PLAYLIST_URL":
      return {
        ...state,
        playlist_url: action.payload,
      };
    case "SET_PLAYLIST_INFO":
      return {
        ...state,
        playlist_info: action.payload,
      };
    default:
      return state;
  }
}
