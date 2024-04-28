import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutementComponent } from '../recrutement/recrutement.component';
import { RecrutementProcess, Skill, SkillLevel } from 'src/app/models/recrutement-process';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';
import { NgForm } from '@angular/forms';
import { RecrutementService } from 'src/app/services/recrutement.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-recrutementprocess-user',
  templateUrl: './recrutementprocess-user.component.html',
  styleUrls: ['./recrutementprocess-user.component.css']
})
export class RecrutementprocessUserComponent implements OnInit {
  processes: any[] = [];
  showRecrutementForm: boolean = false;
  newRecrutementProcess: any = {};
  otherClubsList: string[] = ['Club 1', 'Club 2', 'Club 3'];
  selectedClubs: any = {};
  creatingMode: boolean = true;
  idRecrutement :any;
  
  skillValues = Object.values(Skill);
  skillLevelValues = Object.values(SkillLevel);
  addedSkills: { skill: Skill; level: SkillLevel }[] = [];
  selectedSkillLevel: any;
  selectedSkill: any;
  id : any;
 
  constructor(private router: Router,private route: ActivatedRoute,private recrutementservice: RecrutementService,private RecrutementProcess :RecrutementprocessService) { 
 this.getUserFromLocalStorage();
  }
  

ngOnInit(): void {
  this.idRecrutement = this.route.snapshot.paramMap.get('idRecrutement');
  if (this.idRecrutement !== null) {
    this.retrieveProcessesByRecrutement(this.idRecrutement);
  }
}

retrieveProcessesByRecrutement(idRecrutement: any): void {
  this.RecrutementProcess.retrieveProcessByRecAndUser(this.id,idRecrutement)
    .subscribe({
      next: (response: any) => {
        this.processes = response;
      },
      error: (error: any) => {
        console.error('Error fetching processes by recruitment:', error);
      },
      complete: () => {
      },
    });
}

  modifyProcess(modifiedProcess: RecrutementProcess): void {
    this.RecrutementProcess.editProcess(modifiedProcess).subscribe(() => {
      this.retrieveProcessesByRecrutement(this.idRecrutement); // Recharger la liste après la modification
    });
  }

  deleteProcess(idProcessRecrutement: number): void {
    this.RecrutementProcess.deleteProcess(idProcessRecrutement).subscribe(() => {
      this.retrieveProcessesByRecrutement(this.idRecrutement); // Recharger la liste après la modification
    });
  }
  loadProcesses(idRecrutement:number): void {
    this.RecrutementProcess.retrieveProcessesByRecrutement(idRecrutement).subscribe((processes: any) => {
        // Ajouter le nouvel entretien au début du tableau
        this.processes = [this.newRecrutementProcess, ...processes];
    });
}
 
  openModel(process: RecrutementProcess = new RecrutementProcess()) {
    if (process.idProcessRecrutement == 0) {
      this.newRecrutementProcess = new RecrutementProcess();
      
      this.loadProcesses(this.idRecrutement);
    } else {
      this.creatingMode = false;
      this.newRecrutementProcess = process;
      
    }
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }
  
  createProcessbyRecrutement(): void {
    let newRecrutementProcess = {
      approved: this.newRecrutementProcess.approved,
      interviewDate: this.newRecrutementProcess.interviewDate,
      whyToJoin: this.newRecrutementProcess.whyToJoin,
      otherClubs: this.newRecrutementProcess.otherClubs,
      integratedInOtherClubs: this.newRecrutementProcess.integratedInOtherClubs,
      availability: this.newRecrutementProcess.availability,
      skills: this.addedSkills.reduce((map, skill) => {
          map.set(skill.skill, skill.level);
          return map;
      }, new Map<Skill, SkillLevel>())
  };
    
   
    console.log(this.addedSkills);
    
    this.newRecrutementProcess.skills =  new Map<Skill, SkillLevel>(
      this.addedSkills.map(skill => [skill.skill, skill.level])
    ),
    
    console.log(this.newRecrutementProcess );   
    console.log(this.addedSkills );
    console.log(newRecrutementProcess.skills);
console.log(this.id);

    this.RecrutementProcess.addProcessByRecAndUser(newRecrutementProcess, this.idRecrutement,this.id ).subscribe(() => {
      
        this.loadProcesses(this.idRecrutement);
        
        this.newRecrutementProcess = {};
        this.addedSkills =[]; // Réinitialiser les valeurs du formulaire après la création réussie
        this.showRecrutementForm = false;
        
        this.retrieveProcessesByRecrutement(this.idRecrutement);
    });
}
trackBySkill(skill: { skill: Skill; level: SkillLevel }) {
  return skill; // Track by the entire skill object
}


 
addSkill() {
  console.log("Adding new skill...");
  
  this.addedSkills.push({ skill: Skill.WRITTEN_COMMUNICATION, level: SkillLevel.NONE });
  
  
}
  
removeSkill(index: number) {
  this.addedSkills.splice(index, 1);
}

 /* updateAvailablePosts(recrutementId: number, updatedPosts: number): void {
    this.RecrutementProcess.updateAvailablePosts(recrutementId, updatedPosts).subscribe({
      next: () => {
        console.log('Nombre de postes mis à jour avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour des postes disponibles :', error);
      }
    });
  }*/
 
  
  }