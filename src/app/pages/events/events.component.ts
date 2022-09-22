import { UrlConstants } from './../../constants';
import { EventService } from './../../service/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [EventService],
})
export class EventsComponent implements OnInit {
  loading: boolean = false;
  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
    });
  }

  ngOnInit(): void {}

  navigateToEvent(eventId: string) {
    this.router.navigate([UrlConstants.viewEvent + '/' + eventId]);
  }

  editEvent(eventId: string) {
    this.router.navigate([UrlConstants.editEvent + '/' + eventId]);
  }

  navigateToCreateEvent() {
    this.router.navigate([UrlConstants.createEvent]);
  }
}
