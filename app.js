var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require('express');
var engine = require('ejs-mate');
var Twit = require('twit')
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var teams = JSON.parse(fs.readFileSync('./teams.json')).map(team => { team.score = 0; return team; });
var tweets = [];

var TARGET_SCORE = 1000;
var UPDATE_INTERVAL_SCORES = 5000;

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//add cookie parsing functionality to our express app
app.use(require('cookie-parser')());

// set up user stream
var stream = T.stream('user');

stream.on('tweet', getStream);
// console.log(stream);

function getStream(tweet) {
  console.log('Tweet incoming!!!');

  tweets.push(tweet);
}

// Anytime someone favorites me
stream.on('favorite', favorite);

function favorite(eventMsg) {
  console.log("Favourite event!");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  randTweet('.@' + screenName + ' Thank You');
}

// randTweet();
// setInterval(randTweet, 5000);

function randTweet(txt) {

  // var r = Math.floor(Math.random()*100);

  var tweet = {
    status: txt
  };

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response){
    if(err) {
      console.log('Error');
    }else {
      console.log('Its working');
    }
  };

}

function calculateScores() {
  // mocking the scores by increasing each by a random amount
  // if all teams achieve the target score, reset all scores
  var teamsBelowTarget = teams.filter(team => team.score < TARGET_SCORE);

  if (teamsBelowTarget.length === 0) {
    teams.forEach(team => team.score = 0);
  } else {
    teams.forEach(team => {
      var random = Math.floor(Math.random() * 50 + 20 + 15 / Math.log2(team.score / 2000 + 1.1));
      team.score += random;
    });
  }
}

calculateScores();

setInterval(calculateScores, UPDATE_INTERVAL_SCORES);

// routes
app.get('/', function(req, res) {
  res.render('index', { teams: teams });
});

app.get('/api/teams', function(req, res) {
  res.json(teams);
});

app.get('/api/tweets', function(req, res) {
  res.json(tweets);
});

module.exports = app;
