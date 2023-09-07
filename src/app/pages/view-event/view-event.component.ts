import { TeamService } from './../../service/team.service';
import { ActivityService } from './../../service/activity.service';
import { UrlConstants } from './../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Team } from 'src/app/models/team';
import { ToastService } from 'src/app/service/toast.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  providers: [ToastService],
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
    private activityService: ActivityService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store<AppState>,
    private bookingService: BookingService
  ) {
    this.backUrl = UrlConstants.home;

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((store) => {
        this.isAdmin = store?.userType === 1;

        this.activityService.getActivities().subscribe((activities) => {
          this.activities = activities;

          const ids: string[] = [];
          activities.forEach((activity) => {
            ids.push(activity.id);
          });

          this.loading = false;
        });
      });
  }

  ngOnInit(): void {}

  navigateToActivity(id: string) {
    this.router.navigate([UrlConstants.viewActivity + '/' + id]);
  }

  editActivity(id: string) {
    this.router.navigate([UrlConstants.editActivty + '/' + id]);
  }

  navigateToCreate() {
    this.router.navigate([UrlConstants.createActivty]);
  }

  logout() {
    this.router.navigate([UrlConstants.logout]);
  }

  leaderboard() {
    this.router.navigate([UrlConstants.leaderboard]);
  }
}
