import ACTION_TYPES from '../action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_CHAMPION_SUCCESS:
            return {
                id: '412'
            }
        case ACTION_TYPES.GET_CHAMPION_FAILURE:
            return {
                id: '412' // Thresh
            }
        default:
            return state;
    }
};
