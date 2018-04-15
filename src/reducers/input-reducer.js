export default (state = '', action) => {
  switch (action.type) {
    case 'GET_DATA_SUCCESS':
      console.log(action.type);
      console.log(action.text);
      return state;
    case 'GET_DATA_FAILURE':
      console.log(action.type);
      console.log(action.text);
      return state;
    default:
      return state;
  }
};
