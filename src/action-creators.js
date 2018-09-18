import { API_KEY, CORS_URL, MAX_LENGTH, RIOT_URL } from './API-constants.js';
import ACTION_TYPES from './action-types';
import _ from 'lodash';

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

// MATCH LIST
const fetchChampionMatchListByAccount = (championId, accountId) => fetch(`${CORS_URL}${RIOT_URL}match/v3/matchlists/by-account/${accountId}?champion=${championId}&endIndex=${MAX_LENGTH}&queue=400&queue=420&queue=440&queue=700&api_key=${API_KEY}`)

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

const fetchMatchTimelineById = matchId => fetch(`${CORS_URL}${RIOT_URL}match/v3/timelines/by-match/${matchId}?api_key=${API_KEY}`)

const getMatchTimelineForMatchList = matchList => {
    return dispatch => {
        const promises = []
        matchList.forEach(match => {
            promises.push(
                fetchMatchTimelineById(match.gameId).then(
                    response => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    }).then(
                        data => {
                            data.gameId = match.gameId;
                            dispatch({ type: ACTION_TYPES.GET_MATCH_TIMELINE_SUCCESS, data })
                        },
                        err => dispatch({ type: ACTION_TYPES.GET_MATCH_TIMELINE_FAILURE, err })
                    )
            );
        });
        return Promise.all(promises);
    }
}

