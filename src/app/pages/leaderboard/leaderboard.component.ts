import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/constants';
import { Activity } from 'src/app/models/activity';
import {ActivityService} from 'src/app/service/activity.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  backUrl: string = "";
  activities$: Observable<Activity[]> = new Observable<Activity[]>();
  constructor(private activityService: ActivityService) {
    this.backUrl = UrlConstants.home;
  }

  ngOnInit(): void {
    this.activities$ = this.activityService.getActivityByEventId("5de2619e-7808-4935-9853-56d1adb0d8b2");
  }

}
