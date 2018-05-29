export default (state = '', action) => {
    switch (action.type) {
        case 'GET_CHAMPION_SUCCESS':
            return state;
        case 'GET_CHAMPION_FAILURE':
            return state;    
        default:
            return state;
    }
};
