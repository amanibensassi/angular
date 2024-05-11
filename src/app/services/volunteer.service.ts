import { Volunteer } from './../models/volunteer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService {
  readonly API_URL = 'http://sql-service:8089/espritgather/volunteer';

  constructor(private router: Router, private httpClient: HttpClient) {}

  getAllVolunteers() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-volunteers`);
  }

  getUserVolunteerCounts() {
    return this.httpClient.get(`${this.API_URL}/user-volunteer-counts`);
  }
  /*
  getAllVolunteersByIdTask(taskId: number) {
    return this.httpClient.get(`${this.API_URL}/retrieve-volunteer-by-task/${taskId}`)
  }*/

  getAllVolunteersByIdTask(taskId: number) {
    return this.httpClient.get(
      `${this.API_URL}/get-all-volunteers-ordered-by-skills-by-task/${taskId}`
    );
  }

  findVolunteerByTask_Event_IdEvent(eventid: number) {
    return this.httpClient.get(
      `${this.API_URL}/retrievevolunteersbyevent/${eventid}`
    );
  }

  retrieveVolunteersByUser(userid: number) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-volunteer-by-user/${userid}`
    );
  }

  addVolunteer(Volunteer: any) {
    return this.httpClient.post(`${this.API_URL}/add-volunteer`, Volunteer);
  }

  getVolunteer(idVolunteer: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-volunteer/${idVolunteer}`
    );
  }
  editVolunteer(Volunteer: any) {
    return this.httpClient.put(`${this.API_URL}/modify-volunteer`, Volunteer);
  }

  addVolunteerByTask(volunteer: any, taskId: number, userId: number) {
    return this.httpClient.post(
      `${this.API_URL}/create-volunteer/${taskId}/${userId}`,
      volunteer
    );
  }

  getVolByUserAndTask(idUser: any, idTask: any) {
    return this.httpClient.get(
      `${this.API_URL}/retrieve-vol-user/${idUser}/${idTask}`
    );
  }

  deleteVolunteer(idVolunteer: any) {
    return this.httpClient.delete(
      `${this.API_URL}/remove-volunteer/${idVolunteer}`
    );
  }

  approveVolunteersForTask(taskId: number) {
    return this.httpClient.put(`${this.API_URL}/approve/${taskId}`, {});
  }

  retrieveNumberVolunteersByIdTask(taskId: number): Observable<number> {
    return this.httpClient.get<number>(
      `${this.API_URL}/retrieve-number-volunteers/${taskId}`
    );
  }
}
