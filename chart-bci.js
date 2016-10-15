const Chart = require('chart.js');

let context = document.getElementById('bci-chart');

let dataset = [];

let data = {
    labels: [],
    datasets: [
        {
            label: "BCI Readings",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataset,
            spanGaps: false,
        }
    ]
};

let chart = new Chart(context, {
  type: 'line',
  data: data,
  options: {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1
        }
      }]
      }
  }
});

module.exports = chart
