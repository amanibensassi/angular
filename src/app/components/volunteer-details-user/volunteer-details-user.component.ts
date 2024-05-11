import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Volunteer } from 'src/app/models/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-task-details-user',
  templateUrl: './volunteer-details-user.component.html',
  styleUrls: ['./volunteer-details-user.component.css'],
})
export class VolunteerDetailsUserComponent {
  volunteers: any;
  volunteer: any;
  idVolunteer: any;
  idTask: any;
  id: any;
role : any;
  constructor(
    private volunteerservice: VolunteerService,
    private httpClient: HttpClient,
    private router : Router,
    private route: ActivatedRoute
  ) {
    this.getrole();
    this.getUserFromLocalStorage();
    this.idVolunteer = this.route.snapshot.paramMap.get('idVolunteer');
    this.idTask = this.route.snapshot.paramMap.get('idTask'); // Récupérer l'ID de tache à partir des paramètres de l'URL

    this.getVolunteer(this.id);
  }
  
  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='user'){
        this.router.navigateByUrl('/error')
       }
  }

  getVolunteer(id: any) {
    this.volunteerservice
      .getVolByUserAndTask(this.id, this.idTask)
      .subscribe((data) => {
        this.volunteer = data;
        console.log(this.volunteer);
      });
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
  }
}
