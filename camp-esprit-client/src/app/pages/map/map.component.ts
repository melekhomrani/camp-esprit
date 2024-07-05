import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map/map.service';
import {KeycloakService} from "keycloak-angular";
import {Event} from "../../models/Event";

declare var bootstrap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: L.Map | undefined;
  newEvent: Event = {
    description: '',
    lat: 0,
    lng: 0,
    event_date: '',
    userId: this.keyclaok.getUsername()
  };
  showForm: boolean = false; // Property to toggle form visibility

  constructor(private mapService: MapService,private keyclaok : KeycloakService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadEvents();
  }

  private initMap(): void {
    const tunisCoordinates: L.LatLngExpression = [36.8065, 10.1815];
    this.map = L.map('map', {
      center: tunisCoordinates,
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  private loadEvents(): void {
    this.mapService.getEvents().subscribe(
      (events: any[]) => {
        this.addMarkers(events);
      },
      error => {
        console.error('Error loading events:', error);
      }
    );
  }

  private addMarkers(events: any[]): void {
    if (this.map) {
      const customIcon = L.icon({
        iconUrl: 'assets/marker.png',
        iconSize: [32, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      events.forEach((event: Event) => {
        const marker = L.marker([event.lat, event.lng], { icon: customIcon }).addTo(this.map!);

        this.mapService.getEventCreator(event.userId).subscribe(
          (user: any) => {
            const popupContent = `
              <div style="background-color: #ffffff; color: #1b39c9; padding: 10px;">
                <h4>${event.description}</h4>
                <p>Date: ${event.event_date}</p>
                <p>Creator: ${user.username}</p>
                <p>Email: ${user.username}</p>
              </div>
            `;
            marker.bindPopup(popupContent);
          },
          error => {
            console.error('Error fetching event creator:', error);
            const popupContent = `
              <div style="background-color: #ffffff; color: #1b39c9; padding: 10px;">
                <h4>${event.description}</h4>
                <p>Date: ${event.event_date}</p>
                <p>Creator: Unknown</p>
              </div>
            `;
            marker.bindPopup(popupContent);
          }
        );
      });
    }
  }

  createEvent(): void {
    console.log(this.newEvent);

    this.mapService.createEvent(this.newEvent).subscribe(
      response => {
        console.log('Event created successfully:', response);
        this.loadEvents();
        this.showForm = false;
      },
      error => {
        console.error('Error creating event:', error);
      }
    );


    this.newEvent = {
      description: '',
      lat: 0,
      lng: 0,
      event_date: '',
      userId: "1"
    };

    const modal = document.getElementById('eventModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  toggleForm(): void {
    this.showForm = !this.showForm; // Toggle form visibility
  }
}
