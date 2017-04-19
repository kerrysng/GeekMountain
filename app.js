var url = require('url');
var express = require('express');
var app = express();
var Twit = require('twit')

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
    tweets = data.statuses.map(s => s.text);
  });
}

getData()

setInterval(getData, 300000);

app.get('/', function(req, res) {
  res.send(tweets);
});

module.exports = app;
