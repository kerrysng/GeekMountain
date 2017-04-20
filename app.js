var url = require('url');
var path = require('path');
var express = require('express');
var engine = require('ejs-mate');
var Twit = require('twit')
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var teams = [
  "Jet Oxen",
  "Freedom Ducks",
  "Indigo Pandemic",
  "Whirling Leather"
].map(name => { return { name: name, score: 0 } });

var TARGET_SCORE = 1000;

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//add cookie parsing functionality to our express app
app.use(require('cookie-parser')());

// set up user stream
var stream = T.stream('user');

stream.on('tweet', getStream);
console.log(stream);
var timeline = []

function getStream(eventMsg) {
  // console.log(eventMsg);
  // var text = eventMsg.text
  var self = eventMsg.user.screen_name
  //
  timeline.forEach(function (self, i) {
    timeline.push(JSON.parse(self))
  });
}

// console.log(getStream);

function calculateScores() {
  // mocking the scores by increasing each by a random amount
  // if all teams achieve the target score, reset all scores
  var teamsBelowTarget = teams.filter(team => team.score < TARGET_SCORE);

  if (teamsBelowTarget.length === 0) {
    teams.forEach(team => team.score = 0);
  } else {
    teams.forEach(team => {
      var random = Math.floor(Math.random() * 80 + 20 + 400 / (10 + Math.sqrt(team.score)));
      team.score += random;
    });
  }
}

calculateScores();

// setInterval(getData, 300000);
setInterval(calculateScores, 10000);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api/teams', function(req, res) {
  res.json(teams);
});

module.exports = app;
