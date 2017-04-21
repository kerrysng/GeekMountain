Chart.defaults.bar.scales.xAxes[0].categoryPercentage = 1;
Chart.defaults.bar.scales.xAxes[0].barPercentage = 1.33;
Chart.defaults.bar.scales.xAxes[0].gridLines.display = false;
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = 'white';

var chart, $chart = $('.chart');
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
  var teamScores = teams.map(function(team) { return team.score; });

  if (chart) {
    chart.data.datasets[0].data = teamScores;
    chart.update();
  } else {
    var teamNames = teams.map(function(team) { return team.name; });
    var backgroundColor = teams.map(function(team, index) { return backgroundColors[index % backgroundColors.length]; });
    var borderColor = teams.map(function(team, index) { return borderColors[index % borderColors.length]; });

    var data = {
      labels: teamNames,
      datasets: [{
        label: 'Current score',
        data: teamScores,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    }

    $chart[0].height = innerHeight * 0.8;

    chart = new Chart($chart, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}

$(".button-collapse").sideNav();
$(".button-toggle").click(function() {
  $(".button-toggle").toggle(300);
});
