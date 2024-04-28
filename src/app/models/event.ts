import { ClubTypes } from "./clubTypes";
import { User } from "./user";

export class Event {

    idEvent : number;
    nameEvent  : string;
    description  : string;
    dateStart  : Date;
    dateFinish  : Date;
    place  : string;
    nbt  : number;
    user : User;
    price : number;
    typeticket: string;
    imagePath: string;
    archive: Boolean;
    typeEvent :string;


    constructor(){
      this.idEvent = 0;
      this.nameEvent = "";
      this.dateStart = new Date();
      this.description = "";
      this.dateFinish = new Date();
      this.place = "";
      this.nbt = 0;
      this.user = new User();
      this.price =0;
      this.typeticket = '';
      this.imagePath="";
      this.typeEvent = "";
      this.archive = false;
    }
}
