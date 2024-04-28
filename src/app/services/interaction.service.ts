import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  readonly API_URL = 'http://localhost:8089/espritgather/interaction';

  constructor(private httpClient: HttpClient) { }

  getAllInteractions(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/interactions`);
  }

  retrieveInteraction(interactionId: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/retrieve-interaction/${interactionId}`);
  }

  addInteraction(interaction: any,idP?:any,idU?:any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/add-interaction/${idP}/${idU}`, interaction);
  }

  deleteInteraction(interactionId: any): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/remove-interaction/${interactionId}`);
  }

  modifyInteraction(interaction: any): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/modify-interaction`, interaction);
  }
  retrieveInteractionByPublication(publicationId: any,idU:any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/retrieve-interaction-publication/${publicationId}/${idU}`);
  }
}
