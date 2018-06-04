import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_MATCH_LIST_SUCCESS:
      return action.data.matches;
    case ACTION_TYPES.GET_MATCH_LIST_FAILURE:
      return state;
    default:
      return state;
  }
};
