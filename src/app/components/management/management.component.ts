import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { EventService } from 'src/app/services/event.service';

import { Management } from 'src/app/models/management';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  event : Event = new Event();
  user : User = new User();
  management : any;
  newManagement : Management = new Management();
  testManagement : any;
  creatingMode: boolean = true;
  test: boolean = false;
  ManagementChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  constructor(private managementService: ManagementService,private eventService :EventService, private router: Router) {
    this.getAllManagement();
  }
    getAllManagement() {
        this.managementService.getAllManagement().subscribe(data => {
          this.management = data;
         // this.divideManagementsIntoChunks();
        });
    }
  
    openModel(man : Management = new Management()) {
      if (man.idManagement == 0) {
        this.creatingMode = true;
        this.newManagement = new Management();
      } else {
        this.creatingMode = false;
        this.newManagement = man;
      }
    }


    EditApprouvement(man : Management = new Management()){
      man.approuvement = true;
      console.log(man.approuvement);
      this.managementService.addManagementAdmin(man).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
      });
    }


    deleteManagement(managementId: string) {
      this.managementService.deleteManagement(managementId).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
      });
    }
  
   /* createManagement() {
      const event = {
        idEvent : "5"
      }
      const newManagement = {
        bloc: this.newManagement.bloc,
        classe: this.newManagement.classe,
        details: this.newManagement.details,
        approuvement: this.newManagement.approuvement,
        event: event,
      }
      this.managementService.AddClassroomsAcoordinally(newManagement).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
      });
    }*/
  
    modifyManagement() {
      console.log(this.newManagement);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(this.managementService.AddClassroomsAcoordinally(this.newManagement));
      this.managementService.AddClassroomsAcoordinally(this.newManagement).subscribe(() => {
        this.event = this.newManagement.event;
        this.event.place = ' bloc ' + this.newManagement.bloc + ' - ' + this.newManagement.classe;   
          this.eventService.editEvent(this.event).subscribe(() => {
          this.getAllManagement();
          window.location.reload();
        }, error => {
          console.error("Une erreur s'est produite lors de la mise à jour de l'événement :", error);
        });
      });
    }
    
  
    changePage(pageNumber: number) {
      this.currentPage = pageNumber;
    }
  
    getManagementForPage(pageNumber: number): any[] {
      const ManagementgetAllManagementsPerPage = 2;
      const startIndex = (pageNumber - 1) * ManagementgetAllManagementsPerPage;
      const endIndex = startIndex + ManagementgetAllManagementsPerPage;
      return this.management.slice(startIndex, endIndex);
    }
    
  
    incrementPage() {
      if (this.currentPage < this.ManagementChunks.length) {
        this.currentPage++;
      }
    }
    
    decrementPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    divideManagementIntoChunks() {
      const chunkSize = 2;
      this.ManagementChunks = [];
      for (let i = 0; i < this.management.length; i += chunkSize) {
        this.ManagementChunks.push(this.management.slice(i, i + chunkSize));
    }
    }


    selectRoom(room: string) {
      this.newManagement.classe = room;
  }
}
