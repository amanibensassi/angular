import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Volunteer } from '../../models/volunteer';

@Component({
  selector: 'app-volunteertask',
  templateUrl: './volunteertask.component.html',
  styleUrls: ['./volunteertask.component.css']
})
export class VolunteerTaskComponent implements OnInit {
  newVolunteer: Volunteer = new Volunteer();
  volunteers: any;
  creatingMode: boolean = true;
  volunteersChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  taskId!: number; // Déclarez une variable pour stocker taskId
  bolnumberVolunteers: boolean = false;


  constructor(
    private volunteerService: VolunteerService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['idTask']; // Affectez la valeur de idTask à la variable taskId
      this.getAllVolunteers(this.taskId);
      this.checkNumberVolunteers(this.taskId);
    });
  }

  getAllVolunteers(taskId: number) {
    this.volunteerService.getAllVolunteersByIdTask(taskId).subscribe(data => {
      this.volunteers = data;
      this.divideVolunteersIntoChunks();
    });
  }

  deleteVolunteers(idVolunteer: number) {
    this.volunteerService.deleteVolunteer(idVolunteer).subscribe(() => {
      window.location.reload();
    });
  }

  openModel(volunteer: Volunteer = new Volunteer()) {
    if (volunteer.idVolunteer == 0) {
      this.newVolunteer = new Volunteer();
    } else {
      this.creatingMode = false;
      this.newVolunteer = volunteer;
    }
  }

  divideVolunteersIntoChunks() {
    const chunkSize = 10;
    this.volunteersChunks = [];
    for (let i = 0; i < this.volunteers.length; i += chunkSize) {
      this.volunteersChunks.push(this.volunteers.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getVolunteersForPage(pageNumber: number): any[] {
    const volunteerPerPage = 10;
    const startIndex = (pageNumber - 1) * volunteerPerPage;
    const endIndex = startIndex + volunteerPerPage;
    return this.volunteers.slice(startIndex, endIndex);
  }

  incrementPage() {
    if (this.currentPage < this.volunteersChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  approveVolunteersForTask() { // Supprimez taskId du paramètre
    this.volunteerService.approveVolunteersForTask(this.taskId).subscribe(
      response => {
        console.log("Volunteers approved successfully");
        

        // Rafraîchissez les données des volontaires ou effectuez une autre action appropriée après l'approbation réussie
      },
      error => {
        console.error("Error approving volunteers:", error);
        // Gérez l'erreur appropriée, affichez un message à l'utilisateur ou effectuez une autre action
      }
      
    );
    window.location.reload();
  }

  checkNumberVolunteers(taskId: any) {
    this.volunteerService.retrieveNumberVolunteersByIdTask(taskId).subscribe(
      (numberVolunteers: number) => {
        this.bolnumberVolunteers = numberVolunteers === 0;
      },
      error => {
        console.error('Error retrieving number of volunteers:', error);
      }
    );
  }
}