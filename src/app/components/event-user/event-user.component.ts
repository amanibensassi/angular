import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoundedRect } from 'chart.js/dist/types/geometric';
import { EventService } from 'src/app/services/event.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-event',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.css']
})
export class EventUserComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  searchQuery: string = '';
  filterByPrice: boolean = false;
  filterByPref: boolean = false;
  filterByNbt: boolean = false;
  currentIndex: number = 0;
  selectedUser: any = {};
  type: string = '';
  showCalendarComponent: boolean = false;
  showEventsComponent: boolean = true;
role : any;
  mostLikedEventType: string = ''; 
id:any;
  cardWidth: number = 310;
eventsOfType: any;
  constructor(private eventService: EventService,private ticketService: TicketService, private router : Router) {
    this.getrole();
    this.getUserFromLocalStorage();

   }

  ngOnInit(): void {
    this.retrieveAllEvents();
  }

  getrole(){
    const userString = localStorage.getItem('user');
      console.log(userString);
      const user = userString ? JSON.parse(userString) : null;
       this.role = user ? user.role : "";
       if(this.role !='user'){
        this.router.navigateByUrl('/error')
       }
  }
  getUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    this.id = user ? user.idUser : "";
  }

  showCalendar() {
    this.showCalendarComponent = true;
  }

  showEventList() {
    this.showCalendarComponent = false;
  }

  toggleFilterByPreferences(): void {
    this.ticketService.getTotalNbtsByEventType(this.id).subscribe((data: any) => {
      const eventTypes = Object.keys(data);
      eventTypes.sort((a, b) => data[b] - data[a]);
      this.mostLikedEventType = eventTypes[0];
      const sortedEvents: any[] = [];
      eventTypes.forEach(eventType => {
        const eventsOfType = this.filteredEvents.filter(event => event.typeEvent === eventType);
        sortedEvents.push(...eventsOfType);
      });
      this.filteredEvents = sortedEvents;
    }, (error: any) => {
      console.error('Error retrieving events:', error);
    });
  }
  
  
  
  
  
  

  retrieveAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.events = data.filter((event: { archive: any; }) => !event.archive);
        this.filteredEvents = data.filter((event: { archive: any; }) => !event.archive);
      },
      (error: any) => {
        console.error('Error retrieving events:', error);
      }
    );
  }

  searchEvents(): void {
    if (this.searchQuery.trim() !== '') {
      const searchTerm = this.searchQuery.toLowerCase();
      this.filteredEvents = this.events.filter(event => event.nameEvent.toLowerCase().startsWith(searchTerm));
    } else {
      this.filteredEvents = this.events;
    }
  }

  toggleFilterByPrice(): void {
    if (this.filterByPrice) {
        this.retrieveAllEventsOrderedByPriceAsc();
    } else {
        this.filteredEvents = this.events;
    }
  }

  toggleFilterByNbt(): void {
    if (this.filterByNbt) {
        this.retrieveAllEventsOrderedByNbt();
    } else {
        this.filteredEvents = this.events;
    }
  }

  retrieveAllEventsOrderedByPriceAsc(): void {
    this.eventService.getAllEventsOrderedByPriceAsc().subscribe(
      (data: any) => {
        this.events = data.filter((event: { archive: any; }) => !event.archive);
        this.filteredEvents = data.filter((event: { archive: any; }) => !event.archive);
      },
      (error: any) => {
        console.error('Error retrieving events ordered by price:', error);
      }
    );
  }

  retrieveAllEventsOrderedByNbt(): void {
    this.eventService.findAllEventsOrderedByNbt().subscribe(
      (data: any) => {
        this.events = data.filter((event: { archive: any; }) => !event.archive);
        this.filteredEvents = data.filter((event: { archive: any; }) => !event.archive);
      },
      (error: any) => {
        console.error('Error retrieving events ordered by NBT:', error);
      }
    );
  }

  highlightCard(event: MouseEvent) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card !== event.currentTarget) {
            card.classList.add('gray-background');
        }
    });
}

resetCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('gray-background');
    });
}





}

