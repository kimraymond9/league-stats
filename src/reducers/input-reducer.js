export default (state = '', action) => {
  switch (action.type) {
    case 'GET_ID_SUCCESS':
      state = action.data.accountId;
      return state;
    case 'GET_ID_FAILURE':
      return state;
    default:
      return state;
  }
};
