// liri.js action
var dotenv = require('dotenv').config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// getting key info from keys.js
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// the action to do, based on user input
// options = 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'
var action = process.argv[2];
console.log('action: ' + action);
// the query
var searchItem = process.argv[3];
console.log('searchItem: ' + searchItem);

// switches to take user input then run necessary fxn
switch (action) {
  case 'my-tweets':
    getRecentTweets();
    break;
  case 'spotify-this-song':
    getSpotifyInfo();
    break;
  case 'movie-this':
    getMovieInfo();
    break;
  case 'do-what-it-says':
    getRandomTxtInfo();
    break;
  default:
    console.log('you typed something wrong.');
    break;
}

// node liri.js my-tweets
// display your 20 most recent tweets & when they were created
function getRecentTweets() {
  twitter.get(
    'statuses/user_timeline.json',
    { screen_name: 'jfcurat', count: 20 },
    function (error, tweets) {
      if (error) throw error;
      for (i = 0; i < tweets.length; i++) {
        console.log('\nthis is a tweet\: ' + tweets[i].text);
      }
    });
}

// node liri.js spotify-this-song '<song name>'
// show song info: artist(s), song name, priview link, & album
// if no song provided, default = "The Sign" by Ace of Base (use if/else... if (!searchItem) {aceOfBaseSong} else {use searchItem for spotify api call}
function getSpotifyInfo() {
  spotify.search(
    { type: 'track', query: searchItem }, // change query value to searchItem var later
    function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        var bullshit = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
        console.log(bullshit);

        //var trackDetails = JSON.parse(data.tracks.items);
        //console.log(trackDetails);
        //console.log(trackDetails[0].artists);
        // for (i = 0; i < trackDetails.length; i++) {
        //   //console.log(trackDetails[i].preview_url);
        //   console.log(trackDetails[i].name);
        //   console.log(trackDetails[i].artists)
        // }

      }
    });
}

// node liri.js movie-this '<movie name>'
// movie info = title, year, IMDB rating, Rotten Tomatoes rating, production country, language, plot, & actors
// if no movie provided, default = "Mr. Nobody"
function getMovieInfo() {

}

// node liri.js do-what-it-says
// use fs node pkg to take content of random.txt as input to LIRI
function getRandomTxtInfo() {

}

/*
{
  "album": {
    "album_type": "compilation",
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/19ra5tSw0tWufvUp8GotLo"
        },
        "href": "https://api.spotify.com/v1/artists/19ra5tSw0tWufvUp8GotLo",
        "id": "19ra5tSw0tWufvUp8GotLo",
        "name": "George Michael",
        "type": "artist",
        "uri": "spotify:artist:19ra5tSw0tWufvUp8GotLo"
      }
    ],
    "available_markets": [
      "AD",
      "AR",
      "AT",
      "BE",
      "BG",
      "BO",
      "BR",
      "CH",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DE",
      "DK",
      "DO",
      "EC",
      "EE",
      "ES",
      "FI",
      "FR",
      "GB",
      "GR",
      "GT",
      "HK",
      "HN",
      "HU",
      "ID",
      "IE",
      "IS",
      "IT",
      "JP",
      "LI",
      "LT",
      "LU",
      "LV",
      "MC",
      "MT",
      "MX",
      "MY",
      "NI",
      "NL",
      "NO",
      "PA",
      "PE",
      "PH",
      "PL",
      "PT",
      "PY",
      "SE",
      "SG",
      "SK",
      "SV",
      "TH",
      "TR",
      "TW",
      "US",
      "UY"
    ],
    "external_urls": {
      "spotify": "https://open.spotify.com/album/3coLNlyStg9h7f8CZ103Rl"
    },
    "href": "https://api.spotify.com/v1/albums/3coLNlyStg9h7f8CZ103Rl",
    "id": "3coLNlyStg9h7f8CZ103Rl",
    "images": [
      {
        "height": 550,
        "url": "https://i.scdn.co/image/9a60ed4162d22cdb7d07ddb182e4183845dd1b1a",
        "width": 640
      },
      {
        "height": 258,
        "url": "https://i.scdn.co/image/93fd499dc4cf7e8c148f65c43b883b856492b9ea",
        "width": 300
      },
      {
        "height": 55,
        "url": "https://i.scdn.co/image/084103fc9006cba10d5dc7e72d7f87793cbc185e",
        "width": 64
      }
    ],
    "name": "Ladies And Gentlemen... The Best Of George Michael",
    "type": "album",
    "uri": "spotify:album:3coLNlyStg9h7f8CZ103Rl"
  },
  "artists": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/19ra5tSw0tWufvUp8GotLo"
      },
      "href": "https://api.spotify.com/v1/artists/19ra5tSw0tWufvUp8GotLo",
      "id": "19ra5tSw0tWufvUp8GotLo",
      "name": "George Michael",
      "type": "artist",
      "uri": "spotify:artist:19ra5tSw0tWufvUp8GotLo"
    }
  ],
  "available_markets": [
    "AD",
    "AR",
    "AT",
    "BE",
    "BG",
    "BO",
    "BR",
    "CH",
    "CL",
    "CO",
    "CR",
    "CY",
    "CZ",
    "DE",
    "DK",
    "DO",
    "EC",
    "EE",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "GT",
    "HK",
    "HN",
    "HU",
    "ID",
    "IE",
    "IS",
    "IT",
    "JP",
    "LI",
    "LT",
    "LU",
    "LV",
    "MC",
    "MT",
    "MX",
    "MY",
    "NI",
    "NL",
    "NO",
    "PA",
    "PE",
    "PH",
    "PL",
    "PT",
    "PY",
    "SE",
    "SG",
    "SK",
    "SV",
    "TH",
    "TR",
    "TW",
    "US",
    "UY"
  ],
  "disc_number": 1,
  "duration_ms": 300106,
  "explicit": false,
  "external_ids": {
    "isrc": "GBBBM8402006"
  },
  "external_urls": {
    "spotify": "https://open.spotify.com/track/4jDmJ51x1o9NZB5Nxxc7gY"
  },
  "href": "https://api.spotify.com/v1/tracks/4jDmJ51x1o9NZB5Nxxc7gY",
  "id": "4jDmJ51x1o9NZB5Nxxc7gY",
  "name": "Careless Whisper",
  "popularity": 75,
  "preview_url": "https://p.scdn.co/mp3-preview/75d3d091213d60d9f3ed2c0698b846177076b0d0?cid=26bd8b4e24504761aa099d8ed47e7d53",
  "track_number": 3,
  "type": "track",
  "uri": "spotify:track:4jDmJ51x1o9NZB5Nxxc7gY"
}
*/