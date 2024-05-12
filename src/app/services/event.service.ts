import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  readonly API_URL = 'http://52.238.248.18:8089/espritgather/event';

  constructor(private router: Router, private httpClient: HttpClient) {}

  getAllEvents() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-events`);
  }

  addEvent(event: any) {
    return this.httpClient.post(`${this.API_URL}/add-event`, event);
  }

  addEventByUser(event: any, userId: any) {
    return this.httpClient.post(`${this.API_URL}/add-event/${userId}`, event);
  }

  retrieveEventsByUser(userId: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-events-by-user/${userId}`
    );
  }

  getEvent(idEvent: any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-event/${idEvent}`);
  }
  editEvent(event: any) {
    return this.httpClient.put(`${this.API_URL}/modify-event`, event);
  }
  deleteEvent(idEvent: any) {
    return this.httpClient.delete(`${this.API_URL}/remove-event/${idEvent}`);
  }

  retrieveEventByNameEvent(nameEvent: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-event-by-name/${nameEvent}`
    );
  }

  findAllEventsOrderedByNbt() {
    return this.httpClient.get(`${this.API_URL}/ordered-by-nbt`);
  }

  getAllEventsOrderedByPriceAsc() {
    return this.httpClient.get(`${this.API_URL}/ordered-by-price`);
  }
}
