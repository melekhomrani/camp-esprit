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

  newEvent: Event = {
    id:0,
    description: '',
    lat: 0,
    lng: 0,
    event_date: '',
    userId: this.keycloak.getUsername(),
    participants: [],
  };
  showForm: boolean = false; // Property to toggle form visibility

  constructor(private mapService: MapService, private keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadEvents();
  }

  private initMap(): void {
    const tunisCoordinates: L.LatLngExpression = [36.8065, 10.1815];
    this.map = L.map('map', {
      center: tunisCoordinates,
      zoom: 12,
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
                <p>Creator: ${user.username}</p>
                <button class="btn btn-primary btn-sm mt-2 send-message" data-event-id="${event.id}">Send Message</button>
                ${this.canEditEvent(event.userId) ? `<button class="btn btn-secondary btn-sm mt-2 edit-event" data-event-id="${event.id}">Edit</button>` : ''}
              </div>
            `;
            marker.bindPopup(popupContent);

            // Add event listener for Send Message button
            // const sendMessageButton = marker.getPopup().getContent().querySelector('.send-message');
            // if (sendMessageButton) {
            //   sendMessageButton.addEventListener('click', () => {
            //     this.sendMessage(event.userId);
            //   });
            // }

            // Add event listener for Edit button
            // const editEventButton = marker.getPopup().getContent().querySelector('.edit-event');
            // if (editEventButton) {
            //   editEventButton.addEventListener('click', () => {
            //     this.editEvent(event);
            //   });
            // }
          },
          (error) => {
            console.error('Error fetching event creator:', error);
            const popupContent = `
              <div style="background-color: #ffffff; color: #1b39c9; padding: 10px;">
                <h4>${event.description}</h4>
                <p>Date: ${event.event_date}</p>
                <p>Creator: ${event.userId}</p>
                <button class="btn btn-primary btn-sm mt-2 send-message" data-event-id="${event.id}">Send Message</button>
                ${this.canEditEvent(event.userId) ? `<button class="btn btn-secondary btn-sm mt-2 edit-event" data-event-id="${event.id}">Edit</button>` : ''}
              </div>
            `;
            marker.bindPopup(popupContent);

            // Add event listener for Send Message button
            // const sendMessageButton = marker.getPopup().getContent().querySelector('.send-message');
            // if (sendMessageButton) {
            //   sendMessageButton.addEventListener('click', () => {
            //     this.sendMessage(event.userId);
            //   });
            // }

            // Add event listener for Edit button
            // const editEventButton = marker.getPopup().getContent().querySelector('.edit-event');
            // if (editEventButton) {
            //   editEventButton.addEventListener('click', () => {
            //     this.editEvent(event);
            //   });
            // }
          }
        );
      });
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
      id:0,
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
    this.showForm = !this.showForm; // Toggle form visibility
  }

  canEditEvent(eventUserId: string): boolean {
    const currentUserId = this.keycloak.getUsername();
    return eventUserId === currentUserId;
  }

  editEvent(event: Event): void {
    // Implement logic to open edit form
    console.log('Editing event:', event);
    // Example: Show edit form using Bootstrap modal or custom component
  }

  sendMessage(userId: string): void {
    // Implement logic to send message to event creator
    console.log('Sending message to user:', userId);
    // Example: Use a messaging service or API to send messages
  }
}
