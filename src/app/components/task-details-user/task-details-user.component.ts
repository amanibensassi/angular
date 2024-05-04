import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Volunteer } from 'src/app/models/volunteer';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-details-user',
  templateUrl: './task-details-user.component.html',
  styleUrls: ['./task-details-user.component.css'],
})
export class DetailsUserComponent {
  task: any;
  tasks: Task[] = [];
  newTask: Task = new Task();
  idTask: any;
  newVolunteer: Volunteer = new Volunteer();
  creatingMode: boolean = true;
  volunteers: any;
  volunteersChunks: any[] = [];
  showDialog: boolean = false;
  id: any;
  role: any;
  list: any;
  idVolunteer: any;

  v: any;

  constructor(
    private taskService: TaskService,
    private volunteerService: VolunteerService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idTask = this.route.snapshot.paramMap.get('idTask');
    this.getTask(this.idTask);
    this.getUserFromLocalStorage();
    this.volunteerService
      .getVolByUserAndTask(this.id, this.idTask)
      .subscribe((data) => {
        this.list = data;
      });
    console.log(this.list);
    console.log(this.idTask);
  }

  getTask(idTask: any) {
    this.taskService.getTask(idTask).subscribe((data) => {
      this.task = data;
      const v = this.newVolunteer.idVolunteer;
    });
  }
  editTask(): void {
    this.taskService.editTask(this.newTask).subscribe(() => {
      this.newTask = new Task();
      window.location.reload(); // Reset newTask after editing
    });
  }

  openModel1(task: Task = new Task()): void {
    if (task.idTask === 0) {
      this.newTask = new Task();
      this.creatingMode = true;
    } else {
      this.creatingMode = false;
      this.newTask = { ...task };
    }
  }

  openModel(volunteer: Volunteer = new Volunteer()) {
    if (volunteer.idVolunteer == 0) {
      this.newVolunteer = new Volunteer();
    } else {
      this.newVolunteer = volunteer;
    }
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
    this.role = user ? user.role : '';
  }
  deleteTask(idTask: number): void {
    this.taskService.deleteTask(idTask).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.idTask !== idTask);
      this.router.navigate(['/eventsclub']);
    });
  }

  /*
  createVolunteerByTask() {
    this.volunteerService.addVolunteerByTask(this.newVolunteer, this.idTask,this.id).subscribe(
      () => {
        this.newVolunteer = new Volunteer();

        this.getTask(this.idTask);
        window.location.reload();
      },
      error => {
        console.error('Error creating volunteer:', error);
      }
    );
    window.location.reload();
    const v = this.newVolunteer.idVolunteer;
  }
*/

  createVolunteerByTask() {
    this.volunteerService
      .addVolunteerByTask(this.newVolunteer, this.idTask, this.id)
      .subscribe(
        (response: any) => {
          this.newVolunteer = new Volunteer();
          this.getTask(this.idTask);

          this.idVolunteer = response.idVolunteer;
          console.log(this.idVolunteer);

          // Mettez à jour la route après avoir récupéré l'ID du volontaire
          this.router.navigate(['/volunteer/', this.idTask, this.idVolunteer]);
        },
        (error) => {
          console.error('Error creating volunteer:', error);
        }
      );
  }

  openDialog(): void {
    this.showDialog = true;
  }
}
