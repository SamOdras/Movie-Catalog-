const init = { searchValue: "", isLoading: false }

const movieReducer = (state = init, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE":
      return {
        ...state,
        searchValue: action.payload
      }
    case "SEARCH_LOADING":
      return {
        ...state,
        isLoading: action.payload
      }
    default: return state;
  }
}

export default movieReducer;