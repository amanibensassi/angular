import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecrutementProcess } from 'src/app/models/recrutement-process';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';
import { formatDate } from '@angular/common';
import { RecrutementComponent } from '../recrutement/recrutement.component';
import { RecrutementService } from 'src/app/services/recrutement.service';
import { Recrutement } from 'src/app/models/recrutement';

@Component({
  selector: 'app-recrutementprocess',
  templateUrl: './recrutementprocess.component.html',
  styleUrls: ['./recrutementprocess.component.css'],
})
export class RecrutementprocessComponent {
  skillSelectionPercentageChartOptions = {
    title: {
      text: 'Skill Selection Percentage',
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}%',
        yValueFormatString: '#,###K',
        dataPoints: [],
      },
    ],
  };
  processes: any;
  newRecrutementProcess: RecrutementProcess = new RecrutementProcess();
  creatingMode: boolean = true;
  checkboxVisible: boolean = false;
  otherClubsList: string[] = ['Club 1', 'Club 2', 'Club 3']; // Remplacez avec les noms des autres clubs réels
  showRecrutementForm: boolean = false;
  recrutementsprocessChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  selectedClubs: any = {};
  recrutement: Recrutement = new Recrutement();
role : any;
  constructor(
    private processService: RecrutementprocessService,
    private router: Router,
    private RecrutementService: RecrutementService
  ) {
    this.getrole();
    this.getAllProcesses();
  }
  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='admin'){
        this.router.navigateByUrl('/error')
       }
  }
  getAllProcesses() {
    this.processService.getAllProcesses().subscribe((data) => {
      this.processes = data;
      this.divideRecrutementsIntoChunks();
    });
  }
  updateCheckboxVisibility() {
    console.log(
      'Integrated in Other Clubs value changed:',
      this.newRecrutementProcess.integratedInOtherClubs
    );
    this.checkboxVisible =
      this.newRecrutementProcess.integratedInOtherClubs === true;
  }

  deleteProcess(idProcessRecrutement: number) {
    this.processService.deleteProcess(idProcessRecrutement).subscribe(() => {
      this.getAllProcesses();
      window.location.reload();
    });
  }

  createProcess() {
    const newRecrutementProcess = {
      interviewDate: this.newRecrutementProcess.interviewDate,
      whyToJoin: this.newRecrutementProcess.whyToJoin,
      approved: this.newRecrutementProcess.approved,
      otherClubs: this.newRecrutementProcess.otherClubs,
      integratedInOtherClubs: this.newRecrutementProcess.integratedInOtherClubs,
      availability: this.newRecrutementProcess.availability,
    };

    this.processService.addProcess(this.newRecrutementProcess).subscribe(() => {
      this.newRecrutementProcess = new RecrutementProcess();
      this.getAllProcesses();
      window.location.reload();
    });
  }

  modifyProcess() {
    this.processService
      .editProcess(this.newRecrutementProcess)
      .subscribe(() => {
        this.getAllProcesses();
        window.location.reload();
      });
  }

  openModel(process: RecrutementProcess = new RecrutementProcess()) {
    if (process.idProcessRecrutement == 0) {
      this.newRecrutementProcess = new RecrutementProcess();
    } else {
      this.creatingMode = false;
      this.newRecrutementProcess = process;
      this.processService
        .getProcess(process.idProcessRecrutement)
        .subscribe((retrievedprocess: object) => {
          // Cast to any (not recommended)
        });
    }
  }
  getRequiredSkillsKeys(recrutement: any): string[] {
    return Array.from(recrutement.requiredSkills.keys());
  }

  divideRecrutementsIntoChunks() {
    const chunkSize = 2;
    this.recrutementsprocessChunks = [];
    for (let i = 0; i < this.processes.length; i += chunkSize) {
      this.recrutementsprocessChunks.push(
        this.processes.slice(i, i + chunkSize)
      );
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getProcessesForPage(pageNumber: number): any[] {
    if (this.processes) {
      const processesPerPage = 2;
      const startIndex = (pageNumber - 1) * processesPerPage;
      const endIndex = startIndex + processesPerPage;
      return this.processes.slice(startIndex, endIndex);
    } else {
      return []; // Ou tout autre comportement par défaut que vous souhaitez
    }
  }

  incrementPage() {
    if (this.currentPage < this.recrutementsprocessChunks.length) {
      this.currentPage++;
    }
  }

  decrementPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
