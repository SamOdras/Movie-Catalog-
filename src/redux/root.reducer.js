import { combineReducers } from "redux";
import MovieReducer from '../pages/main-page/main-page.reducer';
const appReducer = combineReducers({
  movie: MovieReducer
});

export default appReducer;