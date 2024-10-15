// const $searchContainer = document.querySelector(
//   'search-container',
// ) as HTMLDivElement;
// const $search = document.querySelector('search') as HTMLDivElement;

// if (!$searchContainer) throw new Error('$searchContainer query failed!');
// if (!$search) throw new Error('$search query failed!');

// // $searchContainer.addEventListener('click', (event: MouseEvent) => {
// //   const $eventTarget = event.target as HTMLDivElement;
// //   if ($eventTarget.matches('.search')) {
// //     $search.forEach((search) => {

// //     })
// // }

// const url = 'https://api-nba-v1.p.rapidapi.com/players?team=1';
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '5b4cdff109msh4150a450e50c198p174c71jsnde1338638b6c',
//     'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
//   },
// };
// const $teams = document.getElementById('teams')as HTMLDivElement;
// const data = {
//   teams: [],
// };
// async function fetchTeams(): Promise<void> {
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log('result', result);
//     const nbaTeams = result.response.filter(
//       (team) => team.nbaFranchise === true,
//     );
//     nbaTeams.forEach((team) => {
//       data.teams.push(team);
//       $teams?.appendChild(renderTeam(team));
//     });
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
// function renderTeam(team: any): Promise<void>{
//   console.log('team', team);
//   const $row = document.createElement('div');
//   $row.setAttribute('data-team-id', team.id);
//   const $img = document.createElement('img');
//   $img.src = team.logo;
//   $row.appendChild($img);
//   return $row;
// }
// fetchTeams();

// Wait for the DOM to fully load
// document.addEventListener('DOMContentLoaded', () => {
//   // Fetching the NBA players data from the JSON file
//   fetch('data.ts')
//     .then((response) => response.json())
//     .then((data) => {
//       const teams = data.teams;
//       const teamsList = document.getElementById('teams-list');
//       const searchButton = document.getElementById('search-button');
//       const searchInput = document.getElementById('search-input');

//       function displayTeams(teamsToDisplay) {
//         teamsList.innerHTML = ''; // Clear previous results
//         teamsToDisplay.forEach((team) => {
//           teamsList.innerHTML += `
//         <div>
//           <h2>${team.name}</h2>
//           <p>ID: ${team.id}</p>
//           <p>Division: ${team.division}</p>
//           <p>Conference: ${team.conference}</p>
//           <p>Championships: ${team.championships}</p>
//           </div>
//           <hr>
//       `;
//     });
//   }

//   // Initial display of all teams
//   displayTeams(teams);

//    // Search functionality
//   searchButton.addEventListener('click', () => {
//     const searchTerm = searchInput.value.toLowerCase();
//     const filteredTeams = teams.filter((player) =>
//     player.name.toLowerCase().includes(searchTerm),
//       );
//         displayTeams(filteredTeams); // Display only searched for teams
//       });
//     })
//     .catch((error) => console.error('Error loading player data:', error));
// });

// main.ts

document.addEventListener('DOMContentLoaded', async () => {
  const $playerList = document.getElementById(
    'player-list',
  ) as HTMLTableSectionElement;
  const $searchButton = document.querySelector(
    '.search-button',
  ) as HTMLButtonElement;
  const $searchInput = document.querySelector(
    '.search-input',
  ) as HTMLInputElement;

  if (!$playerList) throw new Error('$playerList query failed!');
  if (!$searchButton) throw new Error('$searchButton query failed!');
  if (!$searchInput) throw new Error('$searchInput query failed!');

  $searchButton.addEventListener('click', async () => {
    const searchTerm = $searchInput.value.toLowerCase();
    $playerList.textContent = ''; // Clear previous results
    const fetchPlayers = await fetch(
      `https://api-nba-v1.p.rapidapi.com/players?search=${searchTerm}`,
      {
        headers: {
          'x-rapidapi-key':
            '4f1eec5d75msh66bdbaae2d9c120p19139ejsn99bedfab1020',
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        },
      },
    );
    const searchResults = await fetchPlayers.json();
    console.log(searchResults);
    for (const player of searchResults.response) {
      // const nbaPlayers = searchResults.response.filter(
      //   (player) => player.leagues.standard.active === true,
      //   console.log(nbaPlayers);
      // );

      const row = document.createElement('tr');
      const playerName = document.createElement('td');
      // repeat with whatever else you want to add (height, age, etc..)
      const playerHeight = document.createElement('td');
      const jersey = document.createElement('td');
      const weight = document.createElement('td');

      playerName.textContent = player.firstname + ' ' + player.lastname;
      jersey.textContent = player.leagues.standard.jersey;
      // repeat with whatever else you want to add (inches, age, etc..)
      playerHeight.textContent =
        player.height.feets + "' " + player.height.inches + '"' ?? 'n/a';
      weight.textContent = player.weight.pounds;

      row.append(playerName, jersey, playerHeight, weight);
      $playerList.appendChild(row);
      console.log(player.firstname);
    }
  });
});
