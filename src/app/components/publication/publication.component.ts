import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit  {
  publications: Publication[] = [];
  newPublication: Publication = new Publication();
  creatingMode: boolean = true;
  publicationChunks: Publication[][] = [];
  currentPage: number = 1;

  constructor(private publicationService: PublicationService, private router: Router) {   this.getAllPublications();}

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications() {
    this.publicationService.getAllPublications().subscribe(data => {
      this.publications = data;
      this.dividePublicationsIntoChunks();
      console.log(data)

    });
    
  }

  openModel(publication: Publication = new Publication()) {
    if (publication.idPublication==null) {
      this.newPublication = new Publication();
      this.creatingMode = true;
      console.log(publication)
    } else {
      console.log(publication);
      this.creatingMode = false;
      this.newPublication = publication;
    }
  }

  deletePublication(publicationId: number) {
    this.publicationService.deletePublication(publicationId).subscribe(() => {
      this.getAllPublications();
    });
  }


  createPublication() {
    const newPublication = {
      body: this.newPublication.body,
      datePublication: new Date(),
     // interactions: this.newPublication.interactions ,
      event: this.newPublication.event,
      user: this.newPublication.user,

    }
    


    this.publicationService.addPublication(newPublication).subscribe((response: any) => {
      // Assuming the response contains the newly created publication
      this.publications.unshift(response); // Add the new publication to the beginning of the list
      this.dividePublicationsIntoChunks(); // Update the pagination chunks
      this.newPublication = new Publication(); // Reset the newPublication object
    });
    console.log(this.newPublication)
  }



  modifyPublication() {
    this.publicationService.editPublication(this.newPublication).subscribe(() => {
      alert("Pub Updated Successfully");
      this.getAllPublications();
      
      
      window.location.reload();
    });
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPublicationsForPage(pageNumber: number): Publication[] {
    const publicationsPerPage = 2;
    const startIndex = (pageNumber - 1) * publicationsPerPage;
    const endIndex = Math.min(startIndex + publicationsPerPage, this.publications.length);
    return this.publications.slice(startIndex, endIndex);
  }

  incrementPage() {
    if (this.currentPage < this.publicationChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  dividePublicationsIntoChunks() {
    const chunkSize = 2;
    this.publicationChunks = [];
    for (let i = 0; i < this.publications.length; i += chunkSize) {
      this.publicationChunks.push(this.publications.slice(i, i + chunkSize));
    }
  }



  
}
