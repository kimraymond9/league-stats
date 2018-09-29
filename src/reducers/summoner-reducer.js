import ACTION_TYPES from '../action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SUMMONER_SUCCESS:
      return {
        accountId: action.data.accountId
      }
    case ACTION_TYPES.GET_SUMMONER_FAILURE:
      if(action.err.message === "Not Found"){
        return {
          message: "Summoner Not Found"
        }
      }
      if (action.err.message === "Bad Request") {
        return {
          message: "Summoner Not Found"
        }
      }
      if (action.err.message === "Forbidden") {
        return {
          message: "Summoner Not Found"
        }
      }
      if (action.err.message === "Internal Server Error"){
        return {
          message: action.err.message
        }
      }
      if (action.err.message === "Service Unavailable") {
        return {
          message: action.err.message
        }
      }
      return {};
    default:
      return state;
  }
};