export default (state = '', action) => {
  switch (action.type) {
    case 'GET_USERNAME':
      state = action.text;
      console.log(state);
      return action.text;
    default:
      return state;
  }
};
