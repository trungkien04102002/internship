const fs = require('fs')
const fetchh = require('node-fetch')
interface Team {
  id: number;
  name: string;
  players: string[];
}

interface TournamentSeason {
  id: number;
  name: string;
  teams: number[];
}

const urls = [
  'http://localhost:5000/api/teams',
  'http://localhost:5000/api/tourseas'
];

let dataArray: (Team | TournamentSeason)[] = [];

async function fetchData() {
  try {
    // Fetch data from all of the URLs in parallel
    const responses = await Promise.all(urls.map(url => fetchh(url)));

    // Parse the response data as JSON and combine it into one array
    const data = await Promise.all(responses.map(response => response.json()));
    dataArray.push(...data);
    console.log(dataArray)
    // Generate a timestamp to use as the filename
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `data/${timestamp}.json`;


    // Write the array to a JSON file
    fs.writeFile(filename, JSON.stringify(dataArray), (err: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Data saved to ${filename}`);
      }
    });

    // Clear the data array for the next iteration
    dataArray = [];
  } catch (error) {
    // Handle errors
    console.error(error);
  }
}

// Call fetchData to start the process
fetchData();

setInterval(() => {
  fetchData();
}, 10000);