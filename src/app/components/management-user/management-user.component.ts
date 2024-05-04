import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { Management } from 'src/app/models/management';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent {
  event : Event = new Event();
  user : User = new User();
  management : any;
  newManagement : Management = new Management();
  creatingMode: boolean = true;
  ManagementChunks: any[] = [];
  currentPage: number = 1;
  managementId :any = 0 ;
  idEvent !: any;
  id : any;
  selectedFile!: File;
  constructor(private managementService: ManagementService, private router: Router,private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('idEvent');
    
    this.getAllManagement();
  }
    getAllManagement() {
    
      
      this.managementService.getManagementByEvent(this.idEvent).subscribe(data => {
        this.id = data;
        console.log(this.id);
       if (this.id !=0){
       this.managementService.getManagement(this.id).subscribe(data => {
        
        this.management = data;
        //ajout window reload
      });}
      });
     
    }
  
    openModel(man : Management = new Management()) {
      console.log(this.idEvent);
      if (this.id ==0 ) {
        this.creatingMode = true;
        this.newManagement = new Management();
      } else {
        this.creatingMode = false;
        this.newManagement = man;
      }
    }
    deleteManagement(managementId: string) {
      this.managementService.deleteManagement(managementId).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
      });
    }
  
    createManagement() {
      const event = {
        idEvent : this.idEvent
      }
      const newManagement = {
        details: this.newManagement.details,
        event: event,
      }
      this.managementService.addManagement(newManagement).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
      });
    }
  
    modifyManagement() {
      this.managementService.editManagement(this.newManagement).subscribe(() => {
        this.getAllManagement();
        window.location.reload();
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
