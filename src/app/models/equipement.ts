import { Event } from "./event";

export class Equipement {
    idEquipement : number;
    equipement  : string;
    other  : string;
    typeequip : string;
    details : string;
    metric : string;
    approuvement : boolean;
    price : number;
    quantite : number;
    datemeeting : Date;
    event : Event;


    constructor(){
        this.idEquipement = 0;
        this.equipement = "other";
        this.other = "";
        this.typeequip = "nothing",
        this.approuvement = false;
        this.price = 0;
        this.datemeeting = new Date();
        this.quantite = 0;
        this.metric = "";
        this.details = "";
        this.event = new Event();
       
      }
}
