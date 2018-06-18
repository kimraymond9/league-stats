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
const fetchChampionMatchListByAccount = (championId, accountId) => fetch(`${CORS_URL}${RIOT_URL}match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=${MAX_LENGTH}&queue=400&queue=420&queue=430&queue=440&queue=700&api_key=${API_KEY}`)

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
        var userDataForMatches = [];

        matches.forEach(match => {
            for (var i = 0; i < match.participantIdentities.length; i++) {
                if (accountId === match.participantIdentities[i].player.currentAccountId) {
                    userDataForMatches.push(match.participants[i]);
                    break;
                }
            }
        })
    
    var averageKills = 0;
    var averageDeaths = 0;
    var averageAssists = 0;
    var averageVisionWardsBought = 0;
    var averageWardsKilled = 0;
    var averageWardsPlaced = 0;
    var averageVisionScore = 0;
    var averageDamageDealtToTurrets = 0;
    var averageDamageDealtToObjectives = 0;
    var averageTotalDamageDealtToChampions = 0;
    var averagePhysicalDamageDealtToChampions = 0;
    var averageMagicDamageDealtToChampions = 0;
    var averageTrueDamageDealtToChampions = 0;
    var averagePercentageOfTrueDamage = 0;
    var averagePercentageOfPhysicalDamage = 0;
    var averagePercentageOfMagicDamage = 0;
    var averageDamageDealtToChampionsPerMinute = 0;
    var averageMinionsPerMinute = 0;
    var averageGoldPerMinute = 0;
    var numberOfWins = 0;
    var numberOfLosses = 0;
    var winrate = 0;
    var numberOfGames = 0;


    userDataForMatches.forEach((userData, i) => {
        numberOfGames++;

        var durationInMinutes = matches[i].gameDuration / 60;


        averageKills += userData.stats.kills;
        averageDeaths += userData.stats.deaths;
        averageAssists += userData.stats.assists;
        averageVisionWardsBought += userData.stats.visionWardsBoughtInGame;
        averageWardsKilled += userData.stats.wardsKilled;
        averageWardsPlaced += userData.stats.wardsPlaced;
        averageVisionScore += userData.stats.visionScore;
        averageDamageDealtToTurrets += userData.stats.damageDealtToTurrets;
        averageDamageDealtToObjectives += userData.stats.damageDealtToObjectives;
        averageTotalDamageDealtToChampions += userData.stats.totalDamageDealtToChampions;
        averagePhysicalDamageDealtToChampions += userData.stats.physicalDamageDealtToChampions;
        averageMagicDamageDealtToChampions += userData.stats.magicDamageDealtToChampions;
        averageTrueDamageDealtToChampions += userData.stats.trueDamageDealtToChampions;
        averageMinionsPerMinute += userData.stats.totalMinionsKilled / durationInMinutes;
        averageDamageDealtToChampionsPerMinute += userData.stats.totalDamageDealtToChampions / durationInMinutes;
        averageGoldPerMinute += userData.stats.goldEarned / durationInMinutes;
        
        if (userData.stats.win) {
            numberOfWins++;
        } else {
            numberOfLosses++;
        }

    })

        averageKills = (averageKills / numberOfGames).toFixed(1);
        averageDeaths = (averageDeaths / numberOfGames).toFixed(1);
        averageAssists = (averageAssists / numberOfGames).toFixed(1);
        averageVisionWardsBought = (averageVisionWardsBought / numberOfGames).toFixed(1);
        averageWardsKilled = (averageWardsKilled / numberOfGames).toFixed(1);
        averageWardsPlaced = (averageWardsPlaced / numberOfGames).toFixed(1);
        averageVisionScore = (averageVisionScore / numberOfGames).toFixed(1);
        averageDamageDealtToTurrets = (averageDamageDealtToTurrets / numberOfGames).toFixed(1);
        averageDamageDealtToObjectives = (averageDamageDealtToObjectives / numberOfGames).toFixed(1);
        averageTotalDamageDealtToChampions = (averageTotalDamageDealtToChampions / numberOfGames).toFixed(1);
        averagePhysicalDamageDealtToChampions = (averagePhysicalDamageDealtToChampions / numberOfGames).toFixed(1);
        averageMagicDamageDealtToChampions = (averageMagicDamageDealtToChampions / numberOfGames).toFixed(1);
        averageTrueDamageDealtToChampions = (averageTrueDamageDealtToChampions / numberOfGames).toFixed(1);
    
    
    averagePercentageOfPhysicalDamage = (averagePhysicalDamageDealtToChampions / averageTotalDamageDealtToChampions * 100).toFixed(1);
    averagePercentageOfMagicDamage = (averageMagicDamageDealtToChampions / averageTotalDamageDealtToChampions * 100).toFixed(1);
    averagePercentageOfTrueDamage = (averageTrueDamageDealtToChampions / averageTotalDamageDealtToChampions * 100).toFixed(1);
 
    averageGoldPerMinute = (averageGoldPerMinute / numberOfGames).toFixed(1);
    averageMinionsPerMinute = (averageMinionsPerMinute / numberOfGames).toFixed(1);
    averageDamageDealtToChampionsPerMinute = (averageDamageDealtToChampionsPerMinute / numberOfGames).toFixed(1);
    winrate = ((numberOfWins / numberOfGames) * 100).toFixed(1);

    const aggregateData = {
        numberOfGames: numberOfGames,
        numberOfWins: numberOfWins,
        numberOfLosses: numberOfLosses,
        winrate: winrate,
        averageKills: averageKills,
        averageDeaths: averageDeaths,
        averageAssists: averageAssists,
        averageVisionWardsBought: averageVisionWardsBought,
        averageWardsKilled: averageWardsKilled,
        averageWardsPlaced: averageWardsPlaced,
        averageVisionScore: averageVisionScore,
        averageDamageDealtToTurrets: averageDamageDealtToTurrets,
        averageDamageDealtToObjectives: averageDamageDealtToObjectives,
        averageMinionsPerMinute: averageMinionsPerMinute,
        averageDamageDealtToChampionsPerMinute: averageDamageDealtToChampionsPerMinute,
        averageTotalDamageDealtToChampions: averageTotalDamageDealtToChampions,
        averagePhysicalDamageDealtToChampions: averagePhysicalDamageDealtToChampions,
        averageMagicDamageDealtToChampions: averageMagicDamageDealtToChampions,
        averagePercentageOfPhysicalDamage: averagePercentageOfPhysicalDamage,
        averagePercentageOfMagicDamage: averagePercentageOfMagicDamage,
        averageTrueDamageDealtToChampions: averageTrueDamageDealtToChampions,
        averagePercentageOfTrueDamage: averagePercentageOfTrueDamage,
        averageGoldPerMinute: averageGoldPerMinute,

    };
    return dispatch({ type: ACTION_TYPES.GET_USER_DATA, aggregateData});
}
}

