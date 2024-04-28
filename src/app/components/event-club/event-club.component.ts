import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event-club',
  templateUrl: './event-club.component.html',
  styleUrls: ['./event-club.component.css']
})
export class EventClubComponent {
  minStartDate: string;

  events: any;
  newEvent: Event = new Event();
  creatingMode: boolean = true;
  show: boolean = false;
    eventsChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  currentSection: number = 1;
  nameEventTouched: boolean = false;
  showNav = true;
  selectedUser: any = {};
  id : any;

  newTask: Task = new Task();
  archivedEvents: any[] = [];
  today: string = new Date().toISOString().split('T')[0];

  selectedEventId!: number;





  constructor(private eventService: EventService, private router: Router,private taskService: TaskService,
  ) {
    this.getUserFromLocalStorage();
    this.getAllEvents();
    this.minStartDate = new Date().toISOString().split('T')[0];

  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  showArchivedEvents() {
    this.eventService.retrieveEventsByUser(this.id).subscribe((data:any) => {
    this.events = data.filter((event: { archive: any; }) => event.archive);
    this.divideEventsIntoChunks();
    //window.location.reload();


  });
  }
  
  getAllEvents() {
    this.eventService.retrieveEventsByUser(this.id).subscribe((data:any) => {
      // Filtrer les événements avec archive = false
      this.events = data.filter((event: { archive: any; }) => !event.archive);
      this.divideEventsIntoChunks();
    });
  }


  
  

  deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.getAllEvents();
      window.location.reload();
    });
  }
  setCurrentSection(section: number) {
    this.currentSection = section;
  }



  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  nextSection() {
    this.currentSection++;
}

previousSection() {
    this.currentSection--;
}

areFieldsFilled(): boolean {
  switch (this.currentSection) {
      case 1:
          return !!this.newEvent.nameEvent && !!this.newEvent.description;
      case 2:
        return !!this.newEvent.place;
      case 3:
          return !!this.newEvent.nbt && (!!this.newEvent.typeticket || this.newEvent.typeticket === 'nonPayante') && (!this.newEvent.typeticket || this.newEvent.typeticket === 'nonPayante' || !!this.newEvent.price);
      case 4:      
          return !!this.newEvent.dateStart && !!this.newEvent.dateFinish;
      default:
          return false;
  }
}

  


createEvent() {
  const formData = new FormData();
  formData.append('nameEvent', this.newEvent.nameEvent);
  formData.append('description', this.newEvent.description);

  const st = new Date(this.newEvent.dateStart);

  if (this.newEvent.dateStart instanceof Date && !isNaN(this.newEvent.dateStart.getTime())) {
    formData.append('dateStart', st.toISOString());
  } else {
    console.error('this.newEvent.dateStart is not a valid Date object');
  }
  
  if (this.newEvent.dateFinish instanceof Date && !isNaN(this.newEvent.dateFinish.getTime())) {
    formData.append('dateFinish', this.newEvent.dateFinish.toISOString());
  } else {
    console.error('this.newEvent.dateFinish is not a valid Date object');
  }
  
  formData.append('place', this.newEvent.place);
  formData.append('nbt', this.newEvent.nbt.toString());
  formData.append('typeticket', this.newEvent.typeticket);
  formData.append('typeEvent', this.newEvent.typeEvent);
  formData.append('price', this.newEvent.price.toString());
  formData.append('imageFile', this.selectedFile); // Ajoutez le fichier ici

  this.eventService.addEventByUser(formData, this.id).subscribe(() => {
    this.getAllEvents();
    window.location.reload();
  });
}




  
  

  modifyEvent() {
    this.eventService.editEvent(this.newEvent).subscribe(() => {
      
      this.getAllEvents();
      window.location.reload();
    });
  }

  openModel(event: Event = new Event()) {
    if (event.idEvent == 0) {
      this.newEvent = new Event();
    } else {
      this.creatingMode = false;
      this.newEvent = event;
    }
  }


  divideEventsIntoChunks() {
    const chunkSize = 4;
    this.eventsChunks = [];
    for (let i = 0; i < this.events.length; i += chunkSize) {
      this.eventsChunks.push(this.events.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getEventsForPage(pageNumber: number): any[] {
    const eventsPerPage = 4;
    const startIndex = (pageNumber - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return this.events.slice(startIndex, endIndex);
  }
  

  incrementPage() {
    if (this.currentPage < this.eventsChunks.length) {
      this.currentPage++;
    }
  }
  
  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  handleTicketTypeChange() {
    if (this.newEvent.typeticket === 'nonPayante') {
      this.newEvent.price = 0; // Définir le prix à 0
    }
  }

  selectEvent(eventId: number): void {
    this.selectedEventId = eventId;
  }
  createTask(eventId: number): void {
    console.log(eventId);
    console.log(this.newTask);
    if (this.selectedEventId) {
      this.taskService.createTask(this.newTask, eventId).subscribe(() => {
        this.newTask = new Task();
        window.location.reload();
      });
    }
    console.log(eventId);
    console.log(this.newTask);

    
 
  }
  openModelAddTask(): void {
    if (this.selectedEventId) {
      this.newTask = new Task();
      this.creatingMode = true;
    } else {
      this.creatingMode = false;
    }
    console.log(this.newTask);
    console.log(this.newTask.idTask);
  }

}
