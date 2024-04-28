import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from 'src/app/models/publication';

@Component({
  selector: 'app-publication-user',
  templateUrl: './publication-user.component.html',
  styleUrls: ['./publication-user.component.css']
})
export class PublicationUserComponent implements OnInit  {
  publications: Publication[] = [];
  newPublication: Publication = new Publication();
  creatingMode: boolean = true;
  publicationChunks: Publication[][] = [];
  currentPage: number = 1;
  idEvent!: any;
  id : any;
  role : any;
  constructor(private publicationService: PublicationService, private router: Router, private route: ActivatedRoute) {   //this.getAllPublications();
    this.getUserFromLocalStorage();
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
    this.role = user? user.role :"";
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('id')?.charAt(0);
    console.log(this.idEvent);
    if (this.idEvent !== null) {}
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
      window.location.reload();

    });
  }


  createPublication() {
    const newEvent = {
        "idEvent": this.idEvent,
        //"nameEvent": "Event1",
        /*"eventDate": "2024-04-25T10:30:00", // Date et heure de l'événement
        "location": "Lieu de l'événement",
        "description": "Description de l'événement",
        "tickets": [],
        "user": [],*/
        // Vous pouvez ajouter d'autres propriétés ou relations ici
    }
    const newUser = {
        "idUser": this.id,
       // "firstName": "Adem",
       // "lastName": "Ben Hamouda",
        /*"birthDay": "1990-01-01",
        "address": "123 Rue de la Paix",
        "mail": "john.doe@example.com",
        "telNumber": "123-456-7890",
        "password": "hashedPassword123",
        "approuvement": true,
        "role": "ADMIN",
        "events": [],*/
        // Vous pouvez ajouter d'autres propriétés ou relations ici
      
    }
    const newPublication = {
      body: this.newPublication.body,
      datePublication: new Date(),
     // interactions: this.newPublication.interactions ,
      event: newEvent,
      user: newUser,

    }
    


    this.publicationService.addPublication(newPublication).subscribe((response: any) => {

      // Assuming the response contains the newly created publication
      this.publications.unshift(response); // Add the new publication to the beginning of the list
      this.dividePublicationsIntoChunks(); // Update the pagination chunks
      this.newPublication = new Publication(); // Reset the newPublication object
      console.log(response,"response")
    });
    console.log(this.newPublication)
  }



  modifyPublication() {
    this.publicationService.editPublication(this.newPublication).subscribe(() => {
      //alert("Pub Updated Successfully");
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

