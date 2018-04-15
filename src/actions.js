export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function getData(userID) {
  return dispatch => fetch(`https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${userID}?api_key=RGAPI-f64def52-f7ba-48b7-ab94-f54c2aa70de7`,
    {mode: 'no-cors'}
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_DATA_SUCCESS, data}),
        err => dispatch({type: GET_DATA_FAILURE, err})
      );
}
