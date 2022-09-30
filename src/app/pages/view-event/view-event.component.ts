import { TeamService } from './../../service/team.service';
import { ActivityService } from './../../service/activity.service';
import { UrlConstants } from './../../constants';
import { EventService } from './../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Activity } from 'src/app/models/activity';
import { Team } from 'src/app/models/team';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  providers: [EventService, ToastService],
})
export class ViewEventComponent implements OnInit {
  loading: boolean = true;
  currentEvent!: Event;
  activities: Activity[] = [];
  teamData: { activityId: string; teams: Team[] }[] = [];
  backUrl!: string;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private activityService: ActivityService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.backUrl = UrlConstants.home;

      this.store
        .select('auth')
        .pipe(take(1))
        .subscribe((store) => {
          this.isAdmin = store?.userType === 1;

          this.eventService.getEventById(id).subscribe({
            next: (event) => {
              if (event) {
                this.currentEvent = event;
                this.activityService
                  .getActivities(event.id)
                  .subscribe((activities) => {
                    this.activities = activities;

                    const ids: string[] = [];
                    activities.forEach((activity) => {
                      ids.push(activity.id);
                    });

                    if (this.activities.length > 0) {
                      this.teamService.getTeamsByActivities(ids).subscribe({
                        next: (res) => {
                          if (this.teamData.length > 0) {
                            this.teamData = res;
                          }

                          this.loading = false;
                        },
                        error: () => {
                          this.loading = false;
                        },
                      });
                    } else {
                      this.loading = false;
                    }
                  });
              } else this.router.navigate([UrlConstants.home]);
            },
          });
        });
    } else {
      this.toastService.addToast(ToastType.error, 'Something went wrong');
      this.router.navigate([UrlConstants.home]);
    }
  }

  ngOnInit(): void {}

  navigateToActivity(id: string) {
    this.router.navigate([UrlConstants.viewActivity + '/' + id]);
  }

  editActivity(id: string) {
    this.router.navigate([
      UrlConstants.editActivty + '/' + this.currentEvent.id + '/' + id,
    ]);
  }

  navigateToCreate() {
    this.router.navigate([
      UrlConstants.createActivty + '/' + this.currentEvent.id,
    ]);
  }
}
