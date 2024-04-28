import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';
import { Interaction } from 'src/app/models/interaction';


@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  interactions: Interaction[] = [];
  newInteraction: Interaction = new Interaction();
  creatingMode: boolean = true;
  interactionChunks: Interaction[][] = [];
  currentPage: number = 1;

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getAllInteractions();
  }

  getAllInteractions() {
    this.interactionService.getAllInteractions().subscribe((data: any) => {
      this.interactions = data;
      this.divideInteractionsIntoChunks();
    });
  }

  openModel(interaction: Interaction = new Interaction()) {
    if (interaction.idInteraction === 0) {  
      this.newInteraction = new Interaction();
    } else {
      this.creatingMode = false;
      this.newInteraction = interaction;
    }
  }

  deleteInteraction(interactionId: number) {
    this.interactionService.deleteInteraction(interactionId).subscribe(() => {
      this.getAllInteractions();
    });
  }

  createInteraction() {
    const newInteraction = {
      liked: this.newInteraction.liked,
      dislike: this.newInteraction.dislike,
      publication: this.newInteraction.publication,
      user: this.newInteraction.user
    };

    this.interactionService.addInteraction(newInteraction).subscribe((response: any) => {
      this.interactions.unshift(response);
      this.divideInteractionsIntoChunks();
      this.newInteraction = new Interaction();
    });
  }

  modifyInteraction() {
    this.interactionService.modifyInteraction(this.newInteraction).subscribe(() => {
      alert("Interaction Updated Successfully");
      this.getAllInteractions();
    });
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getInteractionsForPage(pageNumber: number): Interaction[] {
    const interactionsPerPage = 2;
    const startIndex = (pageNumber - 1) * interactionsPerPage;
    const endIndex = Math.min(startIndex + interactionsPerPage, this.interactions.length);
    return this.interactions.slice(startIndex, endIndex);
  }

  incrementPage() {
    if (this.currentPage < this.interactionChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  divideInteractionsIntoChunks() {
    const chunkSize = 2;
    this.interactionChunks = [];
    for (let i = 0; i < this.interactions.length; i += chunkSize) {
      this.interactionChunks.push(this.interactions.slice(i, i + chunkSize));
    }
  }
}
