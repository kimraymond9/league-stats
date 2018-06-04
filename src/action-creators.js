import { API_KEY, CORS_URL, MAX_LENGTH, RIOT_URL } from './API-constants.js';
import ACTION_TYPES from './action-types';

// ACCOUNT
const fetchSummonerByName = summonerName => fetch(`${CORS_URL}${RIOT_URL}summoner/v3/summoners/by-name/${summonerName}?api_key=${API_KEY}`)

const getSummonerByName = summonerName => {
    return dispatch => {
        return fetchSummonerByName(summonerName).then(
            response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then(
            data =>dispatch({ type: ACTION_TYPES.GET_SUMMONER_SUCCESS, data }),
            err => dispatch({ type: ACTION_TYPES.GET_SUMMONER_FAILURE, err })
        );
    }
}

// CHAMPION
const fetchChampionById = championId => fetch(`${CORS_URL}${RIOT_URL}static-data/v3/champions/${championId}?locale=en_US&champData=all&api_key=${API_KEY}`)

const getChampionById = championId => {
    return dispatch => {
        return fetchChampionById(championId).then(
            response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then(
            data => dispatch({ type: ACTION_TYPES.GET_CHAMPION_SUCCESS, data }),
            err => dispatch({ type: ACTION_TYPES.GET_CHAMPION_FAILURE, err })
        );
    }
}

// MATCH LIST
const fetchChampionMatchListByAccount = (championId, accountId) => fetch(`${CORS_URL}${RIOT_URL}match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=${MAX_LENGTH}&queue=400&queue420&queue=430&queue=440&api_key=${API_KEY}`)

const getChampionMatchListByAccount = (championId, accountId) => {
    return fetchChampionMatchListByAccount(championId, accountId).then(
        response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
}

// MATCHES
const fetchMatchById = matchId => fetch(`${CORS_URL}${RIOT_URL}match/v3/matches/${matchId}?api_key=${API_KEY}`)

const getMatchesForMatchList = matchList => {
    return dispatch => {
        const promises = []
        matchList.forEach(match => {
            promises.push(
                fetchMatchById(match.gameId).then(
                    response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    }).then(
                        data => dispatch({ type: ACTION_TYPES.GET_MATCH_SUCCESS, data }),
                        err => dispatch({ type: ACTION_TYPES.GET_MATCH_FAILURE, err })
                    )
            );
        });
        return Promise.all(promises)
    }
}

// USER DATA
const getUserDataForMatches = (accountId, matches) => {
    return dispatch => {
        matches.forEach(match => {
            for (var i = 0; i < match.participantIdentities.length; i++) {
                if (accountId === match.participantIdentities[i].player.currentAccountId) {
                    var userData = match.participants[i];
                    dispatch({ type: ACTION_TYPES.GET_USER_DATA, userData })
                    break;
                }
            }
        })
    }
}

// AGGREGATE USER DATA
const getAggregateUserDataByUserDataForMatchesAndMatches = (userDataForMatches, matches) => {
    return dispatch => {
        var averageKills = 0;
        var averageDeaths = 0;
        var averageAssists = 0;
        var averageVisionWardsBought = 0;
        var averageDamageDealtToTurrets = 0;
        var averageDamageDealtToObjectives = 0;
        var averageMinionsPerMinute = 0;

        var minionsPerMinute = [];
        for (var i = 0; i < MAX_LENGTH; i++) {
            var durationInMinutes = matches[i].gameDuration / 60;
            minionsPerMinute[i] = userDataForMatches[i].stats.totalMinionsKilled / durationInMinutes;
        }

        userDataForMatches.forEach((userData, i) => {
            averageKills += userData.stats.kills;
            averageDeaths += userData.stats.deaths;
            averageAssists += userData.stats.assists;
            averageVisionWardsBought += userData.stats.visionWardsBoughtInGame;
            averageDamageDealtToTurrets += userData.stats.damageDealtToTurrets;
            averageDamageDealtToObjectives += userData.stats.damageDealtToObjectives;
            averageMinionsPerMinute += minionsPerMinute[i];
        })

        averageKills /= MAX_LENGTH;
        averageDeaths /= MAX_LENGTH;
        averageAssists /= MAX_LENGTH;
        averageVisionWardsBought /= MAX_LENGTH;
        averageDamageDealtToTurrets /= MAX_LENGTH;
        averageDamageDealtToObjectives /= MAX_LENGTH;
        averageMinionsPerMinute /= MAX_LENGTH;


        console.log("averageKills: " + averageKills);
        console.log("averageDeaths: " + averageDeaths);
        console.log("averageAssists: " + averageAssists);
        console.log("averageVisionWardsBought: " + averageVisionWardsBought);
        console.log("averageDamageDealtToTurrets: " + averageDamageDealtToTurrets);
        console.log("averageDamageDealtToObjectives: " + averageDamageDealtToObjectives);
        console.log("averageMinionsPerMinute: " + averageMinionsPerMinute);

        //dispatch({ type: ACTION_TYPES.GET_AGGREGATE_USER_DATA, userDataForMatches });
    }
}

export const getDataForSummonerNameAndChampionId = (summonerName, championId) => {
    var matchList = []
    return (dispatch, getState) => {
        dispatch(getSummonerByName(summonerName))
        .then(() => dispatch(getChampionById(championId)))
        .then(() => getChampionMatchListByAccount(getState().champion.id, getState().summoner.accountId).then(data => {
            matchList = data.matches;
        }, err => err))
        .then(() => dispatch(getMatchesForMatchList(matchList)))
        .then(() => dispatch(getUserDataForMatches(getState().summoner.accountId, getState().matches)))
        .then(() => dispatch(getAggregateUserDataByUserDataForMatchesAndMatches(getState().userData, getState().matches)))
    }
}