var displayScores = function() {
  $.ajax({
    url: '/api/teams'
  }).done(function(teams) {
    drawChart(teams);
  });
};

displayScores();

setInterval(displayScores, 10000);
