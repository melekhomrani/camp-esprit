import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: L.Map | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const tunisCoordinates: L.LatLngExpression = [36.8065, 10.1815];
    const Coordinates1: L.LatLngExpression = [36.8065, 9.1815];
    const Coordinates2: L.LatLngExpression = [37.8065, 10.1815];
    const Coordinates3: L.LatLngExpression = [35.8065, 8.1815];
    this.map = L.map('map', {
      center: tunisCoordinates,
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // Define custom icon
    const customIcon = L.icon({
      iconUrl: 'assets/marker.png', // Path to your custom PNG image
      iconSize: [32, 40], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });

    // Example marker for Tunis
    const marker = L.marker(tunisCoordinates, { icon: customIcon }).addTo(this.map);
    marker.bindPopup('<b>iam camping here for 2 nights</b>');

    // Example markers for other coordinates
    const marker2 = L.marker(Coordinates1, { icon: customIcon }).addTo(this.map);
    marker2.bindPopup('<b>Very Wonderfull,Wanna Join?</b>');

    const marker3 = L.marker(Coordinates2, { icon: customIcon }).addTo(this.map);
    marker3.bindPopup('<b>We need some Water Here!!!</b>');

    const marker4 = L.marker(Coordinates3, { icon: customIcon }).addTo(this.map);
    marker4.bindPopup('<b>We are 3 persons and we need a fourth</b>');
  }
}
