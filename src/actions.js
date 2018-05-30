import { API_KEY } from './Api.js';

export const GET_ID_SUCCESS = 'GET_ID_SUCCESS';
export const GET_ID_FAILURE = 'GET_ID_FAILURE';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';
export const GET_MATCH_SUCCESS = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE = 'GET_MATCH_FAILURE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_AGGREGATE_DATA = 'GET_AGGREGATE_DATA';
export const GET_CHAMPION_SUCCESS = 'GET_CHAMPION_SUCCESS';
export const GET_CHAMPION_FAILURE = 'GET_CHAMPION_FAILURE';


const corsURL = 'http://immense-plateau-42892.herokuapp.com/';
const maxLength = 5;

export function getChampionData(championID) {
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/static-data/v3/champions/${championID}?locale=en_US&champData=all&api_key=${API_KEY}`
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
  return dispatch => fetch(`${corsURL}https://oc1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountID}?champion=${championID}&endIndex=${maxLength}&queue=400&queue420&queue=430&queue=440&api_key=${API_KEY}`
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
      ).then(() => {
        const matchLength = getState().match.length;
        if (matchLength === maxLength){
          const accountID = getState().input;
          const match = getState().match;
          for (var j = 0; j < maxLength; j++) {
            dispatch(getUserData(match[j], accountID));
          }
        }
      })
    ))
  }
}

export function getUserData(data, userID) {
  return (dispatch, getState) => {
    for (var i = 0; i < data.participantIdentities.length; i++) {
      if (data.participantIdentities[i].player.currentAccountId === userID) {
        var userData = data.participants[i];
        dispatch({ type: GET_USER_DATA, userData })
      }
    }
    const infoLength = getState().info.length;
    if(infoLength === maxLength){
      const infoData = getState().info;
      dispatch(getAggregateData(infoData));
    }
  }
}

export function getAggregateData(data){
  return dispatch => {
    console.log("do calcs");
    dispatch({ type: GET_AGGREGATE_DATA, data});
  }
}

export function getIDAndMatches(userID, championID){
  return (dispatch, getState) => {
    return dispatch(getID(userID)).then(() => {
      const fetchedUser = getState().input;
      return dispatch(getMatchList(fetchedUser, championID)).then(() => {
      //  return dispatch(getChampionData(championID)).then(() => {
          return dispatch(getMatch())
      //  })
      })
    })
  }
}
