import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

import { EventService } from 'src/app/services/event.service';
import { TicketService } from 'src/app/services/ticket.service';
import { EquipementService } from 'src/app/services/equipement.service';
@Component({
  selector: 'app-event-club',
  templateUrl: './event-club.component.html',
  styleUrls: ['./event-club.component.css'],
})
export class EventClubComponent {
  eventsData: any[] = [];
  netTotalPrice: any;
  events: any;
  e: any;
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
  id: any;
  minDateTimeLocal: string;
  maxDateTimeLocal!: string;

  newTask: Task = new Task();
  archivedEvents: any[] = [];
  minDate: string;

  today = new Date().toISOString().split('T')[0];
  selectedEventId!: number;

  constructor(
    private eventService: EventService,
    private router: Router,
    private taskService: TaskService,
    private ticketService: TicketService,
    private equipementService: EquipementService
  ) {
    this.getUserFromLocalStorage();
    this.getAllEvents();
    this.calcul();
    this.minDate = new Date().toISOString().split('T')[0];
    this.minDateTimeLocal = this.getDateTimeLocal(new Date());
  }

  getDateTimeLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  areAllFieldsFilled(): boolean {
    // Vérifiez si tous les champs nécessaires sont remplis
    const isNameTaskFilled = !!this.newTask.nameTask;
    const isTaskStartFilled = !!this.newTask.taskStart;
    const isTaskFinishFilled = !!this.newTask.taskFinish;
    const isDetailsFilled = !!this.newTask.details;
    const isNumberVolunteerFilled = !!this.newTask.numberVolunteer;
    const areSkillsFilled = this.newTask.skills.length > 0;

    // Retournez true si tous les champs sont remplis, sinon retournez false
    return (
      isNameTaskFilled &&
      isTaskStartFilled &&
      isTaskFinishFilled &&
      isDetailsFilled &&
      isNumberVolunteerFilled &&
      areSkillsFilled
    );
  }

  createEvent() {
    const formData = new FormData();
    formData.append('nameEvent', this.newEvent.nameEvent);
    formData.append('description', this.newEvent.description);

    if (this.newEvent.dateStart instanceof Date) {
      formData.append(
        'dateStart',
        this.getDateTimeLocal(this.newEvent.dateStart)
      );
    } else {
      console.error('this.newEvent.dateStart is not an instance of Date');
    }

    if (this.newEvent.dateFinish instanceof Date) {
      formData.append(
        'dateFinish',
        this.getDateTimeLocal(this.newEvent.dateFinish)
      );
    } else {
      console.error('this.newEvent.dateFinish is not an instance of Date');
    }

    formData.append('place', this.newEvent.place);
    formData.append('nbt', this.newEvent.nbt.toString());
    formData.append('typeticket', this.newEvent.typeticket);
    formData.append('typeEvent', this.newEvent.typeEvent);

    formData.append('price', this.newEvent.price.toString());
    formData.append('imageFile', this.selectedFile);

    this.eventService.addEventByUser(formData, this.id).subscribe(() => {
      this.getAllEvents();
      console.log(formData);

      window.location.reload();
    });
  }

  dateS() {
    console.log(this.newEvent.dateStart);
    //console.log(new Date(this.newEvent.dateStart).toISOString());
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
  }

  showArchivedEvents() {
    this.eventService.retrieveEventsByUser(this.id).subscribe((data: any) => {
      this.events = data.filter((event: { archive: any }) => event.archive);
      this.divideEventsIntoChunks();
      //window.location.reload();
    });
  }
  calcul() {
    this.ticketService.getTotalPricesByEvent().subscribe(
      (data: any) => {
        for (const eventId in data) {
          if (data.hasOwnProperty(eventId)) {
            const totalPrice = data[eventId];
            this.equipementService.getPriceByEvent(eventId).subscribe(
              (equipementPrice: any) => {
                this.netTotalPrice = totalPrice - equipementPrice;
                this.eventsData.push({
                  eventId: eventId,
                  netTotalPrice: this.netTotalPrice,
                });
                console.log(eventId);
                console.log(this.eventsData);
              },
              (error) => {
                console.error(
                  "Une erreur s'est produite lors de la récupération du prix de l'équipement :",
                  error
                );
              }
            );
          }
        }
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération du prix total des billets par événement :",
          error
        );
      }
    );
  }

  getAllEvents() {
    this.eventService.retrieveEventsByUser(this.id).subscribe((data: any) => {
      this.events = data.filter((event: { archive: any }) => !event.archive);
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
        return (
          !!this.newEvent.nbt &&
          (!!this.newEvent.typeticket ||
            this.newEvent.typeticket === 'nonPayante') &&
          (!this.newEvent.typeticket ||
            this.newEvent.typeticket === 'nonPayante' ||
            !!this.newEvent.price)
        );
      case 4:
        return !!this.newEvent.dateStart && !!this.newEvent.dateFinish;
      default:
        return false;
    }
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
