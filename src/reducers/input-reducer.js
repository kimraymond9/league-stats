export default (state = '', action) => {
  switch (action.type) {
    case 'GET_ID_SUCCESS':
      return state = action.data.accountId;
    case 'GET_ID_FAILURE':
      return state;
    default:
      return state;
  }
};
