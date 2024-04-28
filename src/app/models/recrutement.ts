
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
  ENGINEERING_CONSTRUCTION = 'Engineering and Construction'
  
}

export enum SkillLevel {
  NONE = 'None',
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}



export class Recrutement {
    idRecrutement: number;
    title :string;
    dateStart:Date;
    dateFinish:Date;
    niveau:number;
    requiredSkills: Map<Skill, SkillLevel>;
    description:string;
    users:[];

    constructor(){
        this.idRecrutement = 0;
        this.title = "";
        this.dateStart = new Date();
        this.description = "";
        this.dateFinish = new Date();
        this.requiredSkills = new Map<Skill, SkillLevel>();
        
        this.niveau = 0;
        this.users=[];
      }
      
}
export interface RecrutementAvecSkills extends Recrutement {
  requiredSkills: Map<Skill, SkillLevel>;
}
