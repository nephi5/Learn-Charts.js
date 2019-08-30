import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements OnInit {
  constructor() {}

  public financialData = [
    { instrument: 'Aktien', sum: 160450000, currency: 'CHF' },
    { instrument: 'Hedge Funds', sum: 28160000, currency: 'CHF' },
    { instrument: 'Immobilienbeteilung', sum: 58490000, currency: 'CHF' },
    { instrument: 'Diverse', sum: 36060000, currency: 'CHF' }
  ];

  private colors = [
    '#6e6e6e', // 'rgba(110, 110, 110, 1)',
    '#283c82', // 'rgba(40, 60, 131, 1)',
    '#653e5b', // 'rgba(101, 62, 91, 1)',
    '#d2c49c', // 'rgba(210, 196, 156, 1)',
    '#b49d5a' // 'rgba(180, 157, 90, 1)'
  ];

  private performance = {
    total: 417562794.93,
    ytd: 0.0735
  };

  ngOnInit() {
    const size = document.getElementById('chart').getBoundingClientRect();
    const data: Chart.ChartData = {
      // labels: ['jupiter', 'saturn', 'uranus', 'neptune'],
      datasets: [
        {
          data: this.financialData.map(item => item.sum),
          backgroundColor: this.colors.map(color =>
            this.createGrad(size, color, 1, '#ffffff', 1)
          ),
          hoverBackgroundColor: this.colors,
          borderWidth: 0,
          borderSkipped: ['bottom', 'top'],
          hoverBorderWidth: 0
        }
      ]
    };

    Chart.defaults.global.elements.arc.borderWidth = 0;

    const c2 = new Chart('chart', {
      type: 'doughnut',
      data,
      options: {
        title: { display: false },
        legend: { display: false },
        cutoutPercentage: 80,
        aspectRatio: 1,
        tooltips: {
          // mode: 'index',
          // intersect: true,
          enabled: false,
          custom(model) {
            // console.log('show me this', JSON.stringify(this));
            // const datasets = this.datasets;
            const tooltip: HTMLElement = document.getElementById('tooltip');
            if (model.opacity === 0) {
              tooltip.style.opacity = '0';
              return;
            }
            if (model.body) {
              console.log(model);
              const value = model.body[0].lines[0];
              tooltip.innerHTML = '<b>' + value + ' km<br/>';

              const position = (this._chart
                .canvas as HTMLCanvasElement).getBoundingClientRect();

              // console.log('width + height ', position.width, position.height);
              // console.log('left + right ', position.left, position.right);
              // console.log('top + bottom ', position.top, position.bottom);

              tooltip.style.opacity = '1';
              tooltip.style.left = position.width * 0.115 + 'px';
              tooltip.style.top = position.height * 0.115 + 'px';
              tooltip.style.height = position.height * 0.75 + 'px';
              tooltip.style.width = position.width * 0.75 + 'px';
              tooltip.style.borderColor = model.labelColors[0].backgroundColor;
            }
          }
        }
      }
    });
  }

  public onMouseover(index) {
    console.log('onmouseover', index);
  }

  public onMouseLeave(index) {
    console.log('onmouseleave', index);
  }

  private createGrad(
    size,
    colorOne = '#62D7FA',
    opacityOne = 1,
    colorTwo = '#ffffff',
    opacityTwo = 1,
    colorStop = 95,
    chartId = 'chart'
  ) {
    const rgbOne = this.hexToRgb(colorOne);
    const rgbTwo = this.hexToRgb(colorTwo);
    const colorStopTo = colorStop / 100;
    const colorStopFrom = (colorStop + 1) / 100;

    const canvasWidth = 300; // size.width;
    const canvasHeight = 300; // size.height;

    const ctx = document.getElementById(chartId) as HTMLCanvasElement;

    const grd = ctx
      .getContext('2d')
      .createRadialGradient(
        canvasWidth / 2,
        canvasHeight / 2,
        0.0,
        canvasWidth / 2,
        canvasWidth / 2,
        canvasWidth / 2
      );

    // Add colors
    grd.addColorStop(
      0.0,
      'rgba(' +
        rgbOne.r +
        ', ' +
        rgbOne.g +
        ', ' +
        rgbOne.b +
        ', ' +
        opacityOne +
        ')'
    );
    grd.addColorStop(
      colorStopTo,
      'rgba(' +
        rgbOne.r +
        ', ' +
        rgbOne.g +
        ', ' +
        rgbOne.b +
        ', ' +
        opacityOne +
        ')'
    );
    grd.addColorStop(
      colorStopFrom,
      'rgba(' +
        rgbTwo.r +
        ', ' +
        rgbTwo.g +
        ', ' +
        rgbTwo.b +
        ', ' +
        opacityTwo +
        ')'
    );
    grd.addColorStop(
      1.0,
      'rgba(' +
        rgbTwo.r +
        ', ' +
        rgbTwo.g +
        ', ' +
        rgbTwo.b +
        ', ' +
        opacityTwo +
        ')'
    );

    return grd;
  }

  private hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }
}
