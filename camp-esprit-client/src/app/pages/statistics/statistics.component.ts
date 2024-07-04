import { Component, OnInit } from '@angular/core';
import { KeycloakOperationService } from 'src/app/services/keycloak/keycloak.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { Chart, ChartItem, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  infos: any;
  countEventsByUserId: any;
  countEventsByType: any;
  credsByType: any;
  countVerifiedEmails: any;

  constructor(private statisticsService: StatisticsService, private keycloakService: KeycloakOperationService) { }

  ngOnInit(): void {

    this.GetInfos();
    this.CountEventsByUserId();
    this.CountEventsByType();
    this.CountCredsByType();
    this.CountByEmailVerified();
  }


  GetInfos() {
    this.statisticsService.GetInfos().subscribe((data) => {
      console.log("GetInfos", data);
      this.infos = data;
    });
  }

  CountEventsByUserId() {
    this.statisticsService.CountEventsByUserId().subscribe((data) => {
      console.log("CountEventsByUserId", data);
      this.countEventsByUserId = data;
    });
  }

  CountEventsByType() {
    this.statisticsService.CountEventsByType().subscribe((data) => {
      console.log("CountEventsByType", data);
      this.countEventsByType = data;
    });
  }

  CountCredsByType() {
    this.statisticsService.CountCredsByType().subscribe((data) => {
      console.log("CountCredsByType", data);
      this.credsByType = data;
    });
  }

  CountByEmailVerified() {
    this.statisticsService.CountByEmailVerified().subscribe((data) => {
      console.log("CountByEmailVerified", data);
      this.countVerifiedEmails = data;
    });
  }

}
