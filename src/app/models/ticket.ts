import { Event } from "./event";
import { User } from "./user";
export class Ticket {
    idTicket: number;
    nbts: number;
    dateAchat: Date;
    typePay: string;
    event: Event; 
    qrcode: string;
    user: User;


    constructor() {
        this.idTicket = 0;
        this.nbts = 0;
        this.dateAchat = new Date();
        this.typePay = '';
        this.user = new User();
        this.event = new Event(); 
        this.qrcode = '';
    }
}
