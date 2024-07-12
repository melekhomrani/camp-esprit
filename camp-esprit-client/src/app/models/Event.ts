export interface Event {
  id: number;
  description: string;
  lat: number;
  lng: number;
  event_date: string;
  userId: string;
  participants : []
}
