import axios from "axios";
import qs from "qs";
import { SEARCH_ACTIONS } from "./index";

const ROOT_URL = "https://api.spotify.com/v1/";
const CLIENT_ID = "6eec140cee5e4151b9fbb72cb00fa948";
const CLIENT_SECRET = "4dbe8a5ca98e4f53bdefb9b202b22a5a";

export const MUSIC = SEARCH_ACTIONS('MUSIC');


const api = new axios.Axios({
  baseURL: ROOT_URL,
  headers: {
    common: {
      "Content-Type": 'application/json'
    }
  },
})

const fetchMusic = async (searchTerm, musicTypes) => {
  return api.get(`/search`, {
    params: {
      q: searchTerm,
      type: musicTypes.join(','),
      limit: 10
    },
  }).then(res => JSON.parse(res.data))
}

export const getToken = (searchTerm = null) => async dispatch => {
  try {
    const data = qs.stringify({ grant_type: 'client_credentials' });
    const token = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        "Authorization": `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      json: true
    }).then(res => res.data);

    if (token.access_token) {
      const { access_token, token_type } = token;
      api.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    delete api.defaults.headers.common['Authorization'];
    console.error(error);
  }
}
export const getMusic = (searchTerm, musicTypes) => async dispatch => {
  try {
    if (searchTerm === '') {
      dispatch({ type: MUSIC.CLEAR });
      return;
    }
    const music = await fetchMusic(searchTerm, musicTypes);
    if (music.error || music.errors) {
      console.log("ERROR", music);
    } else {
      dispatch({ type: MUSIC.FETCH, payload: music });
    }
  } catch (error) {
    console.error(error);
  }
}

export const getDetails = (type, id) => async dispatch => {
  try {
    const details = await api.get(`${type}s/${id}`).then(res => JSON.parse(res.data))
    console.log(details);
    dispatch({ type: MUSIC.SELECT, payload: details });
  } catch (error) {

  }
}

export const setMusicTerm = (searchTerm) => ({
  type: MUSIC.SET_TERM,
  payload: searchTerm
})

export const toggleMusicType = type => ({
  type: MUSIC.TOGGLE_TYPE,
  payload: type
})


export const selectMusic = music => {
  return {
    type: MUSIC.SELECT,
    payload: music
  }
}
export const selectBack = () => {
  return { type: MUSIC.SELECT_BACK };
}
export const selectForward = () => {
  return { type: MUSIC.SELECT_FORWARD };
}


// export default getMusic;