import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { Activity } from 'src/app/models/activity';
import { LeaderBoardScore } from 'src/app/models/score';
import {ActivityService} from 'src/app/service/activity.service';
import { ScoreService } from 'src/app/service/score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  backUrl: string = "";
  activities: Activity[] = [];
  score$: Observable<LeaderBoardScore[]> | null | undefined = new Observable<LeaderBoardScore[]>();
  load: boolean = false;
  constructor(private activityService: ActivityService, private scoreService: ScoreService) {
    this.backUrl = UrlConstants.home;
  }

  ngOnInit(): void {
    this.load = true;
    this.activityService.getActivities().pipe(take(1)).subscribe((data: Activity[]) => {
      this.load = false;
      if (data.length > 0) {
        this.activities = data;
        this.getActvityScores(this.activities[0]);
      }
    });
  }

  getActvityScores(activity: Activity) {
    this.score$ = null;
    this.score$ = this.scoreService.getActivityLeaderBoard(activity.id);
  }

}
