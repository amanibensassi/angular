import { Volunteer } from './../../models/volunteer';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { VolunteerService } from 'src/app/services/volunteer.service';


@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {

  newVolunteer: Volunteer = new Volunteer();

  volunteers: any;
  creatingMode: boolean = true;
  volunteersChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  id:any;



  constructor(private VolunteerService: VolunteerService,
     private router: Router,
     private http: HttpClient) {
    this.getAllVolunteers();
    this.getUserFromLocalStorage();
  }

  getAllVolunteers() {
    this.VolunteerService.getAllVolunteers().subscribe(data => {
      this.volunteers = data;
      this.divideVolunteersIntoChunks();
    });
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  deleteVolunteers(idVolunteer: number) {
    this.VolunteerService.deleteVolunteer(idVolunteer).subscribe(() => {
      this.getAllVolunteers();
      window.location.reload();
    });
  }


/*
  createVolunteerByTask() {
    this.VolunteerService.addVolunteerByTask(this.newVolunteer,1, this.id).subscribe( () => {
        this.getAllVolunteers();
        window.location.reload();
      });
  }
*/


  modifyVolunteer() {
    this.VolunteerService.editVolunteer(this.newVolunteer).subscribe(() => {

      this.getAllVolunteers();
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
    const chunkSize = 2;
    this.volunteersChunks = [];
    for (let i = 0; i < this.volunteers.length; i += chunkSize) {
      this.volunteersChunks.push(this.volunteers.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getVolunteersForPage(pageNumber: number): any[] {
    const volunteerPerPage = 2;
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









}