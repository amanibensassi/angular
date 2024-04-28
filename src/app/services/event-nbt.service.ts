import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Event } from '../models/event';
@Injectable({
  providedIn: 'root'
})
export class EventNbtService {

  constructor(private eventService: EventService) { }

  decrementNbt(eventId: number, nbts: number): void {
    this.eventService.getEvent(eventId).subscribe(
      (event: any) => { 
        if (event.nbt > 0) { 
          event.nbt -= nbts;
          if (event.nbt < 0) {
            event.nbt = 0;
          }
          this.eventService.editEvent(event).subscribe(
            () => {
              console.log('Event NBT updated successfully.');
            },
            (error) => {
              console.error('Error updating event NBT:', error);
            }
          );
        } else {
          console.warn('Event NBT is already 0. Cannot decrement further.');
        }
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }

  incrementNbt(eventId: number, nbts: number): void {
    this.eventService.getEvent(eventId).subscribe(
      (event: any) => {
        
          event.nbt += nbts;
  
          this.eventService.editEvent(event).subscribe(
            () => {
              console.log('Event NBT incremented successfully.');
            },
            (error) => {
              console.error('Error updating event NBT:', error);
            }
          );
        
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
  
  
  
}