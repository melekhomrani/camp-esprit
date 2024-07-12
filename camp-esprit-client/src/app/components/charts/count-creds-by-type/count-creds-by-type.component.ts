import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Chart, ChartItem, registerables } from 'chart.js';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-count-creds-by-type',
  templateUrl: './count-creds-by-type.component.html',
  styles: []
})
export class CountCredsByTypeComponent implements OnInit {
  data: any;    // Initialized with an empty array

  credsByType: any;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.CountCredsByType();
  }

  private renderChart(): void {
    if (this.credsByType !== undefined) {
      const context = document.getElementById('count-creds-by-type');
      if(context) {
        new Chart(context as ChartItem, {
          type: 'pie',
          data: {
            labels: this.credsByType!.map((item: any) => item.key),
            datasets: [{
              label: 'Credentials',
              data: this.credsByType!.map((item: any) => item.value),
              borderWidth: 1
            }]
          }
        });
      }
    }
  }


  CountCredsByType() {
    this.statisticsService.CountCredsByType().subscribe((data) => {
      console.log("CountCredsByType", data);
      this.credsByType = data;

      this.renderChart();
    });
  }
}
