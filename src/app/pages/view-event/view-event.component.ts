import { UrlConstants } from './../../constants';
import { EventService } from './../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  providers: [EventService],
})
export class ViewEventComponent implements OnInit {
  loading: boolean = true;
  currentEvent!: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.eventService.getEventById(id ? id : '').then((event) => {
      if (event) this.currentEvent = event;
      else this.router.navigate([UrlConstants.home]);

      this.loading = false;
      console.log(this.currentEvent);
    });
  }

  ngOnInit(): void {}
}
