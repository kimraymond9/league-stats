import { API_KEY } from './Api.js';

export const GET_ID_SUCCESS = 'GET_ID_SUCCESS';
export const GET_ID_FAILURE = 'GET_ID_FAILURE';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';
export const GET_MATCH_SUCCESS = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE = 'GET_MATCH_FAILURE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_AGGREGATE_USER_DATA = 'GET_AGGREGATE_USER_DATA';
export const GET_AGGREGATE_MATCH_DATA = 'GET_AGGREGATE_MATCH_DATA'
export const GET_CHAMPION_SUCCESS = 'GET_CHAMPION_SUCCESS';
export const GET_CHAMPION_FAILURE = 'GET_CHAMPION_FAILURE';


const corsURL = 'http://immense-plateau-42892.herokuapp.com/';
var maxLength = 20;

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
        const match = getState().match;
        if (match.length === maxLength){
          for (var j = 0; j < maxLength; j++) {
            dispatch(getUserData(match[j]));
          }
        }
      })
    ))
  }
}

export function getUserData(data) {
  return (dispatch, getState) => {
    const accountID = getState().input;
    for (var j = 0; j < data.participantIdentities.length; j++) {
      if (data.participantIdentities[j].player.currentAccountId === accountID) {
        var userData = data.participants[j];
        dispatch({ type: GET_USER_DATA, userData })
      }
    }
    const info = getState().info;
    if(info.length === maxLength){
      dispatch(getAggregateUserData(info));
    }
  }
}

export function getAggregateUserData(data){
  return (dispatch, getState) => {

    const match = getState().match;
    var averageKills = 0;
    var averageDeaths = 0;
    var averageAssists = 0;
    var averageVisionWardsBought = 0;
    var averageDamageDealtToTurrets = 0;
    var averageDamageDealtToObjectives = 0;
    var averageMinionsPerMinute = 0;

    var minionsPerMinute = [];
    for (var i = 0; i < maxLength; i++) {
      var durationInMinutes = match[i].gameDuration / 60;
      minionsPerMinute[i] = data[i].stats.totalMinionsKilled / durationInMinutes;
    }

    for(var i in data){
      averageKills += data[i].stats.kills;
      averageDeaths += data[i].stats.deaths;
      averageAssists += data[i].stats.assists;
      averageVisionWardsBought += data[i].stats.visionWardsBoughtInGame;
      averageDamageDealtToTurrets += data[i].stats.damageDealtToTurrets;
      averageDamageDealtToObjectives += data[i].stats.damageDealtToObjectives;
      averageMinionsPerMinute += minionsPerMinute[i];
    }


    averageKills /= maxLength;
    averageDeaths /= maxLength;
    averageAssists /= maxLength;
    averageVisionWardsBought /= maxLength;
    averageDamageDealtToTurrets /= maxLength;
    averageDamageDealtToObjectives /= maxLength;
    averageMinionsPerMinute /= maxLength;


    console.log("averageKills: " + averageKills);
    console.log("averageDeaths: " + averageDeaths);
    console.log("averageAssists: " + averageAssists);
    console.log("averageVisionWardsBought: " + averageVisionWardsBought);
    console.log("averageDamageDealtToTurrets: " + averageDamageDealtToTurrets);
    console.log("averageDamageDealtToObjectives: " + averageDamageDealtToObjectives);
    console.log("averageMinionsPerMinute: " + averageMinionsPerMinute);
    

    dispatch({ type: GET_AGGREGATE_USER_DATA, data});
  }
}

export function getIDAndMatches(userID, championID){
  return (dispatch, getState) => {
    return dispatch(getID(userID)).then(() => {
      const fetchedUser = getState().input;
      return dispatch(getMatchList(fetchedUser, championID)).then(() => {
      //  return dispatch(getChampionData(championID)).then(() => {
          maxLength = getState().matchList.length;
          return dispatch(getMatch())
      //  })
      })
    })
  }
}
