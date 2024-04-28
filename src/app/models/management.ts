
import { Event } from "./event";

export class Management {
    idManagement : number;
    bloc  : string;
    classe : string;
    details: string;
    approuvement : boolean;
    event : Event;


    constructor(){
        this.idManagement = 0;
        this.bloc = "";
        this.classe = "";
        this.details = "";
        this.approuvement = false;
        this.event = new Event();
      }
}
