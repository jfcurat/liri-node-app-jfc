var dotenv = require('dotenv').config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// action options = 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'
var action = process.argv[2];
// the query
var searchItem = process.argv[3];

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
    console.log('You typed something wrong.');
    break;
}

// get tweets
function getRecentTweets() {
  twitter.get(
    'statuses/user_timeline.json',
    { screen_name: 'jfcurat', count: 20 },
    function (error, tweets) {
      if (error) throw error;
      for (i = 0; i < tweets.length; i++) {
        console.log('\nThis is a Tweet\: ' + tweets[i].text);
      }
    }
  );
}

// get song info
function getSpotifyInfo() {
  if (!searchItem) {
    spotify.search(
      { type: 'track', query: 'Ace of Base The Sign' },
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
      { type: 'track', query: searchItem },
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

// get movie info
function getMovieInfo() {
  var omdbKey = '2606b86e';
  if (!searchItem) {
    request(
      {
      method: 'GET'
      , uri: 'http://www.omdbapi.com/?apikey=' + omdbKey + '&t=Mr.+Nobody'
      , json: true
      }
    , function (error, response, body) {
        var movieTitle = JSON.stringify(body.Title, null, 2);
        console.log('Title: ' + movieTitle);
        var movieYear = JSON.stringify(body.Year, null, 2);
        console.log('Release Year: ' + movieYear);
        var movieImdbRating = JSON.stringify(body.Ratings[0].Value, null, 2);
        console.log('IMDB Rating: ' + movieImdbRating);
        var movieRotRating = JSON.stringify(body.Ratings[1].Value, null, 2);
        console.log('Rotten Tomatoes Rating: ' + movieRotRating);
        var movieCountry = JSON.stringify(body.Country, null, 2);
        console.log('Production Location(s): ' + movieCountry);
        var movieLanguage = JSON.stringify(body.Language, null, 2);
        console.log('Language(s): ' + movieLanguage);
        var moviePlot = JSON.stringify(body.Plot, null, 2);
        console.log('Plot Summary: ' + moviePlot);
        var movieActors = JSON.stringify(body.Actors, null, 2);
        console.log('Cast: ' + movieActors);
        var movieTime = JSON.stringify(body.Runtime, null, 2);
        console.log('Runtime: ' + movieTime);
      }
    );
  } else {
    var movieTitleQuery = '&t=' + searchItem;
    console.log('the search query string param: ' + movieTitleQuery);
    request(
      {
      method: 'GET'
      , uri: 'http://www.omdbapi.com/?apikey=' + omdbKey + movieTitleQuery
      , json: true
      }
    , function (error, response, body) {
        var movieTitle = JSON.stringify(body.Title, null, 2);
        console.log('Title: ' + movieTitle);
        var movieYear = JSON.stringify(body.Year, null, 2);
        console.log('Release Year: ' + movieYear);
        var movieImdbRating = JSON.stringify(body.Ratings[0].Value, null, 2);
        console.log('IMDB Rating: ' + movieImdbRating);
        var movieRotRating = JSON.stringify(body.Ratings[1].Value, null, 2);
        console.log('Rotten Tomatoes Rating: ' + movieRotRating);
        var movieCountry = JSON.stringify(body.Country, null, 2);
        console.log('Production Location(s): ' + movieCountry);
        var movieLanguage = JSON.stringify(body.Language, null, 2);
        console.log('Language(s): ' + movieLanguage);
        var moviePlot = JSON.stringify(body.Plot, null, 2);
        console.log('Plot Summary: ' + moviePlot);
        var movieActors = JSON.stringify(body.Actors, null, 2);
        console.log('Cast: ' + movieActors);
        var movieTime = JSON.stringify(body.Runtime, null, 2);
        console.log('Runtime: ' + movieTime);
      }
    );
  }
}

// random.txt song info
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
}
