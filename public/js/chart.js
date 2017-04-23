Chart.defaults.bar.scales.xAxes[0].categoryPercentage = 1;
Chart.defaults.bar.scales.xAxes[0].barPercentage = 1.33;
Chart.defaults.bar.scales.xAxes[0].gridLines.display = false;
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = 'white';

var chart, $chart = $('.chart');
var $buttonToggle = $('.button-toggle');
var $innerContent = $('.content > div');
var TARGET_SCORE = 1000;

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
    var teamColors  = teams.map(function(team) { return team.color; });
    var backgroundColor = teamColors.map(function(color) { return color.replace(/,[\d\.\s]+\)/, ', 0.65)'); });

    var data = {
      labels: teamNames,
      datasets: [{
        label: 'Current score',
        data: teamScores,
        backgroundColor: backgroundColor,
        borderColor: teamColors,
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
};

$('.button-collapse').sideNav();
$buttonToggle.click(function() {
  $buttonToggle.toggleClass('scale-in scale-out');
  $innerContent.slideToggle();
});
