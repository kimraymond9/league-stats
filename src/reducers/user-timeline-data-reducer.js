import ACTION_TYPES from '../action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_USER_TIMELINE_DATA:
            return action.aggregateTimelineData;
        case ACTION_TYPES.CLEAR_DATA:
            return {};
        default:
            return state;
    }
};