import Component from './detail-page.component';
import { connect } from 'react-redux'; 

export const setIsLoading = e => ({
  type: "SEARCH_LOADING",
  payload: e
});
const mapDispatchToProps = dispatch => ({
  setIsLoading: e => dispatch(setIsLoading(e))
}) 
const combinedDetail =  connect(null, mapDispatchToProps)(Component);
export default combinedDetail
