import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {CampingApiService} from "../../services/camping/campingapi.service";
import {Campground} from "../../models/Campground";
import {Amenity} from "../../models/Amenity";

@Component({
  selector: 'app-camping-stats',
  templateUrl: './camping-stats.component.html',
  styleUrls: ['./camping-stats.component.css']
})
export class CampingStatsComponent {

  constructor() { }

  ngOnInit(): void {
    this.generateCharts();
  }

  generateCharts(): void {
    this.generateAmenitiesChart();
    this.generateCampgroundsChart();
    this.generateRegionsChart();
    this.generateCampingTypesChart();
  }

  generateAmenitiesChart(): void {
    const labels = ['Swimming Pool', 'Hiking Trails', 'Playground', 'Restaurant', 'WiFi'];
    const data = [20, 15, 10, 8, 5];

    const ctx = document.getElementById('amenitiesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Popular Amenities',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Popular Amenities'
          }
        }
      }
    });
  }

  generateCampgroundsChart(): void {
    const labels = ['Occupied Campgrounds', 'Available Campgrounds'];
    const data = [70, 30]; // Example data

    const ctx = document.getElementById('campgroundsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Campgrounds Status',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Campgrounds Status'
          }
        }
      }
    });
  }

  generateRegionsChart(): void {
    const labels = ['North', 'South', 'East', 'West'];
    const data = [25, 20, 30, 25]; // Example data

    const ctx = document.getElementById('regionsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Camping Regions',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Camping Regions'
          }
        }
      }
    });
  }

  generateCampingTypesChart(): void {
    const labels = ['Tent Camping', 'RV Camping', 'Cabins'];
    const data = [40, 30, 30]; // Example data

    const ctx = document.getElementById('campingTypesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Camping Types',
          data: data,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Camping Types'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
