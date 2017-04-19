Chart.defaults.bar.scales.xAxes[0].categoryPercentage = 1;
Chart.defaults.bar.scales.xAxes[0].barPercentage = 1.33;
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.legend.display = false;

var $chart = $('.chart');
var TARGET_SCORE = 1000;

var backgroundColors = [
  'rgba(255, 99, 132, 0.65)',
  'rgba(54, 162, 235, 0.65)',
  'rgba(255, 206, 86, 0.65)',
  'rgba(75, 192, 192, 0.65)',
  'rgba(153, 102, 255, 0.65)',
  'rgba(255, 159, 64, 0.65)'
];

var borderColors = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

var annotations = {
  annotations: [{
    type: 'line',
    mode: 'horizontal',
    scaleID: 'y-axis-0',
    value: TARGET_SCORE,
    borderColor: 'rgba(255, 0, 0, 0.5)',
    borderWidth: 4,
    label: {
      enabled: true,
      content: 'Target score'
    }
  }]
}

var options = {
  scales: {
    yAxes: [{
      ticks: { max: TARGET_SCORE + 200 }
    }]
  },
  annotation: annotations
}

var drawChart = function(teams) {
  var teamNames = teams.map(function(team) { return team.name; });
  var teamScores = teams.map(function(team) { return team.score; });
  var backgroundColor = teams.map(function(team, index) { return backgroundColors[index % backgroundColors.length]; });
  var borderColor = teams.map(function(team, index) { return borderColors[index % borderColors.length]; });

  var data = {
    labels: teamNames,
    datasets: [{
      label: 'Current score',
      data: teamScores.slice(),
      backgroundColor: backgroundColor,
      borderWidth: 1
    }]
  }

  var chart = new Chart($chart, {
    type: 'bar',
    data: data,
    options: options
  });

  setInterval(function() {
    var currentScores = chart.data.datasets[0].data;
    var scoresBelowTarget = currentScores.filter(function(score) { return score < TARGET_SCORE; });

    if (scoresBelowTarget.length === 0) {
      chart.data.datasets[0].data = teamScores.slice();
    } else {
      chart.data.datasets[0].data.forEach(function(value, index) {
        var random = Math.floor(Math.random() * 81 + 20) + 400 / Math.sqrt(chart.data.datasets[0].data[index]);
        chart.data.datasets[0].data[index] += random;
      });
    }

    chart.update();
  }, 2000);
}
