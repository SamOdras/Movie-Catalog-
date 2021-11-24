import MainPage from "./main-page.component";
import { connect } from "react-redux";

export const setIsLoading = e => ({
  type: "SEARCH_LOADING",
  payload: e
});
const mapStateToProps = state => state.movie;
const mapDispatchToProps = dispatch => ({
  setIsLoading: e => dispatch(setIsLoading(e))
});
const CombinedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);
export default CombinedMainPage;
