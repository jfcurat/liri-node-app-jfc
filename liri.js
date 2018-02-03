// liri.js action
var dotenv = require('dotenv').config();
console.log(process.env.SPOTIFY_ID);


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
// the query
var item = process.argv[3];

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
  console.log('fuck off');

  twitter.get(
    'statuses/user_timeline.json', 
    {screen_name: 'jfcurat', count: 20},
    function(error, tweets) {
      if(error) throw error;
      console.log('holy fuck\! tweets' + (JSON.stringify(tweets, null, 2)));
      
      for (i = 0; i < tweets.length; i++) {
        console.log('this is a fuckin\' tweet\: ' + tweets[i].text);
      }
  });
}

// node liri.js spotify-this-song '<song name>'
// show song info: artist(s), song name, priview link, & album
// if no song provided, default = "The Sign" by Ace of Base
function getSpotifyInfo() {

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
