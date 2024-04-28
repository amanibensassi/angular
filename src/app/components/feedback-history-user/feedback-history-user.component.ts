import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback';
import { User } from 'src/app/models/user';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-feedback-history-user',
  templateUrl: './feedback-history-user.component.html',
  styleUrls: ['./feedback-history-user.component.css']
})
export class FeedbackHistoryUserComponent {
  event : Event = new Event();
  user : User = new User();
feedback : any;
newFeedback : Feedback = new Feedback();
creatingMode: boolean = true;
iduser : any;
feedbackChunks: any[] = [];
currentPage: number = 1;
selectedFile!: File;
  id: any;
constructor(private feedbackService: FeedbackService, private router: Router) {
  this.getUserFromLocalStorage() ;
  this.getAllFeedback();
}
  getAllFeedback() {
    this.iduser=this.id;
      this.feedbackService.getAllFeedback().subscribe(data => {
        this.feedbackChunks = data;
      });
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  openModel(feedback: Feedback = new Feedback()) {
    if (feedback.idFeedback == 0) {
      this.newFeedback = new Feedback();
    } else {
      this.creatingMode = false;
      this.newFeedback = feedback;
    }
  }
  deleteFeedback(feedbacktId: string) {
    this.feedbackService.deleteFeedback(feedbacktId).subscribe(() => {
      this.getAllFeedback();
      window.location.reload();
    });
  }

   convertDate(currentDate : Date) {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
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
      idEvent : "1"
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
      this.getAllFeedback();
      window.location.reload();
    });
  }

  modifyFeedback() {
    this.feedbackService.editFeedback(this.newFeedback).subscribe(() => {
      this.getAllFeedback();
      window.location.reload();
    });
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getFeedbacksForPage(pageNumber: number): any[] {
    const feedbacksPerPage = 2;
    const startIndex = (pageNumber - 1) * feedbacksPerPage;
    const endIndex = startIndex + feedbacksPerPage;
    return this.feedback.slice(startIndex, endIndex);
  }
  

  incrementPage() {
    if (this.currentPage < this.feedbackChunks.length) {
      this.currentPage++;
    }
  }
  
  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  divideFeedbacksIntoChunks() {
    const chunkSize = 2;
    this.feedbackChunks = [];
    for (let i = 0; i < this.feedback.length; i += chunkSize) {
      this.feedbackChunks.push(this.feedback.slice(i, i + chunkSize));
  }
  }

  handleTypeChange() {
    
    
  }
}
