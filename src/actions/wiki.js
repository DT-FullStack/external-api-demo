import axios from "axios";
import { SEARCH_ACTIONS } from "./index";

const ROOT_URL = "https://en.wikipedia.org/w/api.php";

export const ARTICLES = SEARCH_ACTIONS('ARTICLE');


const api = new axios.Axios({
  baseURL: ROOT_URL,
  params: {
    action: 'query',
    format: 'json',
    list: 'search',
    utf8: '1',
    origin: '*'
  }
})

const fetchArticles = async (searchTerm) => {
  return api.get(``, {
    params: {
      srsearch: searchTerm
    },
  }).then(res => JSON.parse(res.data))
}

export const getArticles = searchTerm => async dispatch => {
  try {
    if (searchTerm === '') {
      dispatch({ type: ARTICLES.CLEAR });
      return;
    }
    const articles = await fetchArticles(searchTerm);
    console.log(articles);
    if (articles.error || articles.errors) {
      console.log("ERROR", articles);
    } else {
      dispatch({ type: ARTICLES.FETCH, payload: articles.query });
    }
  } catch (error) {
    console.error(error);
  }
}

export const setArticleTerm = (searchTerm) => ({
  type: ARTICLES.SET_TERM,
  payload: searchTerm
});

export const selectArticle = article => ({
  type: ARTICLES.SELECT,
  payload: article
})

export const selectBack = () => {
  return { type: ARTICLES.SELECT_BACK };
}
export const selectForward = () => {
  return { type: ARTICLES.SELECT_FORWARD };
}
