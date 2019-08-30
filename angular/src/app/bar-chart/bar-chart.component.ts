import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private chart;
  private secondChart: Chart;
  constructor() {}

  ngOnInit() {
    Chart.defaults.global.defaultFontFamily = 'cursive';
    // Chart.defaults.global.legend.fontSize = 20;
    // Chart.defaults.global.defaultColor = 'red';
    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: ['Atlantic', 'Pacific', 'H', 'Qwerty'],
        datasets: [
          {
            label: 'Volume',
            data: [3, 1, 3, 4],
            borderWidth: 2,
            backgroundColor: 'hsla(20,100%,80%,0.8)',
            borderColor: 'hsla(0,100%,50%,1)'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            labelColor(tooltipItem, chart) {
              return {
                borderColor: 'green',
                backgroundColor: 'red'
              };
            },
            labelTextColor() {
              return 'blue';
            }
          }
        }
      }
    });

    this.secondChart = new Chart('second-bar-chart', {
      type: 'bar'
    });
  }
}
