import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {
  readonly API_URL = 'http://angular-service:8089/espritgather/feedback';

  constructor(private router: Router,private httpClient: HttpClient) { }
  getAllFeedback(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/feedbacks`)
  }
  addFeedback(Feedback : any) {
    return this.httpClient.post(`${this.API_URL}/add-feedback`, Feedback)
  }
  getFeedback(idFeedback : any){
    return this.httpClient.get(`${this.API_URL}/retrieve-feedback/${idFeedback}`)
  }
  editFeedback(Feedback : any){
    return this.httpClient.put(`${this.API_URL}/modify-feedback`, Feedback)
  }
  addFeedbackAdmin(Feedback : any){
    return this.httpClient.put(`${this.API_URL}/add-feedback-admin`, Feedback)
  }
  deleteFeedback(idFeedback : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-feedback/${idFeedback}`)
  }
}
