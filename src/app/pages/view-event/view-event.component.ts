import { TeamService } from './../../service/team.service';
import { ActivityService } from './../../service/activity.service';
import { UrlConstants } from './../../constants';
import { EventService } from './../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Activity } from 'src/app/models/activity';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  providers: [EventService],
})
export class ViewEventComponent implements OnInit {
  loading: boolean = true;
  currentEvent!: Event;
  activities: Activity[] = [];
  teamData: { activityId: string; teams: Team[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private activityService: ActivityService,
    private teamService: TeamService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.eventService.getEventById(id ? id : '').then((event) => {
      if (event) {
        this.currentEvent = event;
        this.activityService.getActivities(event.id).then((activities) => {
          this.activities = activities;

          const ids: string[] = [];
          activities.forEach((activity) => {
            ids.push(activity.id);
          });

          this.teamService.getTeamsByActivities(ids).then((res) => {
            this.teamData = res;

            this.loading = false;
          });
        });
      } else this.router.navigate([UrlConstants.home]);
    });
  }

  ngOnInit(): void {}

  navigateToActivity(id: string) {
    console.log(id);
    this.router.navigate([UrlConstants.viewActivity + '/' + id]);
  }
}
