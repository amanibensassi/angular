import { Volunteer } from './../../models/volunteer';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteer-user',
  templateUrl: './volunteer-user.component.html',
  styleUrls: ['./volunteer-user.component.css']
})
export class VolunteerUserComponent {
  volunteers: any;
  volunteer: any;


  constructor(private volunteerService: VolunteerService,private httpClient: HttpClient, private route: ActivatedRoute)
  {
    this.getAllVolunteers();
  }

  getAllVolunteers() {
    this.volunteerService.getAllVolunteers().subscribe(data => {
      this.volunteers = data;
    });
  }
}