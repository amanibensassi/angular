import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

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




  constructor(private eventService: EventService, private router: Router) {
    this.getAllEvents();
  }

  

  showArchivedEvents() {
    this.eventService.getAllEvents().subscribe((data:any) => {
    this.events = data.filter((event: { archive: any; }) => event.archive);
    this.divideEventsIntoChunks();
    //window.location.reload();


  });
  }
  
  getAllEvents() {
    this.eventService.getAllEvents().subscribe((data:any) => {
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

  // Vérifiez si this.newEvent.dateStart est une instance de Date avant de l'ajouter au FormData
  if (this.newEvent.dateStart instanceof Date) {
    formData.append('dateStart', new Date(this.newEvent.dateStart).toISOString().slice(0, 16).replace('T', ' '));
  } else {
    console.error('this.newEvent.dateStart n\'est pas une instance de Date');
  }

  // Vérifiez si this.newEvent.dateFinish est une instance de Date avant de l'ajouter au FormData
  if (this.newEvent.dateFinish instanceof Date) {
    formData.append('dateFinish', new Date(this.newEvent.dateFinish).toISOString().slice(0, 16).replace('T', ' '));
  } else {
    console.error('this.newEvent.dateFinish n\'est pas une instance de Date');
  }

  formData.append('place', this.newEvent.place);
  formData.append('nbt', this.newEvent.nbt.toString());
  formData.append('typeticket', this.newEvent.typeticket);
  formData.append('price', this.newEvent.price.toString());
  formData.append('imageFile', this.selectedFile); // Ajoutez le fichier ici

  this.eventService.addEventByUser(formData, 1).subscribe(() => {
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
    const chunkSize = 2;
    this.eventsChunks = [];
    for (let i = 0; i < this.events.length; i += chunkSize) {
      this.eventsChunks.push(this.events.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getEventsForPage(pageNumber: number): any[] {
    const eventsPerPage = 2;
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



  
}