export default (state = [], action) => {
  switch (action.type) {
    case 'GET_MATCHES_SUCCESS':
      return state;
    case 'GET_MATCHES_FAILURE':
      return state;
    default:
      return state;
  }
};
