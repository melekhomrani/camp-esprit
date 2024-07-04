import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-count-creds-by-type',
  templateUrl: './count-creds-by-type.component.html',
  styles: []
})
export class CountCredsByTypeComponent implements OnChanges {
  @Input() data: any;    // Initialized with an empty array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (this.data.length !== undefined) {
      const context = document.getElementById('count-creds-by-type');
      if(context) {
        new Chart(context as ChartItem, {
          type: 'pie',
          data: {
            labels: this.data!.map((item: any) => item.key),
            datasets: [{
              label: 'Credentials',
              data: this.data!.map((item: any) => item.value),
              borderWidth: 1
            }]
          }
        });
      }
    }
  }
}
