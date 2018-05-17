import { API_KEY } from './Api.js';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_ID_SUCCESS = 'GET_ID_SUCCESS';
export const GET_ID_FAILURE = 'GET_ID_FAILURE';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';
export const GET_MATCH_SUCCESS = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE = 'GET_MATCH_FAILURE';

const corsURL = 'http://immense-plateau-42892.herokuapp.com/'

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function getID(userID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${userID}?api_key=${API_KEY}`
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_ID_SUCCESS, data}),
        err => dispatch({type: GET_ID_FAILURE, err})
      );

}

export function getMatchList(accountID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountID}?endIndex=5&api_key=${API_KEY}`
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_MATCHES_SUCCESS, data}),
        err => dispatch({type: GET_MATCHES_FAILURE, err})
      );
}

export function getMatch() {
  var gameIds = [];
  return (dispatch, getState) => { 
    const matchList = getState().matchList;
    for(var i in matchList){
      gameIds[i] = `${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matches/${matchList[i].gameId}?api_key=${API_KEY}`;
    }
    Promise.all(gameIds.map(url => fetch(url)
      .then(response => response.json())
      .then(
        data => dispatch({ type: GET_MATCH_SUCCESS, data }),
        err => dispatch({ type: GET_MATCH_FAILURE, err })
      )
    ))
  }
}

export function getIDAndMatches(userID){
  return (dispatch, getState) => {
    return dispatch(getID(userID)).then(() => {
      const fetchedUser = getState().input;
      return dispatch(getMatchList(fetchedUser)).then(() => {
        return dispatch(getMatch());
      });
    });
  }
}