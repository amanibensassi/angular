import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Assurez-vous que dayGridPlugin est correctement importé
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
  };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveAllEvents();
  }
  retrieveAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.events = data.filter((event: { archive: any }) => !event.archive);

        const eventsForCalendar = data
          .filter((event: { archive: any }) => !event.archive) // Filtre les événements archivés
          .map((event: any) => {
            return {
              title: event.nameEvent,
              describe: event.typeEvent,
              start: event.dateStart,
              id: event.idEvent,
              selectable: true,
              url: '/event/' + event.idEvent,
              backgroundColor: 'lightpink',
              borderColor: 'pink',
            };
          });
        this.calendarOptions.events = eventsForCalendar;
      },
      (error: any) => {
        console.error('Error retrieving events:', error);
      }
    );
  }
}
