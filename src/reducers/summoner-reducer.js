import ACTION_TYPES from '../action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SUMMONER_SUCCESS:
      return {
        accountId: action.data.accountId
      }
    case ACTION_TYPES.CLEAR_DATA:
      return {};
    default:
      return state;
  }
};