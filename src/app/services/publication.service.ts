import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  readonly API_URL = 'http://angular-service:8089/espritgather/publication';

  constructor(private router: Router, private httpClient: HttpClient) {}

  getAllPublications(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/publications`);
  }

  addPublication(publication: any) {
    return this.httpClient.post(`${this.API_URL}/add-publication`, publication);
  }
  getPublication(idPublication: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-publication/${idPublication}`
    );
  }
  editPublication(publication: any) {
    return this.httpClient.put(
      `${this.API_URL}/modify-publication`,
      publication
    );
  }
  deletePublication(idPublication: any) {
    return this.httpClient.delete(
      `${this.API_URL}/remove-publication/${idPublication}`
    );
  }

  retrievePublicationByNamePublication(namePublication: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-publication-by-name/${namePublication}`
    );
  }

  retrievePublicationByLike() {
    return this.httpClient.get(`${this.API_URL}/all-with-nl-and-dl`);
  }

  getLikesAndDislikesForPublication(publicationId: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.API_URL}/${publicationId}/likes-and-dislikes`
    );
  }
}
