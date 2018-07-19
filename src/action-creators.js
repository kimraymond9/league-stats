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

        var xpNumbersAtMinutes = {
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

        var opponentXpNumbersAtMinutes = {
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

        var averageCsNumbersAtMinutes = [];
        var averageJungleMinionsAtMinutes = [];
        var averageXpNumbersAtMinutes = [];
        var averageGoldNumbersAtMinutes = [];
            
        var averageOpponentCsNumbersAtMinutes = [];
        var averageOpponentJungleMinionsAtMinutes = [];
        var averageOpponentXpNumbersAtMinutes = [];
        var averageOpponentGoldNumbersAtMinutes = [];

        matchesOrdered = _.orderBy(matchesOrdered, ['gameId'], ['asc'])
        matchTimelinesOrdered = _.orderBy(matchTimelinesOrdered, ['gameId'], ['asc'])

        console.log(matchesOrdered);
        console.log(matchTimelinesOrdered);

        var userParticipantIds = [];
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

        var enemyParticipantIds = [];
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
        console.log(userParticipantIds);
        console.log(enemyParticipantIds);

        var participantCounter = 0;
        matchTimelinesOrdered.forEach(matchTimeline => {
            for(var i = 0; i <= 30; i += 5){
                if (enemyParticipantIds[participantCounter] === undefined || matchTimeline.frames[i] === undefined){
                    break;
                }

                csNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].minionsKilled);
                jungleMinionsAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].jungleMinionsKilled);
                xpNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].xp);
                goldNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[userParticipantIds[participantCounter]].totalGold);
                
                opponentCsNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].minionsKilled);
                opponentJungleMinionsAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].jungleMinionsKilled);
                opponentXpNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].xp);
                opponentGoldNumbersAtMinutes[i].push(matchTimeline.frames[i].participantFrames[enemyParticipantIds[participantCounter]].totalGold);
            }
            participantCounter++;
        })

        for (var minute in csNumbersAtMinutes){
            var averageCsNumbers;
            for (var i = 0; i < csNumbersAtMinutes[minute].length; i++){
                averageCsNumbers += csNumbersAtMinutes[minute][i];
            }
            averageCsNumbers /= csNumbersAtMinutes[minute].length;
            averageCsNumbersAtMinutes.push(averageCsNumbers);
            averageCsNumbers = 0;
        }

        for (minute in opponentCsNumbersAtMinutes) {
            var averageOpponentCsNumbers;
            for (i = 0; i < opponentCsNumbersAtMinutes[minute].length; i++) {
                if (opponentCsNumbersAtMinutes[minute][i] !== undefined){
                    averageOpponentCsNumbers += opponentCsNumbersAtMinutes[minute][i];
                }
            }
            averageOpponentCsNumbers /= opponentCsNumbersAtMinutes[minute].length;
            averageOpponentCsNumbersAtMinutes.push(averageOpponentCsNumbers);
            averageOpponentCsNumbers = 0;
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

        for (minute in xpNumbersAtMinutes) {
            var averageXp;
            for (i = 0; i < xpNumbersAtMinutes[minute].length; i++) {
                averageXp += xpNumbersAtMinutes[minute][i];
            }
            averageXp /= xpNumbersAtMinutes[minute].length;
            averageXpNumbersAtMinutes.push(averageXp);
            averageXp = 0;
        }

        for (minute in opponentXpNumbersAtMinutes) {
            var averageOpponentXp;
            for (i = 0; i < opponentXpNumbersAtMinutes[minute].length; i++) {
                if (opponentXpNumbersAtMinutes[minute][i] !== undefined){
                    averageOpponentXp += opponentXpNumbersAtMinutes[minute][i];
                }
            }
            averageOpponentXp /= opponentXpNumbersAtMinutes[minute].length;
            averageOpponentXpNumbersAtMinutes.push(averageOpponentXp);
            averageOpponentXp = 0;
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
        averageJungleMinionsAtMinutes.splice(0, 1, 0);
        averageXpNumbersAtMinutes.splice(0, 1, 0);
        averageGoldNumbersAtMinutes.splice(0, 1, 500);

        averageOpponentCsNumbersAtMinutes.splice(0, 1, 0);
        averageOpponentJungleMinionsAtMinutes.splice(0, 1, 0);
        averageOpponentXpNumbersAtMinutes.splice(0, 1, 0);
        averageOpponentGoldNumbersAtMinutes.splice(0, 1, 500);

        var averageLevelAtMinutes = [1];
        for (i = 1; i < averageXpNumbersAtMinutes.length; i++){
            if (averageXpNumbersAtMinutes[i] >= 0 && averageXpNumbersAtMinutes[i] <= 279){
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 280) + 1).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 280 && averageXpNumbersAtMinutes[i] <= 659) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 660) + 2).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 660 && averageXpNumbersAtMinutes[i] <= 1139) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 1140) + 3).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 1140 && averageXpNumbersAtMinutes[i] <= 1719) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 1720) + 4).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 1720 && averageXpNumbersAtMinutes[i] <= 2399) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 2400) + 5).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 2400 && averageXpNumbersAtMinutes[i] <= 3179) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 3180) + 6).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 3180 && averageXpNumbersAtMinutes[i] <= 4059) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 4060) + 7).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 4060 && averageXpNumbersAtMinutes[i] <= 5039) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 5040) + 8).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 5040 && averageXpNumbersAtMinutes[i] <= 6119) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 6120) + 9).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 6120 && averageXpNumbersAtMinutes[i] <= 7299) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 7300) + 10).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 7300 && averageXpNumbersAtMinutes[i] <= 8579) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 8580) + 11).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 8580 && averageXpNumbersAtMinutes[i] <= 9959) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 9960) + 12).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 9960 && averageXpNumbersAtMinutes[i] <= 11439) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 11440) + 13).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 11440 && averageXpNumbersAtMinutes[i] <= 13019) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 13020) + 14).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 13020 && averageXpNumbersAtMinutes[i] <= 14699) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 14700) + 15).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 14700 && averageXpNumbersAtMinutes[i] <= 16479) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 16480) + 16).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 16480 && averageXpNumbersAtMinutes[i] <= 18359) {
                averageLevelAtMinutes.push(((averageXpNumbersAtMinutes[i] / 18360) + 17).toFixed(1));
            }
            if (averageXpNumbersAtMinutes[i] >= 18360) {
                averageLevelAtMinutes.push(18);
            }
        }

        var averageOpponentLevelAtMinutes = [1];
        for (i = 1; i < averageXpNumbersAtMinutes.length; i++) {
            if (averageOpponentXpNumbersAtMinutes[i] !== undefined){
                if (averageOpponentXpNumbersAtMinutes[i] >= 0 && averageOpponentXpNumbersAtMinutes[i] <= 279) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 280) + 1).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 280 && averageOpponentXpNumbersAtMinutes[i] <= 659) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 660) + 2).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 660 && averageOpponentXpNumbersAtMinutes[i] <= 1139) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 1140) + 3).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 1140 && averageOpponentXpNumbersAtMinutes[i] <= 1719) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 1720) + 4).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 1720 && averageOpponentXpNumbersAtMinutes[i] <= 2399) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 2400) + 5).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 2400 && averageOpponentXpNumbersAtMinutes[i] <= 3179) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 3180) + 6).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 3180 && averageOpponentXpNumbersAtMinutes[i] <= 4059) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 4060) + 7).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 4060 && averageOpponentXpNumbersAtMinutes[i] <= 5039) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 5040) + 8).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 5040 && averageOpponentXpNumbersAtMinutes[i] <= 6119) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 6120) + 9).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 6120 && averageOpponentXpNumbersAtMinutes[i] <= 7299) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 7300) + 10).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 7300 && averageOpponentXpNumbersAtMinutes[i] <= 8579) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 8580) + 11).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 8580 && averageOpponentXpNumbersAtMinutes[i] <= 9959) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 9960) + 12).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 9960 && averageOpponentXpNumbersAtMinutes[i] <= 11439) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 11440) + 13).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 11440 && averageOpponentXpNumbersAtMinutes[i] <= 13019) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 13020) + 14).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 13020 && averageOpponentXpNumbersAtMinutes[i] <= 14699) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 14700) + 15).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 14700 && averageOpponentXpNumbersAtMinutes[i] <= 16479) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 16480) + 16).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 16480 && averageOpponentXpNumbersAtMinutes[i] <= 18359) {
                    averageOpponentLevelAtMinutes.push(((averageOpponentXpNumbersAtMinutes[i] / 18360) + 17).toFixed(1));
                }
                if (averageOpponentXpNumbersAtMinutes[i] >= 18360) {
                    averageOpponentLevelAtMinutes.push(18);
                }
        }
        }

        var aggregateTimelineData = {
            averageCsNumbersAtMinutes: averageCsNumbersAtMinutes,
            averageOpponentCsNumbersAtMinutes: averageOpponentCsNumbersAtMinutes,
            averageJungleMinionsAtMinutes: averageJungleMinionsAtMinutes,
            averageOpponentJungleMinionsAtMinutes: averageOpponentJungleMinionsAtMinutes,
            averageLevelAtMinutes: averageLevelAtMinutes,
            averageOpponentLevelAtMinutes: averageOpponentLevelAtMinutes,
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



export const getDataForSummonerNameAndChampionId = (summonerName, championId) => {
    var matchList = [];

    return (dispatch, getState) => {
        dispatch(getSummonerByName(summonerName))
        .then(() => getChampionMatchListByAccount(championId, getState().summoner.accountId).then(data => {
            matchList = data.matches;
        }, err => err))
        .then(() => dispatch(getMatchesForMatchList(matchList)))
        .then(() => dispatch(getMatchTimelineForMatchList(matchList)))
        .then(() => dispatch(getMatchTimelineData(getState().summoner.accountId, getState().matches, getState().matchesTimeline)))
    }
}