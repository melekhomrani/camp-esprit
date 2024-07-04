import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-count-events-by-userid',
  templateUrl: './count-events-by-userid.component.html',
  styles: []
})
export class CountEventsByUseridComponent implements OnChanges {
  @Input() data: any;    // Initialized with an empty array

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (this.data.length !== undefined) {
      const context = document.getElementById('count-events-by-userid');
      if(context) {
        new Chart(context as ChartItem, {
          type: 'pie',
          data: {
            labels: this.data!.map((item: any) => item.key),
            datasets: [{
              label: 'Events By UserId',
              data: this.data!.map((item: any) => item.value),
              borderWidth: 1
            }]
          }
        });
      }
    }
  }
}
