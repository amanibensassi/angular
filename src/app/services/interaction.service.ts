import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  readonly API_URL = 'http://localhost:8089/espritgather/interaction';

  constructor(private httpClient: HttpClient) {}

  getAllInteractions(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/interactions`);
  }

  retrieveInteraction(interactionId: any): Observable<any> {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-interaction/${interactionId}`
    );
  }

  addInteraction(interaction: any, idP?: any, idU?: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_URL}/add-interaction/${idP}/${idU}`, interaction)
      .pipe(
        tap((response: any) => {
          // Assurez-vous que la réponse contient une publication
          if (response && response.publication) {
            // Mettre à jour les valeurs de nl et dl dans la publication
            interaction.publication.nl = response.publication.nl;
            interaction.publication.dl = response.publication.dl;
          }
        })
      );
  }

  deleteInteraction(interactionId: any): Observable<any> {
    return this.httpClient.delete(
      `${this.API_URL}/remove-interaction/${interactionId}`
    );
  }

  modifyInteraction(interaction: any): Observable<any> {
    return this.httpClient.put(
      `${this.API_URL}/modify-interaction`,
      interaction
    );
  }
  retrieveInteractionByPublication(
    publicationId: any,
    idU: any
  ): Observable<any> {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-interaction-publication/${publicationId}/${idU}`
    );
  }
}
