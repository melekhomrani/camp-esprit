import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-count-verified-emails',
  templateUrl: './count-verified-emails.component.html',
  styles: [
  ]
})
export class CountVerifiedEmailsComponent implements OnChanges {
  @Input() data: any;    // Initialized with an empty array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.renderOtherChart();
    }
  }

  private renderOtherChart(): void {
    if (this.data.length !== undefined) {
      const context = document.getElementById('count-verified-emails');
      if (context) {
        new Chart(context as ChartItem, {
          type: 'doughnut',
          data: {
            labels: this.data!.map((item: any) => item.key),
            datasets: [{
              label: 'Emails',
              data: this.data!.map((item: any) => item.value),
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
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
