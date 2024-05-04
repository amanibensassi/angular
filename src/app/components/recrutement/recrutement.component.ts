import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recrutement } from 'src/app/models/recrutement';
import { RecrutementService } from 'src/app/services/recrutement.service';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.css'],
})
export class RecrutementComponent {
  recrutements: any;
  newRecrutement: Recrutement = new Recrutement();
  creatingMode: boolean = true;

  recrutementsChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  id: any;

  constructor(
    private recrutementService: RecrutementService,
    private router: Router
  ) {
    this.getUserFromLocalStorage();

    this.getAllRecrutements();
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
  }

  getAllRecrutements() {
    this.recrutementService.getAllRecrutements().subscribe((data) => {
      this.recrutements = data;
      this.divideRecrutementsIntoChunks();
    });
  }

  deleteRecrutement(idRecrutement: number) {
    this.recrutementService.deleteRecrutement(idRecrutement).subscribe(() => {
      this.recrutements = this.recrutements.filter(
        (recrutement: any) => recrutement.idRecrutement !== idRecrutement
      );
    });
  }

  createRecrutement() {
    const newRecrutement = {
      title: this.newRecrutement.title,
      description: this.newRecrutement.description,
      dateStart: this.newRecrutement.dateStart,
      dateFinish: this.newRecrutement.dateFinish,
      niveau: this.newRecrutement.niveau,
      // Add requiredSkills based on retrieved data from backend
    };

    // Loop through addedSkills and add them to the requiredSkills Map
    //this.addedSkills.forEach(skill => {
    //newRecrutement.requiredSkills.set(skill.skill, skill.level);
    //});

    this.recrutementService
      .addRecrutementByUser(newRecrutement, this.id)
      .subscribe(() => {
        this.newRecrutement = new Recrutement();
        this.getAllRecrutements();
        window.location.reload();
      });
  }

  getRequiredSkillsKeys(recrutement: any): string[] {
    return Array.from(recrutement.requiredSkills.keys());
  }

  modifyRecrutement() {
    this.recrutementService
      .editRecrutement(this.newRecrutement)
      .subscribe(() => {
        this.getAllRecrutements();
        window.location.reload();
      });
  }

  openModel(recrutement: Recrutement = new Recrutement()) {
    if (recrutement.idRecrutement == 0) {
      this.newRecrutement = new Recrutement();
    } else {
      this.creatingMode = false;
      this.newRecrutement = recrutement;
      this.recrutementService
        .getRecrutement(recrutement.idRecrutement)
        .subscribe((retrievedRecrutement: object) => {
          // Cast to any (not recommended)
        });
    }
  }

  /* openModel(recrutement: Recrutement = new Recrutement()) {
    if (recrutement.idRecrutement === 0) {
      this.creatingMode = true;
      this.newRecrutement = new Recrutement();
    } else {
      this.creatingMode = false;
      this.newRecrutement = recrutement;
  
      // **Assuming a separate API call to fetch required_skills for editing:**
      this.recrutementService.getRecrutement(recrutement.idRecrutement)
        .subscribe(retrievedRecrutement => {
          this.newRecrutement.requiredSkills = retrievedRecrutement.requiredSkills || new Map<Skill, SkillLevel>();
        });
    }
  }*/

  divideRecrutementsIntoChunks() {
    const chunkSize = 2;
    this.recrutementsChunks = [];
    for (let i = 0; i < this.recrutements.length; i += chunkSize) {
      this.recrutementsChunks.push(this.recrutements.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getRecrutementsForPage(pageNumber: number): any[] {
    const recrutementsPerPage = 2;
    const startIndex = (pageNumber - 1) * recrutementsPerPage;
    const endIndex = startIndex + recrutementsPerPage;
    return this.recrutements.slice(startIndex, endIndex);
  }

  incrementPage() {
    if (this.currentPage < this.recrutementsChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
