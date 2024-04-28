
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { EventNbtService } from 'src/app/services/event-nbt.service';
import * as QRCode from 'qrcode';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  eventId: any;
  tickets: any[] = [];
  newTicket: any = {};
  totalPrice: number = 0;
  selectedTicket: any;

  creatingMode: boolean = true;
  event!: Event;
  exceedsAvailableTickets: boolean = false;

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  id: any;







  constructor(private router: Router, private route: ActivatedRoute, private eventNbtService: EventNbtService, private eventService: EventService, private ticketService: TicketService) {
    this.getUserFromLocalStorage();

  }

  ngOnInit(): void {

    this.eventId = this.route.snapshot.paramMap.get('idEvent');
    if (this.eventId !== null) {
      this.retrieveTicketsByEvent(this.eventId);
    }
  }

  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  createTicketbyEvent() {
    this.eventService.getEvent(this.eventId).subscribe((event: any) => {
      const availableTickets = event.nbt;
      const selectedTickets = this.newTicket.nbts;
      if (selectedTickets <= availableTickets) {
        const newTicket = {
          nbts: selectedTickets,
          dateAchat: new Date(),
          typePay: this.newTicket.typePay
        };
        this.ticketService.addTicketByEventAndUser(newTicket, this.eventId, this.id).subscribe(() => {
          this.eventNbtService.decrementNbt(this.eventId, selectedTickets);
          this.retrieveTicketsByEvent(this.eventId);
          this.newTicket = {};
        });
      } else {
        this.exceedsAvailableTickets = true;
      }
    });
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




  retrieveTicketsByEvent(eventId: any): void {
    this.ticketService.retrieveTicketsByEventAndUser(eventId, this.id).subscribe((tickets: any) => {
      this.tickets = tickets;
      this.generateQRCodeForTickets();
    });
  }







  calculateTotalPrice(nbts: number, pricePerTicket: number): number {
    return nbts * pricePerTicket;
  }
  updateTotalPrice() {
    const pricePerTicket = this.newTicket.event.price;
    this.totalPrice = this.calculateTotalPrice(this.newTicket.nbts, pricePerTicket);
  }


  getTicket(ticketId: string) {
    this.generateQRCodeForTickets();
    return this.ticketService.getTicket(ticketId);

  }




  deleteTicket(ticketId: string) {
    this.ticketService.getTicket(ticketId).subscribe((ticket: any) => {
      if (ticket) {
        const nbtsToDelete = ticket.nbts;
        this.ticketService.deleteTicket(ticketId).subscribe(() => {
          this.eventNbtService.incrementNbt(this.eventId, nbtsToDelete);
          this.retrieveTicketsByEvent(this.eventId);
        });
      } else {
        console.error('Ticket not found with ID:', ticketId);
      }
    });
  }

  modifyTicket() {
    const previousNbts = this.tickets.find(ticket => ticket.idTicket === this.newTicket.idTicket)?.nbts || 0;
    this.ticketService.editTicket(this.newTicket).subscribe(() => {
      const nbtsDifference = this.newTicket.nbts - previousNbts;
      if (nbtsDifference > 0) {
        this.eventNbtService.incrementNbt(this.newTicket.event.id, nbtsDifference);
      } else if (nbtsDifference < 0) {
        this.eventNbtService.decrementNbt(this.newTicket.event.id, Math.abs(nbtsDifference));
      }
      this.retrieveTicketsByEvent(this.newTicket.event.id);
    });
  }


  openModel(ticket: Ticket = new Ticket()) {
    if (ticket.idTicket == 0) {
      this.newTicket = new Ticket();
    } else {
      this.creatingMode = false;
      this.newTicket = ticket;
    }
  }


  downloadTicketPDF(idTicket: any): void {
    this.getTicket(idTicket).subscribe((ticket: any) => {
      const docDefinition: any = {
        content: [
          {
            text: 'Event Ticket',
            style: 'header',
            alignment: 'center',
          },
          {
            text: [
              { text: 'Ticket ID: ', style: 'subheader' },
              { text: `${ticket.idTicket}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
          {
            text: [
              { text: 'Number of Tickets: ', style: 'subheader' },
              { text: `${ticket.nbts}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
          {
            text: [
              { text: 'Date of Purchase: ', style: 'subheader' },
              { text: `${ticket.dateAchat}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
          {
            text: [
              { text: 'Type of Payment: ', style: 'subheader' },
              { text: `${ticket.typePay}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
          {
            text: [
              { text: 'qrcoe: ', style: 'subheader' },
              { text: `${ticket.qrCodeURL}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
          {
            text: [
              { text: 'Total Price: ', style: 'subheader' },
              { text: `${ticket.event.price * ticket.nbts}`, style: 'subheader-red' }
            ],
            alignment: 'center',
          },
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 20],
          },
          subheader: {
            fontSize: 18,
            margin: [0, 0, 0, 10],
            bold: true,
            color: 'black', // Couleur du texte en noir
          },
          'subheader-red': {
            fontSize: 18,
            margin: [0, 0, 0, 10],
            bold: true,
            color: 'maroon', // Couleur du texte en rouge bordeaux
          },
        },
      };
      
      

      pdfMake.createPdf(docDefinition).download(`ticket_${ticket.idTicket}.pdf`);
    });
  }









}