const getOpponentDataForMatches = (accountId, matches) => {
    return dispatch => {
        var opponentDataForMatches = [];

        matches.forEach(match => {
            var teamOfOpponent;
            for (var i = 0; i < match.participantIdentities.length; i++) {
                if (accountId === match.participantIdentities[i].player.currentAccountId) {
                    if(match.participants[i].teamId === 100){
                        teamOfOpponent = 200;
                    }else{
                        teamOfOpponent = 100;
                    }
                }
            }

            for (var j = 0; j < match.participantIdentities.length; j++) {
                if (match.participants[j].teamId === teamOfOpponent){
                    opponentDataForMatches.push(match.participants[j]);
                }
            }
        })

        var opponentChampionAndResult = [];
        opponentDataForMatches.forEach(data => {
            opponentChampionAndResult.push({ Champion: data.championId, Result: data.stats.win, Wins: 0, Losses: 0})
        })

      
        var opponentChampionAndResultCombine = opponentChampionAndResult.reduce(function (o, cur) {

            // Get the index of the key-value pair.
            var occurs = o.reduce(function (n, item, i) {
                return (item.Champion === cur.Champion) ? i : n;
            }, -1);
            // If the name is found,
            if (occurs >= 0) {

                // append the current value to its list of values.
                o[occurs].Result = o[occurs].Result.concat(cur.Result);

                if(cur.Result){
                    o[occurs].Losses++;
                }else{
                    o[occurs].Wins++;
                }

                // Otherwise,
            } else {

                // add the current item to o (but make sure the value is an array).
                if(cur.Result){
                var obj = { Champion: cur.Champion, Result: [cur.Result], Wins: 0, Losses: 1};
                o = o.concat([obj]);
                }else{
                var obj2 = { Champion: cur.Champion, Result: [cur.Result], Wins: 1, Losses: 0};
                o = o.concat([obj2]);
                }
            }

            return o;
        }, []);

        opponentChampionAndResultCombine.forEach(champion => {
            champion.winrate = ((champion.Wins / (champion.Wins + champion.Losses)) * 100).toFixed(0);
        })
        console.log(opponentChampionAndResultCombine);
        return dispatch({ type: ACTION_TYPES.GET_WINRATES, opponentChampionAndResultCombine });
    }}



export const getDataForSummonerNameAndChampionId = (summonerName, championId) => {
    var matchList = [];

    return (dispatch, getState) => {
        dispatch(getSummonerByName(summonerName))
        .then(() => dispatch(getChampionById(championId)))
        .then(() => getChampionMatchListByAccount(getState().champion.id, getState().summoner.accountId).then(data => {
            matchList = data.matches;
        }, err => err))
        .then(() => dispatch(getMatchesForMatchList(matchList)))
        .then(() => dispatch(getUserDataForMatches(getState().summoner.accountId, getState().matches)))
        .then(() => dispatch(getOpponentDataForMatches(getState().summoner.accountId, getState().matches)))
    }
}