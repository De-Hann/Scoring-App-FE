import { UrlConstants } from './../../constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { Team } from 'src/app/models/team';
import { ActivityService } from 'src/app/service/activity.service';
import { EventService } from 'src/app/service/event.service';
import { TeamService } from 'src/app/service/team.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [EventService],
})
export class TeamsComponent implements OnInit {
  loading: boolean = true;
  currentEvent!: Event;
  currentActivity!: Activity;
  teams: Team[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private activityService: ActivityService,
    private teamService: TeamService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.activityService.getActivityById(id ? id : '').subscribe((activity) => {
      if (activity) {
        this.currentActivity = activity;

        this.eventService.getEventById(activity.eventId).subscribe({
          next: (event) => {
            if (event) {
              this.currentEvent = event;

              this.teamService
                .getTeamsByActivities([activity.id])
                .subscribe((teamData) => {
                  if (teamData) {
                    this.teams = teamData[0].teams;

                    console.log(this.currentActivity);
                    console.log(this.currentEvent);
                    console.log(this.teams);

                    this.loading = false;
                  }
                });
            }
          },
        });
      } else {
        this.router.navigate([UrlConstants.home]);
      }
    });
  }

  ngOnInit(): void {}

  navigateToTeam(id: string) {
    console.log(id);
  }
}
