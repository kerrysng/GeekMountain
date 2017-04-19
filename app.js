var url = require('url');
var express = require('express');
var app = express();
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'n0s4kgFuUKukyBCgHtxFwVBiz',
  consumer_secret:      '9auuhWDIP28oPkJpq9A1Wlw0KlSwj6ZsdjYlfdrjMbN5tuavAc',
  access_token:         '854296971204378625-GC31DOefy8ajPTmBvscbEUCAxcE3vvO',
  access_token_secret:  'C4rALZ5KWh1Wu6Iq0OkENAJJz3vtt69nGQYzz2FYJFAbX',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//add cookie parsing functionality to our express app
app.use(require('cookie-parser')());

var params = {
  q: '@MelbourneGA',
  count: 50
};


function getData() {
  T.get('search/tweets', params, function(err, data, response) {
    data.statuses.forEach(function(status) {
      // return console.log(status.text);
      response.render('home', {
          Feed: status.text,
      });
    });
  });
}

getData()

setInterval(getData, 300000);

app.get('/', getData);




















module.exports = app;
