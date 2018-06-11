import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_USER_DATA:
            return action.aggregateData;
        default:
            return state;
    }
};