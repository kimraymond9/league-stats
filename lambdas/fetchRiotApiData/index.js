const fetch = require("node-fetch");

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let url;
    const RIOT_URL = '.api.riotgames.com/lol/';
    const eventBody = JSON.parse(event.body);

    if (eventBody.endpoint === 'summoner') {
        url = `https://${eventBody.region}${RIOT_URL}summoner/v4/summoners/by-name/${eventBody.summonerName}?api_key=${process.env.RIOT_API_KEY}`;
    } else if (eventBody.endpoint === 'matchList') {
        url = `https://${eventBody.region}${RIOT_URL}match/v4/matchlists/by-account/${eventBody.accountId}?champion=${eventBody.championId}&endIndex=10&queue=400&queue=420&queue=440&queue=700&api_key=${process.env.RIOT_API_KEY}`;
    } else if (eventBody.endpoint === 'matches') {
        url = `https://${eventBody.region}${RIOT_URL}match/v4/matches/${eventBody.matchId}?api_key=${process.env.RIOT_API_KEY}`;
    } else if (eventBody.endpoint === 'matchTimeline') {
        url = `https://${eventBody.region}${RIOT_URL}match/v4/timelines/by-match/${eventBody.matchId}?api_key=${process.env.RIOT_API_KEY}`;
    }

    fetch(url).then(res => {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    })
        .then(response => callback(null, {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
        }))
        .catch(error => callback(error));
};
