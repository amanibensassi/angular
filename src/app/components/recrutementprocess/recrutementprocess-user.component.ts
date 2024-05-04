import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RecrutementComponent } from '../recrutement/recrutement.component';
import { RecrutementProcess } from 'src/app/models/recrutement-process';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';
import { NgForm } from '@angular/forms';
import { RecrutementService } from 'src/app/services/recrutement.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-recrutementprocess-user',
  templateUrl: './recrutementprocess-user.component.html',
  styleUrls: ['./recrutementprocess-user.component.css'],
})
export class RecrutementprocessUserComponent implements OnInit {
  processes: any[] = [];
  showRecrutementForm: boolean = false;
  newRecrutementProcess: any = {};
  otherClubsList: string[] = ['Club 1', 'Club 2', 'Club 3'];
  selectedClubs: any = {};
  creatingMode: boolean = true;
  idRecrutement: any;
  selectedFile!: File;

  selectedSkillLevel: any;
  selectedSkill: any;
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recrutementservice: RecrutementService,
    private RecrutementProcess: RecrutementprocessService
  ) {
    this.getUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.idRecrutement = this.route.snapshot.paramMap.get('idRecrutement');
    if (this.idRecrutement !== null) {
      this.retrieveProcessesByRecrutement(this.idRecrutement);
    }
  }

  retrieveProcessesByRecrutement(idRecrutement: any): void {
    this.RecrutementProcess.retrieveProcessByRecAndUser(
      this.id,
      idRecrutement
    ).subscribe({
      next: (response: any) => {
        this.processes = response;
      },
      error: (error: any) => {
        console.error('Error fetching processes by recruitment:', error);
      },
      complete: () => {},
    });
  }

  modifyProcess(modifiedProcess: RecrutementProcess): void {
    this.RecrutementProcess.editProcess(modifiedProcess).subscribe(() => {
      this.retrieveProcessesByRecrutement(this.idRecrutement); // Recharger la liste après la modification
    });
  }

  deleteProcess(idProcessRecrutement: number): void {
    this.RecrutementProcess.deleteProcess(idProcessRecrutement).subscribe(
      () => {
        this.retrieveProcessesByRecrutement(this.idRecrutement); // Recharger la liste après la modification
      }
    );
  }
  loadProcesses(idRecrutement: number): void {
    this.RecrutementProcess.retrieveProcessesByRecrutement(
      idRecrutement
    ).subscribe((processes: any) => {
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

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : '';
  }

  createProcessbyRecrutement() {
    const formData = new FormData();
    //formData.append('approved', this.newRecrutementProcess.approved.toString());
    if (this.newRecrutementProcess.interviewDate instanceof Date) {
      formData.append(
        'interviewDate',
        new Date(this.newRecrutementProcess.interviewDate).toISOString()
      );
    } else {
      console.error('this.newEvent.dateStart is not an instance of Date');
    }
    formData.append('whyToJoin', this.newRecrutementProcess.whyToJoin);
    //formData.append('otherClubs', this.newRecrutementProcess.otherClubs);
    //formData.append('integratedInOtherClubs', this.newRecrutementProcess.integratedInOtherClubs.toString());
    formData.append('availability', this.newRecrutementProcess.availability);
    formData.append('imageFile', this.selectedFile);
    formData.append('skills', this.newRecrutementProcess.skills);
    /*
    this.addedSkills.forEach(skill => {
      formData.append('skills', skill.skill);
      formData.append('levels', skill.level.toString());
    });
  */
    this.RecrutementProcess.addProcessByRecAndUser(
      formData,
      this.idRecrutement,
      this.id
    ).subscribe(() => {
      this.loadProcesses(this.idRecrutement);
      this.newRecrutementProcess = {};
      //this.addedSkills = [];
      this.showRecrutementForm = false;
      this.retrieveProcessesByRecrutement(this.idRecrutement);
    });
  }
}