const getMatchTimelineData = (accountId, matches, matchTimelines) => {
    return dispatch => {

        var matchesOrdered = matches;
        var matchTimelinesOrdered = matchTimelines;
        
        var csNumbersAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var jungleMinionsAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var goldNumbersAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var opponentCsNumbersAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var opponentJungleMinionsAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var opponentGoldNumbersAtMinutes = {
            0: [],
            5: [],
            10: [],
            15: [],
            20: [],
            25: [],
            30: []
        }

        var yourKillsAtMinutes = {
            0: 0,
            5: 0,
            10: 0,
            15: 0,
            20: 0,
            25: 0,
            30: 0
        }

        var yourDeathsAtMinutes = {
            0: 0,
            5: 0,
            10: 0,
            15: 0,
            20: 0,
            25: 0,
            30: 0
        }

        var yourAssistsAtMinutes = {
            0: 0,
            5: 0,
            10: 0,
            15: 0,
            20: 0,
            25: 0,
            30: 0
        }
        
        var averageKillsAtMinutes = [];
        var averageDeathsAtMinutes = [];
        var averageAssistsAtMinutes = [];
        var averageKdaAtMinutes = [];

        var averageCsNumbersAtMinutes = [];
        var averageCsNumbersPerMinuteAtMinutes = [];
        var averageJungleMinionsAtMinutes = [];
        var averageGoldNumbersAtMinutes = [];
            
        var averageOpponentCsNumbersAtMinutes = [];
        var averageOpponentCsNumbersPerMinuteAtMinutes = [];
        var averageOpponentJungleMinionsAtMinutes = [];
        var averageOpponentGoldNumbersAtMinutes = [];

        matchesOrdered = _.orderBy(matchesOrdered, ['gameId'], ['asc'])
        matchTimelinesOrdered = _.orderBy(matchTimelinesOrdered, ['gameId'], ['asc'])

        console.log(matchesOrdered);
        console.log(matchTimelinesOrdered);

        var userParticipantIds = [];
        var enemyParticipantIds = [];
        var userTeamIds = [];
        var roleOfPlayer = [];
        var aggregateRoleOfPlayer;
        
        var matchCounter = 0;
        matchesOrdered.forEach(match => {
            var yourBottomLane = [];
            for (var i = 0; i < match.participantIdentities.length; i++) {
                if (match.participantIdentities[i].player.currentAccountId === accountId) {
                    userTeamIds.push(match.participants[i].teamId);
                    userParticipantIds.push(match.participants[i].participantId);
                    if (match.participants[i].timeline.lane === 'BOTTOM'){
                        yourBottomLane.push(match.participants[i]);
                        for (var j = 0; j < match.participantIdentities.length; j++) {
                            if (userTeamIds[matchCounter] === match.participants[j].teamId && match.participants[j].timeline.lane === 'BOTTOM' && match.participantIdentities[j].player.currentAccountId !== accountId) {
                                yourBottomLane.push(match.participants[j]);
                            }
                        }
                    }else{
                        roleOfPlayer.push(match.participants[i].timeline.lane);
                    }
                }
            }
            if (yourBottomLane.length === 2 && matchTimelinesOrdered[matchCounter].frames[10] !== undefined) {
                var botLaner1 = matchTimelinesOrdered[matchCounter].frames[10].participantFrames[yourBottomLane[0].participantId].minionsKilled;
                var botLaner2 = matchTimelinesOrdered[matchCounter].frames[10].participantFrames[yourBottomLane[1].participantId].minionsKilled;
                if (botLaner1 > botLaner2) {
                    roleOfPlayer.push('ADC');
                } else {
                    roleOfPlayer.push('SUPPORT');
                }
            }
            matchCounter++;
        })
        aggregateRoleOfPlayer = getMostCommonRole(roleOfPlayer);

        var matchCounterForOpponents = 0;
        matchesOrdered.forEach(match => {
            var opponentBottomLane = [];
            for (var i = 0; i < match.participantIdentities.length; i++) {
                if (userTeamIds[matchCounterForOpponents] !== match.participants[i].teamId && match.participants[i].timeline.lane === 'BOTTOM' && (aggregateRoleOfPlayer === 'SUPPORT' || aggregateRoleOfPlayer === 'ADC')){
                    opponentBottomLane.push(match.participants[i]);
                }
                if (userTeamIds[matchCounterForOpponents] !== match.participants[i].teamId && match.participants[i].timeline.lane !== 'BOTTOM' && (aggregateRoleOfPlayer !== 'SUPPORT' || aggregateRoleOfPlayer !== 'ADC')){
                    if (aggregateRoleOfPlayer === match.participants[i].timeline.lane){
                        enemyParticipantIds[matchCounterForOpponents] = match.participants[i].timeline.participantId;
                        break;
                    }
                }
            }
            if(opponentBottomLane.length === 2){
                var botLaner1 = matchTimelinesOrdered[matchCounterForOpponents].frames[10].participantFrames[opponentBottomLane[0].participantId].minionsKilled;
                var botLaner2 = matchTimelinesOrdered[matchCounterForOpponents].frames[10].participantFrames[opponentBottomLane[1].participantId].minionsKilled;
                if(aggregateRoleOfPlayer === 'ADC'){
                    if (botLaner1 > botLaner2){
                        enemyParticipantIds[matchCounterForOpponents] = opponentBottomLane[0].participantId;
                    }else{
                        enemyParticipantIds[matchCounterForOpponents] = opponentBottomLane[1].participantId;
                    }
                }
                if (aggregateRoleOfPlayer === 'SUPPORT') {
                    if (botLaner1 > botLaner2) {
                        enemyParticipantIds[matchCounterForOpponents] = opponentBottomLane[1].participantId;
                    }else {
                        enemyParticipantIds[matchCounterForOpponents] = opponentBottomLane[0].participantId;
                    }
                }
            }
            matchCounterForOpponents++;
        })

        var participantCounter = 0;
        matchTimelinesOrdered.forEach(matchTimeline => {
            for(var i = 0; i <= 30; i += 5){
                if (enemyParticipantIds[participantCounter] === undefined || matchTimeline.frames[i] === undefined){
                    break;
                }

                csNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].minionsKilled);
                jungleMinionsAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].jungleMinionsKilled);
                goldNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].totalGold);
                
                opponentCsNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].minionsKilled);
                opponentJungleMinionsAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].jungleMinionsKilled);
                opponentGoldNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].totalGold);
            }
            participantCounter++;
        })

            var matchTimelineCounter = 0;
            matchTimelinesOrdered.forEach(matchTimeline => {
                for (var i = 0; i <= 30; i++) {
                    if (matchTimeline.frames[i] === undefined) {
                        break;
                    }
                        
                    for (var j = 0; j < matchTimeline.frames[i].events.length; j++) {
                        if (matchTimeline.frames[i].events[j].type === "CHAMPION_KILL" && matchTimeline.frames[i].events[j].killerId === userParticipantIds[matchTimelineCounter]) {
                            if (i >= 0 && i <= 4) {
                                yourKillsAtMinutes[5]++;
                            }
                            if (i >= 5 && i <= 9) {
                                yourKillsAtMinutes[10]++;
                            }
                            if (i >= 10 && i <= 14) {
                                yourKillsAtMinutes[15]++;
                            }
                            if (i >= 15 && i <= 19) {
                                yourKillsAtMinutes[20]++;
                            }
                            if (i >= 20 && i <= 24) {
                                yourKillsAtMinutes[25]++;
                            }
                            if (i >= 25 && i <= 30) {
                                yourKillsAtMinutes[30]++;
                            }
                        }
                        if (matchTimeline.frames[i].events[j].type === "CHAMPION_KILL" && matchTimeline.frames[i].events[j].victimId === userParticipantIds[matchTimelineCounter]) {
                            if (i >= 0 && i <= 4) {
                                yourDeathsAtMinutes[5]++;
                            }
                            if (i >= 5 && i <= 9) {
                                yourDeathsAtMinutes[10]++;
                            }
                            if (i >= 10 && i <= 14) {
                                yourDeathsAtMinutes[15]++;
                            }
                            if (i >= 15 && i <= 19) {
                                yourDeathsAtMinutes[20]++;
                            }
                            if (i >= 20 && i <= 24) {
                                yourDeathsAtMinutes[25]++;
                            }
                            if (i >= 25 && i <= 30) {
                                yourDeathsAtMinutes[30]++;
                            }
                        }
                        if (matchTimeline.frames[i].events[j].type === "CHAMPION_KILL" && matchTimeline.frames[i].events[j].assistingParticipantIds.includes(userParticipantIds[matchTimelineCounter])){
                            if (i >= 0 && i <= 4) {
                                yourAssistsAtMinutes[5]++;
                            }
                            if (i >= 5 && i <= 9) {
                                yourAssistsAtMinutes[10]++;
                            }
                            if (i >= 10 && i <= 14) {
                                yourAssistsAtMinutes[15]++;
                            }
                            if (i >= 15 && i <= 19) {
                                yourAssistsAtMinutes[20]++;
                            }
                            if (i >= 20 && i <= 24) {
                                yourAssistsAtMinutes[25]++;
                            }
                            if (i >= 25 && i <= 30) {
                                yourAssistsAtMinutes[30]++;
                            }
                        }
                    }
                }
                matchTimelineCounter++
            })

        var totalKills = 0;
        for (var minute in yourKillsAtMinutes){
            var averageKills = yourKillsAtMinutes[minute] / matchTimelinesOrdered.length;
            totalKills += averageKills;
            averageKillsAtMinutes.push(totalKills)
        }

        var totalDeaths = 0;
        for (minute in yourDeathsAtMinutes) {
            var averageDeaths = yourDeathsAtMinutes[minute] / matchTimelinesOrdered.length;
            totalDeaths += averageDeaths;
            averageDeathsAtMinutes.push(totalDeaths)
        }

        var totalAssists = 0;
        for (minute in yourAssistsAtMinutes) {
            var averageAssists = yourAssistsAtMinutes[minute] / matchTimelinesOrdered.length;
            totalAssists += averageAssists;
            averageAssistsAtMinutes.push(totalAssists)
        }

        for (var i = 0; i < averageKillsAtMinutes.length;i++){
            averageKdaAtMinutes.push((averageKillsAtMinutes[i] + averageAssistsAtMinutes[i]) / averageDeathsAtMinutes[i]);
        }

        for (minute in csNumbersAtMinutes){
            var averageCsNumbers;
            var averageCsNumbersPerMinute;
            for (i = 0; i < csNumbersAtMinutes[minute].length; i++){
                averageCsNumbers += csNumbersAtMinutes[minute][i];
            }
            averageCsNumbers /= csNumbersAtMinutes[minute].length;
            averageCsNumbersPerMinute = averageCsNumbers / minute;
            averageCsNumbersAtMinutes.push(averageCsNumbers);
            averageCsNumbersPerMinuteAtMinutes.push(averageCsNumbersPerMinute);
            averageCsNumbers = 0;
            averageCsNumbersPerMinute = 0;
        }

        for (minute in opponentCsNumbersAtMinutes) {
            var averageOpponentCsNumbers;
            var averageOpponentCsNumbersPerMinute;
            for (i = 0; i < opponentCsNumbersAtMinutes[minute].length; i++) {
                if (opponentCsNumbersAtMinutes[minute][i] !== undefined){
                    averageOpponentCsNumbers += opponentCsNumbersAtMinutes[minute][i];
                }
            }
            averageOpponentCsNumbers /= opponentCsNumbersAtMinutes[minute].length;
            averageOpponentCsNumbersPerMinute = averageOpponentCsNumbers / minute;
            averageOpponentCsNumbersAtMinutes.push(averageOpponentCsNumbers);
            averageOpponentCsNumbersPerMinuteAtMinutes.push(averageOpponentCsNumbersPerMinute);
            averageOpponentCsNumbers = 0;
            averageOpponentCsNumbersPerMinute = 0;
        }
        

        for (minute in jungleMinionsAtMinutes) {
            var averageJungleMinions;
            for (i = 0; i < jungleMinionsAtMinutes[minute].length; i++) {
                averageJungleMinions += jungleMinionsAtMinutes[minute][i];
            }
            averageJungleMinions /= jungleMinionsAtMinutes[minute].length;
            averageJungleMinionsAtMinutes.push(averageJungleMinions);
            averageJungleMinions = 0;
        }

        for (minute in opponentJungleMinionsAtMinutes) {
            var averageOpponentJungleMinions;
            for (i = 0; i < opponentJungleMinionsAtMinutes[minute].length; i++) {
                if (opponentJungleMinionsAtMinutes[minute][i] !== undefined){
                    averageOpponentJungleMinions += opponentJungleMinionsAtMinutes[minute][i];
                }
            }
            averageOpponentJungleMinions /= opponentJungleMinionsAtMinutes[minute].length;
            averageOpponentJungleMinionsAtMinutes.push(averageOpponentJungleMinions);
            averageOpponentJungleMinions = 0;
        }

        for (minute in goldNumbersAtMinutes) {
            var averageGold;
            for (i = 0; i < goldNumbersAtMinutes[minute].length; i++) {
                averageGold += goldNumbersAtMinutes[minute][i];
            }
            averageGold /= goldNumbersAtMinutes[minute].length;
            averageGoldNumbersAtMinutes.push(averageGold);
            averageGold = 0;
        }

        for (minute in opponentGoldNumbersAtMinutes) {
            var averageOpponentGold;
            for (i = 0; i < opponentGoldNumbersAtMinutes[minute].length; i++) {
                if (opponentGoldNumbersAtMinutes[minute][i] !== undefined){
                    averageOpponentGold += opponentGoldNumbersAtMinutes[minute][i];
                }
            }
            averageOpponentGold /= opponentGoldNumbersAtMinutes[minute].length;
            averageOpponentGoldNumbersAtMinutes.push(averageOpponentGold);
            averageOpponentGold = 0;
        }

        averageCsNumbersAtMinutes.splice(0, 1, 0);
        averageCsNumbersPerMinuteAtMinutes.splice(0, 1, 0);
        averageJungleMinionsAtMinutes.splice(0, 1, 0);
        averageGoldNumbersAtMinutes.splice(0, 1, 500);
        averageKdaAtMinutes.splice(0, 1, 0);

        averageOpponentCsNumbersAtMinutes.splice(0, 1, 0);
        averageOpponentCsNumbersPerMinuteAtMinutes.splice(0, 1, 0);
        averageOpponentJungleMinionsAtMinutes.splice(0, 1, 0);
        averageOpponentGoldNumbersAtMinutes.splice(0, 1, 500);

        var aggregateTimelineData = {
            averageKillsAtMinutes: averageKillsAtMinutes,
            averageDeathsAtMinutes: averageDeathsAtMinutes,
            averageAssistsAtMinutes: averageAssistsAtMinutes,
            averageKdaAtMinutes: averageKdaAtMinutes,
            averageCsNumbersAtMinutes: averageCsNumbersAtMinutes,
            averageCsNumbersPerMinuteAtMinutes: averageCsNumbersPerMinuteAtMinutes,
            averageOpponentCsNumbersAtMinutes: averageOpponentCsNumbersAtMinutes,
            averageOpponentCsNumbersPerMinuteAtMinutes: averageOpponentCsNumbersPerMinuteAtMinutes,
            averageJungleMinionsAtMinutes: averageJungleMinionsAtMinutes,
            averageOpponentJungleMinionsAtMinutes: averageOpponentJungleMinionsAtMinutes,
            averageGoldNumbersAtMinutes: averageGoldNumbersAtMinutes,
            averageOpponentGoldNumbersAtMinutes: averageOpponentGoldNumbersAtMinutes,
            
        }
        return dispatch({ type: ACTION_TYPES.GET_USER_TIMELINE_DATA, aggregateTimelineData });
    }
}


const getMostCommonRole = (arrayOfRoles) => {
    return arrayOfRoles.sort((a, b) =>
        arrayOfRoles.filter(v => v === a).length
        - arrayOfRoles.filter(v => v === b).length
    ).pop();
}

const clearData = () => {
    return dispatch => {
        var hello = "";
        return dispatch({ type: ACTION_TYPES.CLEAR_DATA, hello })
    }
}


export const getDataForSummonerNameAndChampionId = (summonerName, championId) => {
    var matchList = [];

    return (dispatch, getState) => {
        dispatch(clearData())
        dispatch(getSummonerByName(summonerName))
            .then(() => getChampionMatchListByAccount(championId, getState().summoner.accountId).then(data => {
                matchList = data.matches;
            }, err => err))
            .then(() => dispatch(getMatchesForMatchList(matchList)))
            .then(() => dispatch(getMatchTimelineForMatchList(matchList)))
            .then(() => dispatch(getMatchTimelineData(getState().summoner.accountId, getState().matches, getState().matchesTimeline)))
    }
}