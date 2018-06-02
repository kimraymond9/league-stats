import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_DATA':
            var newState = []
            _.merge(newState, state);
            newState.push(action.userData);
            return newState;
        case 'GET_AGGREGATE_USER_DATA':
            return state;
        case 'GET_AGGREGATE_MATCH_DATA':
            return state;
        default:
            return state;
    }
};
