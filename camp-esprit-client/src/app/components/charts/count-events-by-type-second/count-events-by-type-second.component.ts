import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-count-events-by-type-second',
  templateUrl: './count-events-by-type-second.component.html',
  styles: [
  ]
})
export class CountEventsByTypeSecondComponent {

  @Input() data: any;    // Initialized with an empty array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.renderOtherChart();
    }
  }

  private renderOtherChart(): void {
    if (this.data.length !== undefined) {
      const context = document.getElementById('count-events-by-type-other');
      if (context) {
        new Chart(context as ChartItem, {
          type: 'bar',
          data: {
            labels: this.data!.filter((item: any) => item.key !== "LOGIN" && item.key !== "CODE_TO_TOKEN").map((item: any) => item.key),
            datasets: [{
              label: 'Events',
              data: this.data!.filter((item: any) => item.key !== "LOGIN" && item.key !== "CODE_TO_TOKEN").map((item: any) => item.value),
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                grid: {
                  offset: true
                }
              }
            },
          }
        });
      }
    }
  }

}
