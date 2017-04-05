//main variables
var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require("spotify");
var request = require('request'); 
var fs = require("fs");
var params = process.argv.slice(2); 



//using switch instead of if/else to filter through arguments 
switch (params[0]) {
    case "my-tweets":
        myTweets(); 
        break;
    case "spotify-this-song":
        if (params[1]) {
            spotifySong();
        } else {
            spotifySong(params[1] = "The Sign");
        }
        break;
    case "movie-this":
        if (params[1]) {
            movieLookup();
        } else {
            movieLookup(params[1] = "Mr. Nobody");
        }
        break;
    case "do-what-it-says":
        fsFunct(params[1]);
        break;
}



//function that pulls in tweets 
function myTweets() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    client.get('statuses/user_timeline', { screen_name: 'alitakendrick', count: 20 }, function(error, data, response) {
        if (error) {
            console.log('ERROR: ' + error);
            return; 
        }
//loops through and gives formatting to tweets
        for (var i = 0; i < data.length; i++) {
            var tweetResults = data[i].text + "\n";
            console.log(" " + " " + "PREVIOUS TWEET" + " " + " ")
                console.log(tweetResults);
        };
    });
}



//pulls in song data from spotify
function spotifySong() {
    spotify.search({ type: 'track', query: params[1] }, function(err, data) {
        if (err) {
            console.log('ERROR: ' + err);
            return; 
        } else {
            var songInfo = data.tracks.items[0];
            console.log(" " + " " + "SPOTIFY RESULTS:" + " " + " ")
            console.log("ARTIST:", songInfo.artists[0].name);
            console.log("SONG:", songInfo.name);
            console.log("ALBUM:", songInfo.album.name);
            console.log("PREVIEW:", songInfo.preview_url);

        };
    });
}


//movie function to pull in movie data
function movieLookup() {
  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function(error, response, body){
    var movieObject = JSON.parse(body);
    console.log(" " + " " + "MOVIE RESULTS:" + " " + " ")
    console.log("TITLE:", movieObject.Title);
    console.log("RELEASED:", movieObject.Year);
    console.log("IMDB RATING:", movieObject.imdbRating);
    console.log("COUNTRY PRODUCED:", movieObject.Country);
    console.log("LANGUAGE:", movieObject.Language);
    console.log("PLOT:", movieObject.Plot);
    console.log("ACTORS:", movieObject.Actors);
  });
};



//function to pull in data from file
function fsFunct() {
  fs.readFile("random.txt", "utf-8", function(err, data){
    data.split(',');
    spotifySong(data[1]);
  });
};