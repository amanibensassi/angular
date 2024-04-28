import { Task } from "./task";
import { User } from "./user";
export class Volunteer {
    idVolunteer: number;
    nameVolunteer: string;
    approuvement: boolean;
    reason: string;
    availabilityVolunteer: string;
    firstDate: Date;
    lastDate: Date;
    skills: string[];
    task : Task;
    user : User;
  
    constructor() {
      this.idVolunteer = 0;
      this.nameVolunteer = '';
      this.approuvement = false;
      this.reason = '';
      this.availabilityVolunteer = '';
      this.firstDate = new Date();
      this.lastDate = new Date();
      this.skills = [];
      this.task = new Task();
      this.user = new User();
    }
  }