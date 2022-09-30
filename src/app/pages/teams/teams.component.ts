import { UrlConstants } from './../../constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import { ScoreService } from 'src/app/service/score.service';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Score, UpdateScoreRequest } from 'src/app/models/score';
import { TeamScores } from 'src/app/models/teamScores';
import * as teamActions from '../../store/actions/team.actions';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  userId!: string;
  loading: boolean = true;
  currentActivity!: Activity;
  teamScores: TeamScores[] = [];
  newScores: { teamId: string; score: number }[] = [];
  backUrl!: string;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private teamService: TeamService,
    private scoreService: ScoreService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((store) => {
        if (store) {
          this.userId = store.id;
        } else {
          this.toastService.addToast(ToastType.error, 'Something went wrong');
          this.router.navigate([UrlConstants.home]);
        }

        if (id) {
          this.isAdmin = store?.userType === 1;

          this.activityService.getActivityById(id).subscribe((activity) => {
            if (activity) {
              this.currentActivity = activity;

              this.backUrl = UrlConstants.home;

              this.teamService
                .getTeamScoresByActivity(this.userId, activity.id)
                .subscribe({
                  next: (teamData) => {
                    if (teamData) {
                      this.teamScores = teamData;
                    }
                    this.loading = false;
                  },
                  error: () => {
                    this.loading = false;
                  },
                });
            } else {
              this.router.navigate([UrlConstants.home]);
            }
          });
        } else {
          this.toastService.addToast(ToastType.error, 'Something went wrong');
          this.router.navigate([UrlConstants.home]);
        }
      });
  }

  ngOnInit(): void {}

  scoreTeam($event: any) {
    this.router.navigate([UrlConstants.score_team + '/' + $event]);
  }

  // updateScores() {
  //   const models: UpdateScoreRequest[] = [];

  //   this.newScores.forEach((score) => {
  //     models.push({
  //       userId: this.userId,
  //       teamId: score.teamId,
  //       score: score.score,
  //     });
  //   });

  //   this.scoreService
  //     .updateScores(models)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (res) => {
  //         this.toastService.addToast(
  //           ToastType.success,
  //           'Scores successfully updated'
  //         );

  //         this.newScores.forEach((score) => {
  //           const index = this.teamScores.findIndex(
  //             (x) => x.team.id === score.teamId
  //           );

  //           if (index > -1) {
  //             if (this.teamScores[index].myScore !== 0) {
  //               this.teamScores[index].score -=
  //                 this.teamScores[index].myScore - score.score;
  //               this.teamScores[index].myScore = score.score;
  //             } else {
  //               this.teamScores[index].maxScore += 10;
  //               this.teamScores[index].score += score.score;
  //               this.teamScores[index].myScore = score.score;
  //             }
  //           }
  //         });

  //         this.clear();
  //       },
  //       error: () => {
  //         this.toastService.addToast(ToastType.error, 'Could not update score');
  //       },
  //     });
  // }

  navigateToCreate() {
    this.router.navigate([
      UrlConstants.createTeam + '/' + this.currentActivity.id,
    ]);
  }

  navigateToCalc() {
    this.router.navigate([
      UrlConstants.calculate_scores + '/' + this.currentActivity.id,
    ]);
  }
}
