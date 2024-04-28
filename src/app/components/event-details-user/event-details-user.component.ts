import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { EventService } from 'src/app/services/event.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-event-details-user',
  templateUrl: './event-details-user.component.html',
  styleUrls: ['./event-details-user.component.css']
})
export class EventDetailsUserComponent {
  events: any;
  event: any;
  idEvent: any;
  newFeedback: any;
  id: any;
  creatingMode: boolean = true;

  constructor(private feedbackService: FeedbackService,private eventService: EventService, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.getUserFromLocalStorage() ;
    this.idEvent = this.route.snapshot.paramMap.get('idEvent'); // Récupérer l'ID de l'événement à partir des paramètres de l'URL
    this.getEvent(this.idEvent);
  }

  getEvent(idEvent: any) {
    this.eventService.getEvent(idEvent).subscribe(data => {
      this.event = data;
    });
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }
  createFeedback() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const add = currentDate.getMilliseconds().toString().padStart(2,'0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${add}`;

    const event = {
      idEvent : this.idEvent
    }
    const user = {
      idUser : this.id
    }
    

    const newfeedback = {
      serviceType : this.newFeedback.serviceType,
      title: this.newFeedback.title,
      body: this.newFeedback.body,
      note: this.newFeedback.note,
      user: user,
      event : event,

    }
    
    this.feedbackService.addFeedback(newfeedback).subscribe(() => {
      window.location.reload();
    });


  }

  openModel(feedback: Feedback = new Feedback()) {
    if (feedback.idFeedback == 0) {
      this.newFeedback = new Feedback();
    } else {
      this.creatingMode = false;
      this.newFeedback = feedback;
    }
  }


}
