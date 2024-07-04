import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-count-events-by-type',
  templateUrl: './count-events-by-type.component.html',
  styles: []
})
export class CountEventsByTypeComponent implements OnChanges {
  @Input() data: any;    // Initialized with an empty array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (this.data.length !== undefined) {
      const context = document.getElementById('count-events-by-type-login-token');
      if (context) {
        new Chart(context as ChartItem, {
          type: 'bar',
          data: {
            labels: this.data!.filter((item: any) => item.key === "LOGIN" || item.key === "CODE_TO_TOKEN").map((item: any) => item.key),
            datasets: [{
              label: 'Events',
              data: this.data!.filter((item: any) => item.key === "LOGIN" || item.key === "CODE_TO_TOKEN").map((item: any) => item.value),
              borderWidth: 1,
              categoryPercentage: 0.5, // Use less than 1 to make bars thinner
              barPercentage: 0.5 // Use less than 1 to make bars thinner
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
        }
        );
      }
    }
  }

}
