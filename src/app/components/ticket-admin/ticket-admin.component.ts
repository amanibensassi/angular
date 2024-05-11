import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { EventService } from 'src/app/services/event.service';
import { TicketService } from 'src/app/services/ticket.service';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrls: ['./ticket-admin.component.css']
})
export class TicketAdminComponent {

  eventId: any;
  tickets: any[] = [];
  newTicket: any = {};
  creatingMode: boolean = true;
  event!: Event;
role :any;


  constructor(private router: Router,private route: ActivatedRoute,private eventService:EventService, private ticketService: TicketService) {
    this.getrole();
   }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('idEvent');
    if (this.eventId !== null) {
      this.retrieveTicketsByEvent(this.eventId);
    }
  }

  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role =='user'){
        this.router.navigateByUrl('/error')
       }
  }
  


  
  retrieveTicketsByEvent(eventId: number): void {
    this.ticketService.retrieveTicketsByEvent(eventId).subscribe(
      (response: any) => {
        this.tickets = response;
        this.generateQRCodeForTickets(); 

      },
      (error: any) => {
        console.error('Error fetching tickets by event:', error);
      }
    );
  }


  
  
  
  
  


  

  openModel(ticket: Ticket = new Ticket()) {
    if (ticket.idTicket == 0) {
      this.newTicket = new Ticket();
    } else {
      this.creatingMode = false;
      this.newTicket = ticket;
    }
  }

  generateQRCodeForTickets(): void {
    for (let ticket of this.tickets) {
      const ticketId = ticket.idTicket;
      QRCode.toDataURL(ticketId.toString(), (err, url) => {
        if (err) {
          console.error('Erreur lors de la génération du QR code :', err);
        } else {
          ticket.qrCodeURL = url;
        }
      });
    }
  }


}
