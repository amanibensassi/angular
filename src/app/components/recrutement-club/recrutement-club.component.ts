import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recrutement } from 'src/app/models/recrutement';
import { RecrutementService } from 'src/app/services/recrutement.service';

@Component({
  selector: 'app-recrutement-club',
  templateUrl: './recrutement-club.component.html',
  styleUrls: ['./recrutement-club.component.css'],
})
export class RecrutementClubComponent {
  recrutements: any;
  newRecrutement: Recrutement = new Recrutement();
  creatingMode: boolean = true;
  today = new Date().toISOString().split('T')[0];
  role : any;
  recrutementsChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  id: any;
  requiredSkills: string[] = [];

  constructor(
    private recrutementService: RecrutementService,
    private router: Router
  ) {
    this.getrole();
    this.getUserFromLocalStorage();
    this.getAllRecrutements();
  }
  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='club'){
        this.router.navigateByUrl('/error')
       }
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
  }

  createRecrutement() {
    const newRecrutement = {
      title: this.newRecrutement.title,
      description: this.newRecrutement.description,
      dateStart: this.newRecrutement.dateStart,
      dateFinish: this.newRecrutement.dateFinish,
      niveau: this.newRecrutement.niveau,
      requiredSkills: this.newRecrutement.requiredSkills, // Utiliser les compétences sélectionnées
    };

    this.recrutementService
      .addRecrutementByUser(newRecrutement, this.id)
      .subscribe(() => {
        this.newRecrutement = new Recrutement();
        this.requiredSkills = [];
        this.getAllRecrutements();
      });
  }

  getAllRecrutements() {
    this.recrutementService
      .retrieveRecssByUser(this.id)
      .subscribe((data: any) => {
        // Filtrer les événements avec archive = false
        this.recrutements = data.filter(
          (recrutement: { archive: any }) => !recrutement.archive
        );
        this.divideRecrutementsIntoChunks();
      });
  }

  showArchivedRecs() {
    this.recrutementService
      .retrieveRecssByUser(this.id)
      .subscribe((data: any) => {
        this.recrutements = data.filter(
          (recrutement: { archive: any }) => recrutement.archive
        );
        this.divideRecrutementsIntoChunks();
        //window.location.reload();
      });
  }

  deleteRecrutement(idRecrutement: number) {
    this.recrutementService.deleteRecrutement(idRecrutement).subscribe(() => {
      this.recrutements = this.recrutements.filter(
        (recrutement: any) => recrutement.idRecrutement !== idRecrutement
      );
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
      this.creatingMode = true;
      this.newRecrutement = new Recrutement();
    } else {
      this.creatingMode = false;
      this.newRecrutement = recrutement;

      // Assumant que la liste des compétences requises est une chaîne séparée par des virgules
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
    const chunkSize = 5;
    this.recrutementsChunks = [];
    for (let i = 0; i < this.recrutements.length; i += chunkSize) {
      this.recrutementsChunks.push(this.recrutements.slice(i, i + chunkSize));
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getRecrutementsForPage(pageNumber: number): any[] {
    const recrutementsPerPage = 5;
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
