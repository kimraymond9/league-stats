import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.REQUEST_START:
            return {
                loading: true,
            };
        case ACTION_TYPES.REQUEST_END:
            return {
                loading: false,
            };
        case ACTION_TYPES.ERROR:
            return {
                errorMessage: action.error.toString(),
            }
        default:
            return state;
    }
};