export class Recrutement {
  idRecrutement: number;
  title: string;
  dateStart: Date;
  dateFinish: Date;
  niveau: number;
  description: string;
  requiredSkills: String[]; // Utilisation d'un ensemble pour les compétences requises
  users: any[];
  archive: Boolean;

  constructor() {
    this.idRecrutement = 0;
    this.title = '';
    this.dateStart = new Date();
    this.description = '';
    this.dateFinish = new Date();
    this.requiredSkills = []; // Initialisation de l'ensemble
    this.niveau = 0;
    this.users = [];
    this.archive = false;
  }
}
