import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.css'],
})
export class TaskUserComponent implements OnInit {
  tasks: any;
  task: any;
  idEvent: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.idEvent = this.route.snapshot.paramMap.get('idEvent');
  }

  ngOnInit() {
    console.log(this.idEvent);
    //  this.route.paramMap.subscribe(params => {
    this.getAllTasks();
    //   const taskId = params.get('id');
    /*if (taskId) {
        this.getTask(taskId);
      } else {
        
      }//
    });*/
  }

  getAllTasks() {
    this.taskService.retrieveTasksByEvent(this.idEvent).subscribe((data) => {
      this.tasks = data;
    });
  }

  getTask(taskId: any) {
    this.taskService.getTask(taskId).subscribe((data) => {
      this.task = data;
    });
  }
}
