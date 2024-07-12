import {Component, OnInit} from '@angular/core';
import {MapService} from "../../services/map/map.service";
import {Event} from "../../models/Event";

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit{

  events: Event[] = [];

  constructor(private eventService: MapService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (events: any[]) => {
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  editEvent(eventId: number): void {
    // Implement edit functionality
    console.log('Editing event with ID:', eventId);
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          console.log('Event deleted successfully.');
          // Refresh events list after deletion
          this.loadEvents();
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

}
