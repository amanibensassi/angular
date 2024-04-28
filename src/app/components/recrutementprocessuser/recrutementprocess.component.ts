import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecrutementProcess, RecrutementProcessAvecSkills } from 'src/app/models/recrutement-process';
import { RecrutementprocessService } from 'src/app/services/recrutementprocess.service';
import { formatDate } from '@angular/common';
import { RecrutementComponent } from '../recrutement/recrutement.component';
import { RecrutementService } from 'src/app/services/recrutement.service';
import { Recrutement, Skill, SkillLevel } from 'src/app/models/recrutement';

@Component({
  selector: 'app-recrutementprocess',
  templateUrl: './recrutementprocess.component.html',
  styleUrls: ['./recrutementprocess.component.css']
})
export class RecrutementprocessComponent {
  skillSelectionPercentageChartOptions = {
    title: {
      text: "Skill Selection Percentage"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}%",
      yValueFormatString: "#,###K",
      dataPoints: []
    }]
  };
  processes: any;
  newRecrutementProcess: RecrutementProcess = new RecrutementProcess();
  creatingMode: boolean = true;
  checkboxVisible: boolean = false;
  otherClubsList
  : string[] = ['Club 1', 'Club 2', 'Club 3']; // Remplacez avec les noms des autres clubs réels
  showRecrutementForm: boolean = false;
  recrutementsprocessChunks: any[] = [];
  currentPage: number = 1;
  selectedFile!: File;
  selectedClubs: any = {};
  recrutement: Recrutement = new Recrutement();
 
  skillValues = Object.values(Skill);
  skillLevelValues = Object.values(SkillLevel);
  addedSkills: { skill: Skill; level: SkillLevel }[] = [];
  constructor(private processService: RecrutementprocessService, private router: Router,private RecrutementService:RecrutementService) {
    this.getAllProcesses();
  }

  getAllProcesses() {
    this.processService.getAllProcesses().subscribe(data => {
      this.processes = data;
      this.divideRecrutementsIntoChunks();
    });
  }
  updateCheckboxVisibility() {
    console.log('Integrated in Other Clubs value changed:', this.newRecrutementProcess.integratedInOtherClubs);
    this.checkboxVisible = this.newRecrutementProcess.integratedInOtherClubs === true;

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
      Skills: this.addedSkills.length > 0
      ? this.addedSkills.map(skill => ({ skill: skill.skill, level: skill.level })) // Convert to array if needed
      : this.newRecrutementProcess.skills || new Map<Skill, SkillLevel>(), // Use existing Skills or create a new Map

   
  };

  
  console.log(this.addedSkills); // Verify the content before sending

    console.log(this.addedSkills)
    this.processService.addProcess(this.newRecrutementProcess).subscribe(() => {
      
      this.newRecrutementProcess = new RecrutementProcess();
      this.addedSkills =[];
    this.getAllProcesses();
    window.location.reload();
    });
  }

  addSkill() {
    console.log("Adding new skill...");
    this.addedSkills.push({ skill: Skill.WRITTEN_COMMUNICATION, level: SkillLevel.NONE });
    
    
}
  

  
  removeSkill(index: number) {
    this.addedSkills.splice(index, 1);
  }
  
  modifyProcess() {
    this.processService.editProcess(this.newRecrutementProcess).subscribe(() => {
      
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
      this.processService.getProcess(process.idProcessRecrutement)
      .subscribe((retrievedprocess: object) => { // Cast to any (not recommended)
        const Skills = (retrievedprocess as RecrutementProcessAvecSkills).skills;
        this.newRecrutementProcess.skills = Skills || new Map<Skill, SkillLevel>();
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
      this.recrutementsprocessChunks.push(this.processes.slice(i, i + chunkSize));
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
    }} 
  

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
