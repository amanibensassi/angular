import { Recrutement } from "./recrutement";

export enum Skill {
  WRITTEN_COMMUNICATION = 'Written Communication',
  ORAL_COMMUNICATION = 'Oral Communication',
  TEAMWORK = 'Teamwork',
  COLLABORATION = 'Collaboration',
  PROJECT_MANAGEMENT = 'Project Management',
  PROBLEM_SOLVING = 'Problem Solving',
  ADAPTABILITY = 'Adaptability',
  QUICK_LEARNING = 'Quick Learning',
  CREATIVITY = 'Creativity',
  INNOVATION = 'Innovation',
  TIME_MANAGEMENT = 'Time Management',
  PRIORITIZATION = 'Prioritization',
  MARKETING_COMMUNICATION = 'Marketing Communication',
  FINANCE_ACCOUNTING = 'Finance and Accounting',
  HUMAN_RESOURCES = 'Human Resources',
  ENGINEERING_CONSTRUCTION = 'Engineering and Construction',
}

export enum SkillLevel {
  NONE = 'None',
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export class RecrutementProcess {
  idProcessRecrutement: number;
  skills: Map<Skill, SkillLevel> = new Map();
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
    // this.skills = new Map<Skill, SkillLevel>(); // Already set in the declaration
    this.whyToJoin = '';
    this.otherClubs = [];
    this.approved = false;
  }
}

export interface RecrutementProcessAvecSkills extends RecrutementProcess {
  skills: Map<Skill, SkillLevel>;
}