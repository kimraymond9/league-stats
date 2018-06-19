import ACTION_TYPES from '../action-types';

export default (state = [], action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALLY_WINRATES:
            console.log(action.allyChampionAndResultCombine);
            return action.allyChampionAndResultCombine;
        default:
            return state;
    }
};