import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  readonly API_URL = 'http://52.238.248.18:8089/espritgather/ticket';
  
  
  constructor(private router: Router,private httpClient: HttpClient) { }

  getAllTickets() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-tickets`)
  }
  
  addTicket(ticket : any) {
    return this.httpClient.post(`${this.API_URL}/add-ticket`, ticket)
  }
  


  getTicket(idTicket : any){
    return this.httpClient.get(`${this.API_URL}/retrieve-ticket/${idTicket}`)
  }
  editTicket(ticket : any){
    return this.httpClient.put(`${this.API_URL}/modify-ticket`, ticket)
  }
  deleteTicket(idTicket : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-ticket/${idTicket}`)
  }

  addTicketByEvent(ticket: any, eventId: any) {
    return this.httpClient.post(`${this.API_URL}/add-ticket-by-event/${eventId}`, ticket);
  }

  addTicketByEventAndUser(ticket: any, eventId: any, userId: any) {
    return this.httpClient.post(`${this.API_URL}/add-ticket-by-event-user/${userId}/${eventId}`, ticket);
  }

  retrieveTicketsByEvent(eventId: any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-tickets-by-event/${eventId}`);
  }

  getTotalNbtsByEventType(userId: any) {
    return this.httpClient.get(`${this.API_URL}/totalNbtsByEventType/${userId}`);
  }

  retrieveTicketsByEventAndUser(eventId: any,userId: any) {
    return this.httpClient.get(`${this.API_URL}/retrieve-tickets-by-event-and-user/${userId}/${eventId}`);
  }

  deleteTicketByEvent(eventId: any, ticketId: any) {
    return this.httpClient.delete(`${this.API_URL}/delete-ticket-by-event/${eventId}/${ticketId}`);
  }

  getTotalTicketsByDateAchat() {
    return this.httpClient.get<any>(`${this.API_URL}/total-tickets-by-date`);
  }

  getTotalTicketsByTypeAchat() {
    return this.httpClient.get<any>(`${this.API_URL}/total-tickets-by-typeachat`);
  }

  getTotalPricesByEvent() {
    return this.httpClient.get<any>(`${this.API_URL}/total-prices-by-event`);
  }

  getTotalPricesByEventUser(userId: any){
    return this.httpClient.get<any>(`${this.API_URL}/total-prices-by-event/${userId}`);

  }
  



}
