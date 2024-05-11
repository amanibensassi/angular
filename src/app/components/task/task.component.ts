import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = new Task();
  creatingMode: boolean = true;
  tasksChunks: Task[][] = [];
  currentPage: number = 1;
  chartOptions: any[] = [];
  role : any;
  userCountsDataPoints: { label: string; y: number }[] = [];

  constructor(private taskService: TaskService, private router: Router) {
    this.getrole();
    this.taskService.getStatus().subscribe((pieData: any) => {
      const pieDataPoints = [];
      for (const type in pieData) {
        if (pieData.hasOwnProperty(type)) {
          pieDataPoints.push({ y: pieData[type], label: type });
        }
      }
      const pieChartOptions = {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Count Tasks Status',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            startAngle: -90,
            indexLabel: '{label}',
            yValueFormatString: '#',
            dataPoints: pieDataPoints,
          },
        ],
        margin: {
          top: 20,
          bottom: 50,
          left: 20,
          right: 20,
        },
      };

      this.chartOptions.push(pieChartOptions);
    });
    this.taskService.getCountSkills().subscribe((data: any) => {
      console.log(data);

      this.userCountsDataPoints = Object.keys(data).map((skill) => ({
        label: skill, // Utilisez la compétence comme étiquette
        y: data[skill], // Utilisez le comptage comme valeur de l'axe Y
      }));

      const barChartOptions = {
        theme: 'light2',
        title: {
          text: 'Most required skills',
        },
        axisX: {
          title: 'Count', // Définir le titre de l'axe X comme "Count"
          interval: 1,
        },
        axisY: {
          title: 'Skills', // Définir le titre de l'axe Y comme "Skills"
        },
        data: [
          {
            type: 'column',
            dataPoints: this.userCountsDataPoints,
          },
        ],
      };

      this.chartOptions.push(barChartOptions);

      // Render the chart
      const chart = new CanvasJS.Chart('bar-chart-container', {
        animationEnabled: true,
        exportEnabled: true,
        ...barChartOptions,
      });
      chart.render();
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='admin'){
        this.router.navigateByUrl('/error')
       }
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
      this.divideTasksIntoChunks();
    });
  }

  deleteTask(idTask: number): void {
    this.taskService.deleteTask(idTask).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.idTask !== idTask);
      this.divideTasksIntoChunks();
    });
  }

  createTask(): void {
    this.taskService.createTask(this.newTask, 1).subscribe(() => {
      this.getAllTasks();
      this.newTask = new Task();
    });
  }

  editTask(): void {
    this.taskService.editTask(this.newTask).subscribe(() => {
      this.getAllTasks();
      this.newTask = new Task(); // Reset newTask after editing
    });
  }

  openModel(task: Task = new Task()): void {
    if (task.idTask === 0) {
      this.newTask = new Task();
      this.creatingMode = true;
    } else {
      this.creatingMode = false;
      this.newTask = { ...task };
    }
  }

  divideTasksIntoChunks(): void {
    const chunkSize = 2; // Number of tasks per chunk
    this.tasksChunks = [];
    for (let i = 0; i < this.tasks.length; i += chunkSize) {
      this.tasksChunks.push(this.tasks.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  incrementPage(): void {
    if (this.currentPage < this.tasksChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTasksForPage(pageNumber: number): Task[] {
    return this.tasksChunks[pageNumber - 1] || [];
  }
}
