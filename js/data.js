'use strict';
// nba-api.ts
//  interface playerInfo {
//   id: number;
//   name: string;
//   firstName: string;
//   lastName: string;
//   birthday: string;
//   college: string;
//   country: string;
//   number: number;
//   height: string
//   feet: null;
//   inches: null;
// }
// Store API headers for RapidAPI
const apiHeaders = {
  'X-RapidAPI-Key': '4f1eec5d75msh66bdbaae2d9c120p19139ejsn99bedfab1020',
  'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
};
// Fetching nba teams and build a mapping
async function fetchTeams() {
  const apiUrl = 'https://api-nba-v1.p.rapidapi.com/teams';
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: apiHeaders,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    const teamNames = {};
    // Build the team names mapping
    data.response.forEach((team) => {
      teamNames[team.id] = team.name;
    });
    return teamNames;
  } catch (error) {
    console.error('Error fetching team data:', error);
    return {};
  }
}
// building the dynamic API URL
function getNbaApiUrl(teamId, season) {
  return `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=${season}`;
}
// fetching players from the NBA API
async function getNbaPlayers(teamId, season, teamNames) {
  const apiUrl = getNbaApiUrl(teamId, season);
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: apiHeaders,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    const teamName = teamNames[teamId];
    console.log(
      `NBA Players for ${teamName} during the ${season}: season`,
      data,
    );
  } catch (error) {
    console.error('Error fetching data from NBA API:', error);
  }
}
// Main function to orchestrate fetching teams and players
async function main(teamId, season) {
  const teamNames = await fetchTeams(); // Fetching team names and IDs
  // Call the function to get players
  await getNbaPlayers(teamId, season, teamNames);
}
// Calling the main function with dynamic inputs
const teamId = 1; // Change this to any valid NBA team ID
const season = 2022; // Change this to any season year
main(teamId, season);
