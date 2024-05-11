import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly API_URL = 'http://localhost:8089/espritgather/task';

  constructor(private router: Router, private httpClient: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.API_URL}/retrieve-all-tasks`);
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.API_URL}/modify-task`, task);
  }

  deleteTask(idTask: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.API_URL}/remove-task/${idTask}`
    );
  }

  createTask(task: Task, idevent: number): Observable<Task> {
    return this.httpClient.post<Task>(
      `${this.API_URL}/createtask/${idevent}`,
      task
    );
  }

  retrieveTasksByEvent(idevent: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(
      `${this.API_URL}/retrieve-tasks-by-event/${idevent}`
    );
  }

  getTask(idTask: any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-task/${idTask}`);
  }

  getCountSkills() {
    return this.httpClient.get<Task[]>(`${this.API_URL}/skills/count`);
  }

  getStatus() {
    return this.httpClient.get<Task[]>(`${this.API_URL}/total-tasks-by-status`);
  }
}
