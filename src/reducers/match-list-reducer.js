import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_MATCH_LIST_SUCCESS:
            console.log(action.data.matches);
            return action.data.matches;
        default:
            return state;
    }
};