import { Recrutement } from './recrutement';

export class RecrutementProcess {
  idProcessRecrutement: number;
  skills: string[]; // Utilisation d'un ensemble pour les compétences
  whyToJoin: string;
  availability: string; // Full-time or Part-time
  integratedInOtherClubs: boolean;
  otherClubs: string[]; // If integratedInOtherClubs is true
  interviewDate: Date;
  approved: boolean;
  recrutement: Recrutement = new Recrutement();

  constructor() {
    this.idProcessRecrutement = 0;
    this.interviewDate = new Date();
    this.integratedInOtherClubs = false;
    this.availability = '';
    this.whyToJoin = '';
    this.otherClubs = [];
    this.approved = false;
    this.skills = []; // Initialisation de l'ensemble
  }
}
