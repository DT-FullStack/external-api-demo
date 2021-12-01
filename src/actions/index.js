export const SEARCH_ACTIONS = (type) => {
  const TYPE_UC = type.toUpperCase();
  return Object.freeze({
    FETCH: `FETCH_${TYPE_UC}`,
    CLEAR: `CLEAR_${TYPE_UC}`,
    SELECT: `SELECT_${TYPE_UC}`,
    SELECT_BACK: `SELECT_${TYPE_UC}_BACK`,
    SELECT_FORWARD: `SELECT_${TYPE_UC}_FORWARD`,
    TOGGLE_TYPE: `TOGGLE_${TYPE_UC}_TYPE`,
    SET_TERM: `SET_${TYPE_UC}_TERM`
  })
}