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
    }
  );
}

// node liri.js spotify-this-song '<song name>'
// show song info: artist(s), song name, preview link, & album
// if no song provided, default = "The Sign" by Ace of Base (use if/else... if (!searchItem) {aceOfBaseSong} else {use searchItem for spotify api call}
function getSpotifyInfo() {
  if (!searchItem) {
    spotify.search(
      { type: 'track', query: 'Careless Whisper' },
      function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
          var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
          console.log('Artist(s): ' + artistName);
          var songName = JSON.stringify(data.tracks.items[0].name, null, 2);
          console.log('Song: ' + songName);
          var albumName = JSON.stringify(data.tracks.items[0].album.name, null, 2);
          console.log('Album: ' + albumName);
          var previewLink = JSON.stringify(data.tracks.items[0].preview_url, null, 2);
          console.log('Preview the Song: ' + previewLink);
        }
      }
    );
  } else {
    spotify.search(
      { type: 'track', query: searchItem }, // change query value to searchItem var later
      function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
          var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
          console.log('Artist(s): ' + artistName);
          var songName = JSON.stringify(data.tracks.items[0].name, null, 2);
          console.log('Song: ' + songName);
          var albumName = JSON.stringify(data.tracks.items[0].album.name, null, 2);
          console.log('Album: ' + albumName);
          var previewLink = JSON.stringify(data.tracks.items[0].preview_url, null, 2);
          console.log('Preview the Song: ' + previewLink);
        }
      }
    );
  }
}

// node liri.js movie-this '<movie name>'
// movie info = title, year, IMDB rating, Rotten Tomatoes rating, production country, language, plot, & actors
// if no movie provided, default = "Mr. Nobody"
function getMovieInfo() {

}

// node liri.js do-what-it-says
// use fs node pkg to take content of random.txt as input to LIRI
function getRandomTxtInfo() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      console.log('Error occurred: ' + error);
    } else {
      console.log('Data from random.txt: \'' + data + '\'');
      var splitData = data.split(',');
      var searchFor = splitData[1];
      spotify.search(
        { type: 'track', query: searchFor },
        function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } else {
            var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
            console.log('Artist(s): ' + artistName);
            var songName = JSON.stringify(data.tracks.items[0].name, null, 2);
            console.log('Song: ' + songName);
            var albumName = JSON.stringify(data.tracks.items[0].album.name, null, 2);
            console.log('Album: ' + albumName);
            var previewLink = JSON.stringify(data.tracks.items[0].preview_url, null, 2);
            console.log('Preview the Song: ' + previewLink);
          }
        }
      );
    }
  });
  console.log('Async file reading action happening. Please wait...');
}
