import { API_KEY } from './Api.js';

export const GET_ID_SUCCESS = 'GET_ID_SUCCESS';
export const GET_ID_FAILURE = 'GET_ID_FAILURE';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';
export const GET_MATCH_SUCCESS = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE = 'GET_MATCH_FAILURE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_CHAMPION_SUCCESS = 'GET_CHAMPION_SUCCESS';
export const GET_CHAMPION_FAILURE = 'GET_CHAMPION_FAILURE';


const corsURL = 'http://immense-plateau-42892.herokuapp.com/'

export function getChampionData(championID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/static-data/v3/champions/${championID}?locale=en_US&champData=all&tags=all&api_key=${API_KEY}`
  )
    .then(response => response.json())
    .then(
      data => dispatch({ type: GET_CHAMPION_SUCCESS, data }),
      err => dispatch({ type: GET_CHAMPION_FAILURE, err })
    );
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

export function getMatchList(accountID, championID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountID}?champion=${championID}&endIndex=5&queue=400&queue420&queue=430&queue=440&api_key=${API_KEY}`
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

export function getIDAndMatches(userID, championID){
  return (dispatch, getState) => {
    return dispatch(getID(userID)).then(() => {
      const fetchedUser = getState().input;
      return dispatch(getMatchList(fetchedUser, championID)).then(() => {
        return dispatch(getChampionData(championID)).then(() => {
          return dispatch(getMatch())
        })
      })
    })
  }
}

export function getUserData(data, userID){
  return dispatch => {
  var i;
  for (i = 0; i < data.participantIdentities.length; i++){
    if (data.participantIdentities[i].player.currentAccountId === userID){
      var userData = data.participants[i];
      dispatch({ type: GET_USER_DATA, userData})
    }
  }
}
}