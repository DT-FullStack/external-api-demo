import { combineReducers } from "redux";
import { MUSIC } from "../actions/spotify";
import { VIDEO } from "../actions/youtube";
import { ARTICLES } from '../actions/wiki';

// Reducers

// initial music state
const MUSIC_INITIAL = {
  list: {},
  search: {
    term: '',
    types: ['artist', 'track', 'album']
  },
  selected: {
    past: [],
    present: null,
    future: []
  },
  loading: false
}

const musicReducer = (music = MUSIC_INITIAL, action) => {
  const { type, payload } = action;
  let { selected: { past, present, future } } = music;
  switch (type) {
    case MUSIC.FETCH:
      return { ...music, list: payload };
    case MUSIC.CLEAR:
      return { ...music, list: {} };
    case MUSIC.SET_TERM:
      const { search } = music;
      return { ...music, search: { ...search, term: payload } };
    case MUSIC.SELECT:
      if (present !== null) {
        if (present.id === payload.id) return music;
        else past = [...past, present];
      }
      return { ...music, selected: { ...music.selected, past, present: payload } };
    case MUSIC.SELECT_BACK:
      const previous = past[past.length - 1];
      past = past.slice(0, past.length - 1);
      if (present !== null) future = [present, ...future];
      return {
        ...music, selected: {
          past,
          present: previous,
          future
        }
      };
    case MUSIC.SELECT_FORWARD:
      const next = future[0];
      future = future.slice(1);
      if (present !== null) past = [...past, present];
      return {
        ...music, selected: {
          past,
          present: next,
          future
        }
      };
    case MUSIC.TOGGLE_TYPE:
      let { types } = music.search;
      const remove = types.includes(payload);
      if (remove && types.length > 1) {
        types = types.filter(t => t !== payload)
      } else if (!remove) {
        types = [...types, payload];
      }
      return { ...music, search: { ...music.search, types } };
    default:
      return music;
  }
}

const VIDEO_INITIAL = {
  list: {},
  search: {
    term: '',
    types: ['channel', 'playlist', 'video']
  },
  selected: {
    past: [],
    present: null,
    future: []
  },
  loading: false
}

const videoReducer = (video = VIDEO_INITIAL, action) => {
  const { type, payload } = action;
  let { selected: { past, present, future } } = video;
  switch (type) {
    case VIDEO.FETCH:
      return { ...video, list: payload };
    case VIDEO.CLEAR:
      return { ...video, list: {} };
    case VIDEO.SET_TERM:
      const { search } = video;
      return { ...video, search: { ...search, term: payload } };
    case VIDEO.SELECT:
      if (present !== null) {
        if (present.etag === payload.etag) return video;
        else past = [...past, present];
      }
      return { ...video, selected: { ...video.selected, past, present: payload } };
    case VIDEO.SELECT_BACK:
      const previous = past[past.length - 1];
      past = past.slice(0, past.length - 1);
      if (present !== null) future = [present, ...future];
      return {
        ...video, selected: {
          past,
          present: previous,
          future
        }
      };
    case VIDEO.SELECT_FORWARD:
      const next = future[0];
      future = future.slice(1);
      if (present !== null) past = [...past, present];
      return {
        ...video, selected: {
          past,
          present: next,
          future
        }
      };
    case VIDEO.TOGGLE_TYPE:
      let { types } = video.search;
      const remove = types.includes(payload);
      if (remove && types.length > 1) {
        types = types.filter(t => t !== payload)
      } else if (!remove) {
        types = [...types, payload];
      }
      return { ...video, search: { ...video.search, types } };
    default:
      return video;
  }
}

const ARTICLES_INITIAL = {
  list: {},
  search: {
    term: '',
  },
  selected: {
    past: [],
    present: null,
    future: []
  },
  loading: false
}

const articleReducer = (articles = ARTICLES_INITIAL, action) => {
  const { type, payload } = action;
  let { selected: { past, present, future } } = articles;
  switch (type) {
    case ARTICLES.FETCH:
      return { ...articles, list: payload };
    case ARTICLES.CLEAR:
      return { ...articles, list: {} };
    case ARTICLES.SET_TERM:
      const { search } = articles;
      return { ...articles, search: { ...search, term: payload } };
    case ARTICLES.SELECT:
      console.log(payload);
      if (present !== null) {
        if (present.pageid === payload.pageid) return articles;
        else past = [...past, present];
      }
      return { ...articles, selected: { ...articles.selected, past, present: payload } };
    case ARTICLES.SELECT_BACK:
      const previous = past[past.length - 1];
      past = past.slice(0, past.length - 1);
      if (present !== null) future = [present, ...future];
      return {
        ...articles, selected: {
          past,
          present: previous,
          future
        }
      };
    case ARTICLES.SELECT_FORWARD:
      const next = future[0];
      future = future.slice(1);
      if (present !== null) past = [...past, present];
      return {
        ...articles, selected: {
          past,
          present: next,
          future
        }
      };
    default:
      return articles;
  }
}

export default combineReducers({
  music: musicReducer,
  video: videoReducer,
  articles: articleReducer,
  // musicTerm: musicTermReducer,
  // musicTypes: musicTypesReducer,
  // selectedMusic: selectedMusicReducer
})