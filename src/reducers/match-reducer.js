export default (state = '', action) => {
  switch (action.type) {
    case 'GET_MATCH_SUCCESS':
      return [...state,
        {
            match: action.data,
        }];
    case 'GET_MATCH_FAILURE':
      return state;
    default:
      return state;
  }
};
