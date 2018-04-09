import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);
const testCompose = compose;
const testEnhancers = [];

testEnhancers.push(applyMiddleware(thunk));

const testStore = createStore(
    rootReducer,
    testCompose(
        ...[]
    )
);

export const configureStore = () => testStore;
