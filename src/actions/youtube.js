import axios from "axios";
import { SEARCH_ACTIONS } from "./index";
// import qs from "qs";
// import jwt from "jsonwebtoken";
const ROOT_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyA2N6qlihKUUchFqWOaAEIipNR2h1O0YmU";

export const VIDEO = SEARCH_ACTIONS('VIDEO');

const api = new axios.Axios({
  baseURL: ROOT_URL,
  params: {
    part: "snippet",
    maxResults: 5,
    key: API_KEY,
    type: 'video'
  },
})
const fetchVideos = async (searchTerm) => {
  return api.get(`/search`, {
    params: {
      q: searchTerm,
    },
  }).then(res => JSON.parse(res.data))
}

// export const getToken = (searchTerm = null) => async dispatch => {
//   try {
//     const data = qs.stringify({ grant_type: 'client_credentials' });
//     const token = await axios.post('https://accounts.spotify.com/api/token', data, {
//       headers: {
//         "Authorization": `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       json: true
//     }).then(res => res.data);

//     if (token.access_token) {
//       const { access_token, token_type } = token;
//       api.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
//     } else {
//       delete api.defaults.headers.common['Authorization'];
//     }
//   } catch (error) {
//     delete api.defaults.headers.common['Authorization'];
//     console.error(error);
//   }
// }
export const getVideos = (searchTerm) => async dispatch => {
  try {
    if (searchTerm === '') {
      dispatch({ type: VIDEO.CLEAR });
      return;
    }
    const videos = await fetchVideos(searchTerm);
    if (videos.error || videos.errors) {
      console.log("ERROR", videos);
    } else {
      dispatch({ type: VIDEO.FETCH, payload: videos });
    }
  } catch (error) {
    console.error(error);
  }
}

export const setVideoTerm = (searchTerm) => ({
  type: VIDEO.SET_TERM,
  payload: searchTerm
});


export const selectVideo = item => ({
  type: VIDEO.SELECT,
  payload: item
});

export const selectBack = () => ({ type: VIDEO.SELECT_BACK })
export const selectForward = () => ({ type: VIDEO.SELECT_FORWARD })


// export default getVideos;