import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_OPPONENT_WINRATES:
            return action.opponentChampionAndResultCombine;
        default:
            return state;
    }
};