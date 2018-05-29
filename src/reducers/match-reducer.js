import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case 'GET_MATCH_SUCCESS':
      var newState = []
      _.merge(newState, state);
      newState.push(action.data);
      return newState;
    case 'GET_MATCH_FAILURE':
      return state;
    default:
      return state;
  }
};
