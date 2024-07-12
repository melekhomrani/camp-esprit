import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map/map.service';
import { KeycloakService } from 'keycloak-angular';
import { Event } from '../../models/Event';

declare var bootstrap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;
  private defaultZoom = 12;
  private currentPositionMarker: L.Marker | undefined;

  newEvent: Event = {
    description: '',
    lat: 0,
    lng: 0,
    event_date: '',
    userId: this.keycloak.getUsername(),
    participants: [],
  };
  showForm: boolean = false;

  constructor(private mapService: MapService, private keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadEvents();
    this.getCurrentPosition();
  }

  private initMap(): void {
    // Default center for the map
    const defaultCoordinates: L.LatLngExpression = [36.8065, 10.1815];
    this.map = L.map('map', {
      center: defaultCoordinates,
      zoom: this.defaultZoom,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  private loadEvents(): void {
    this.mapService.getEvents().subscribe(
      (events: any[]) => {
        this.addMarkers(events);
      },
      (error) => {
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
        popupAnchor: [0, -32],
      });

      events.forEach((event: Event) => {
        const marker = L.marker([event.lat, event.lng], { icon: customIcon }).addTo(this.map!);

        this.mapService.getEventCreator(event.userId).subscribe(
          (user: any) => {
            const popupContent = `
              <div style="background-color: #ffffff; color: #1b39c9; padding: 10px;">
                <h4>${event.description}</h4>
                <p>Date: ${event.event_date}</p>
                <p>Creator: ${user.username}
                <button class="btn btn-primary btn-sm mt-2 send-message" data-event-id="${event.userId}">Send Message</button>
                ${this.canEditEvent(event.userId) ? `<button class="btn btn-secondary btn-sm mt-2 edit-event" data-event-id="${event.userId}">Edit</button>` : ''}
              </div>
            `;
            marker.bindPopup(popupContent);
          },
          (error) => {
            console.error('Error fetching event creator:', error);
          }
        );
      });
    }
  }

  getCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.newEvent.lat = latitude;
          this.newEvent.lng = longitude;
          this.centerMapAt(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  centerMapAt(latitude: number, longitude: number): void {
    if (this.map) {
      this.map.setView([latitude, longitude], this.defaultZoom);
      // Add marker for current position
      if (this.currentPositionMarker) {
        this.currentPositionMarker.setLatLng([latitude, longitude]);
      } else {
        this.currentPositionMarker = L.marker([latitude, longitude]).addTo(this.map!);
      }
    }
  }

  createEvent(): void {
    console.log(this.newEvent);

    this.mapService.createEvent(this.newEvent).subscribe(
      (response) => {
        console.log('Event created successfully:', response);
        this.loadEvents();
        this.showForm = false;
      },
      (error) => {
        console.error('Error creating event:', error);
      }
    );

    this.newEvent = {
      description: '',
      lat: 0,
      lng: 0,
      event_date: '',
      userId: this.keycloak.getUsername(),
      participants: [],
    };

    const modal = document.getElementById('eventModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  canEditEvent(eventUserId: string): boolean {
    const currentUserId = this.keycloak.getUsername();
    return eventUserId === currentUserId;
  }

  editEvent(event: Event): void {
    console.log('Editing event:', event);
  }

  sendMessage(userId: string): void {
    console.log('Sending message to user:', userId);
  }
}
