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

var teams = [{
  name: "Jet Oxen",
  score: 100
}, {
  name: "Freedom Ducks",
  score: 500
}, {
  name: "Indigo Pandemic",
  score: 400
}, {
  name: "Whirling Leather",
  score: 200
}];

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//add cookie parsing functionality to our express app
app.use(require('cookie-parser')());

var params = {
  q: '@MelbourneGA',
  count: 50
};

var tweets = [];

function getData() {
  T.get('search/tweets', params, function(err, data, response) {
    // tweets = data.statuses.map(s => s.text);
      tweets.forEach(function (tweet, i) {
        tweets.push(JSON.parse(tweet));
      });
  });
}

var stream = T.stream('statuses/filter', { track: '@MelbourneGA' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

app.get('/', function(req, res) {
  // res.send(tweets);
  // res.render()
  res.sendFile('index.html');
});

app.get('/api/teams', function(req, res) {
  res.json(teams);
});

module.exports = app;
