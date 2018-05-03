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
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountID}?endIndex=20&api_key=${API_KEY}`
  )
      .then(response => response.json())
      .then(
        data => dispatch({type: GET_MATCHES_SUCCESS, data}),
        err => dispatch({type: GET_MATCHES_FAILURE, err})
      );
}

export function getMatch(matchID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matches/${matchID}?api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(
      data => dispatch({ type: GET_MATCH_SUCCESS, data }),
      err => dispatch({ type: GET_MATCH_FAILURE, err })
    );
}

export function getIDAndMatches(userID){
  return(dispatch, getState) => {
    return dispatch(getID(userID)).then(() => {
      const fetchedUser = getState().input;
      return dispatch(getMatchList(fetchedUser.toString())).then(() => {
        const fetchedMatch = getState().matchList[0].gameId;
        return dispatch(getMatch(fetchedMatch)).then(() => {
          const fetchedMatch1 = getState().matchList[1].gameId;
            return dispatch(getMatch(fetchedMatch1)).then(() => {
              const fetchedMatch2 = getState().matchList[2].gameId;
                return dispatch(getMatch(fetchedMatch2)).then(() => {
                  const fetchedMatch3 = getState().matchList[3].gameId;
                    return dispatch(getMatch(fetchedMatch3))
            });
          });
        });
      });
    });
  }
}
