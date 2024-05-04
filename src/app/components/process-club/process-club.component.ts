import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RecrutementProcess } from 'src/app/models/recrutement-process';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';
import { formatDate } from '@angular/common';
import { RecrutementComponent } from '../recrutement/recrutement.component';
import { RecrutementService } from 'src/app/services/recrutement.service';
import { Recrutement } from 'src/app/models/recrutement';
@Component({
  selector: 'app-process-club',
  templateUrl: './process-club.component.html',
  styleUrls: ['./process-club.component.css'],
})
export class ProcessClubComponent {
  idRz: any;
  tickets: any[] = [];
  newTicket: any = {};
  creatingMode: boolean = true;
  event!: Event;

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
  //creatingMode: boolean = true;
  checkboxVisible: boolean = false;
  otherClubsList: string[] = ['Club 1', 'Club 2', 'Club 3']; // Remplacez avec les noms des autres clubs réels
  showRecrutementForm: boolean = false;
  recrutementsprocessChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  selectedClubs: any = {};
  recrutement: Recrutement = new Recrutement();
  recId: any;
  constructor(
    private processService: RecrutementprocessService,
    private router: Router,
    private route: ActivatedRoute,
    private RecrutementService: RecrutementService
  ) {
    //  this.getAllProcesses();
  }
  ngOnInit(): void {
    this.recId = this.route.snapshot.paramMap.get('idRecrutement');
    if (this.recId !== null) {
      this.a(this.recId);
    }
  }

  a(idRecrutement: number): void {
    this.processService.retrieveProcessesByRecrutement(idRecrutement).subscribe(
      (response: any) => {
        this.processes = response;
      },
      (error: any) => {
        console.error('Error fetching tickets by event:', error);
      }
    );
  }

  updateCheckboxVisibility() {
    console.log(
      'Integrated in Other Clubs value changed:',
      this.newRecrutementProcess.integratedInOtherClubs
    );
    this.checkboxVisible =
      this.newRecrutementProcess.integratedInOtherClubs === true;
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
    const chunkSize = 5;
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
      const processesPerPage = 5;
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
