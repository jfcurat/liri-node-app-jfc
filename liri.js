var dotenv = require('dotenv').config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
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
    console.log('\nOops. You typed something wrong.');
    console.log('\nOptions are:\n\tmy-tweets for recent tweets,\n\tspotify-this-song \'\<song title\>\' for song info,\n\tmovie-this \'\<movie title\>\' for movie info,\n\tor do-what-it-says to find song info from random.txt file');
    break;
}

function getRecentTweets() {
  twitter.get(
    'statuses/user_timeline.json',
    { screen_name: 'jfcurat', count: 20 },
    function (error, tweets) {
      if (error) throw error;
      for (i = 0; i < tweets.length; i++) {
        console.log('\nThis is a Tweet\: \"' + tweets[i].text + '\"');
        console.log('Created: ' + tweets[i].created_at);
      }
    }
  );
}

function getSpotifyInfo() {
  if (!searchItem) {
    spotify.search(
      { type: 'track', query: 'Ace of Base The Sign' },
      function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
          var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
          console.log('\nArtist(s): ' + artistName);
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
          console.log('\nArtist(s): ' + artistName);
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
        console.log('\nTitle: ' + movieTitle);
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
    request(
      {
      method: 'GET'
      , uri: 'http://www.omdbapi.com/?apikey=' + omdbKey + movieTitleQuery
      , json: true
      }
    , function (error, response, body) {
        var movieTitle = JSON.stringify(body.Title, null, 2);
        console.log('\nTitle: ' + movieTitle);
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

function getRandomTxtInfo() {
  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      console.log('Error occurred: ' + error);
    } else {
      console.log('\nData from random.txt \= \'' + data + '\'');
      var splitData = data.split(',');
      var searchFor = splitData[1];
      spotify.search(
        { type: 'track', query: searchFor },
        function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } else {
            var artistName = JSON.stringify(data.tracks.items[0].artists[0].name, null, 2);
            console.log('\nArtist(s): ' + artistName);
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
