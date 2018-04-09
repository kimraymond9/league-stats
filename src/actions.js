export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_USERNAME = 'GET_USERNAME';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function getUsername(text) {
  return { type: 'GET_USERNAME', text }
}

export function getData(userID) {
  return dispatch => fetch(`http://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${userID}`)
      .then(response => response.json())
      .then(
        data => dispatch({type: 'GET_DATA_SUCCESS', data}),
        err => dispatch({type: 'GET_DATA_FAILURE', err})
      );
}
