import { API_KEY } from './Api.js';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_ID_SUCCESS = 'GET_ID_SUCCESS';
export const GET_ID_FAILURE = 'GET_ID_FAILURE';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';

const corsURL = 'http://immense-plateau-42892.herokuapp.com/'

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function getID(userID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/
    ${userID}
    ?api_key=${API_KEY}`
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_ID_SUCCESS, data}),
        err => dispatch({type: GET_ID_FAILURE, err})
      );
}

export function getMatches(matchID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/
    ${matchID}
    /recent?api_key=${API_KEY}`
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_MATCHES_SUCCESS, data}),
        err => dispatch({type: GET_MATCHES_FAILURE, err})
      );
}
