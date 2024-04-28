import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volunteer } from 'src/app/models/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-task-details-user',
  templateUrl: './volunteer-details-user.component.html',
  styleUrls: ['./volunteer-details-user.component.css']
})
export class VolunteerDetailsUserComponent {
  volunteers: any;
  volunteer: any;
  idVolunteer: any;
  id:any;



  constructor(private volunteerservice: VolunteerService, private httpClient: HttpClient, private route: ActivatedRoute) {
    //this.idVolunteer = this.route.snapshot.paramMap.get('idVolunteer'); // Récupérer l'ID de tache à partir des paramètres de l'URL
    this.getVolunteer(this.id);
    this.getUserFromLocalStorage();
  }

  getVolunteer(id: any) {
    this.volunteerservice.retrieveVolunteersByUser(id).subscribe(data => {
      this.volunteer = data;
    });
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

}