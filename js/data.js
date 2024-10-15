"use strict";
async function fetchTeams() {
    const apiUrl = 'https://api-nba-v1.p.rapidapi.com/teams';
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4f1eec5d75msh66bdbaae2d9c120p19139ejsn99bedfab1020',
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            },
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching teams:', error);
        return { response: [] };
    }
}
async function fetchPlayers(teamId, season) {
    const apiUrl = `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=${season}`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4f1eec5d75msh66bdbaae2d9c120p19139ejsn99bedfab1020',
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            },
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const testPlayers = await response.json();
        console.log(testPlayers);
    }
    catch (error) {
        console.error('Error fetching players:', error);
        return { response: [] };
    }
}
fetchPlayers(1, 2023);
// fetchTeams();
