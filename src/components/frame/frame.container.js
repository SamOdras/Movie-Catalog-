import Frame from './frame.component';
import { connect } from 'react-redux';

export const onChangeSearch = e => ({
  type: "SEARCH_MOVIE",
  payload: e
});
const mapStateToProps = state => state.movie;
const mapDispatchToProps = dispatch => ({
  onChangeSearch: (e) => dispatch(onChangeSearch(e))
})
const CombinedFrame = connect(mapStateToProps, mapDispatchToProps)(Frame)
export default CombinedFrame;