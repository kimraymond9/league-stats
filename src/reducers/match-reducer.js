import _ from 'lodash';
import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_MATCH_SUCCESS:
      var newState = []
      _.merge(newState, state);
      newState.push(action.data);
      return newState;
    case ACTION_TYPES.GET_MATCH_FAILURE:
      return state;
    case ACTION_TYPES.CLEAR_DATA:
      console.log("hi");
    default:
      return state;
  }
};
