import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Campground} from "../../models/Campground";
import {Amenity} from "../../models/Amenity";


@Injectable({
  providedIn: 'root'
})
export class CampingApiService {
  private baseUrl = 'http://localhost:8089/api'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // Campground CRUD operations

  getAllCampgrounds(): Observable<Campground[]> {
    return this.http.get<Campground[]>(`${this.baseUrl}/campgrounds`);
  }

  getCampgroundById(id: number): Observable<Campground> {
    return this.http.get<Campground>(`${this.baseUrl}/campgrounds/${id}`);
  }

  createCampground(campground: Campground): Observable<Campground> {
    return this.http.post<Campground>(`${this.baseUrl}/campgrounds`, campground);
  }

  updateCampground(id: number, campground: Campground): Observable<Campground> {
    return this.http.put<Campground>(`${this.baseUrl}/campgrounds/${id}`, campground);
  }

  deleteCampground(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/campgrounds/${id}`);
  }

  // Amenity CRUD operations

  getAllAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.baseUrl}/amenities`);
  }

  getAmenityById(id: number): Observable<Amenity> {
    return this.http.get<Amenity>(`${this.baseUrl}/amenities/${id}`);
  }

  createAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http.post<Amenity>(`${this.baseUrl}/amenities`, amenity);
  }

  updateAmenity(id: number, amenity: Amenity): Observable<Amenity> {
    return this.http.put<Amenity>(`${this.baseUrl}/amenities/${id}`, amenity);
  }

  deleteAmenity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/amenities/${id}`);
  }
}
