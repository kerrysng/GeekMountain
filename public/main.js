$.ajax({
  url: '/api/teams'
}).done(function(teams) {
  drawChart(teams);
});
