import { Component, OnInit } from '@angular/core';
import { KeycloakOperationService } from 'src/app/services/keycloak/keycloak.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService, private keycloakService: KeycloakOperationService) { }

  infos: any;
  countEventsByUserId: any;
  countEventsByType: any;
  credsByType: any;

  ngOnInit(): void {
    this.GetInfos();
    this.CountEventsByUserId();
    this.CountEventsByType();
    this.CountCredsByType();
    this.keycloakService.getUserProfile().then((data) => {
      console.log("UserProfile", data);
    });
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
}
