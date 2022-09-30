import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { Activity } from 'src/app/models/activity';
import { Event } from 'src/app/models/event';
import { TeamScores, TeamScoresNormalized } from 'src/app/models/teamScores';
import { ActivityService } from 'src/app/service/activity.service';
import { EventService } from 'src/app/service/event.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-calc-score',
  templateUrl: './calc-score.component.html',
  styleUrls: ['./calc-score.component.scss'],
  providers: [EventService],
})
export class CalcScoreComponent implements OnInit {
  userId!: string;
  loading: boolean = true;
  currentEvent!: Event;
  currentActivity!: Activity;
  teamScores: TeamScoresNormalized[] = [];
  newScores: { teamId: string; score: number }[] = [];
  backUrl!: string;
  isAdmin: boolean = false;
  scores: { placed: number; score: number; maxScore: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private activityService: ActivityService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {
    const id = this.route.snapshot.paramMap.get('activityId');

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

              this.eventService.getEventById(activity.eventId).subscribe({
                next: (event) => {
                  if (event) {
                    this.backUrl =
                      UrlConstants.viewActivity + '/' + activity.id;
                    this.currentEvent = event;

                    this.teamService
                      .getTeamScoresByActivity(this.userId, activity.id)
                      .subscribe({
                        next: (teamData: TeamScores[]) => {
                          if (teamData) {
                            let max = 0;

                            teamData.forEach((x) => {
                              if (x.maxScore > max) max = x.maxScore;
                            });

                            teamData.forEach((x) => {
                              this.teamScores.push({
                                team: x.team,
                                score: x.score,
                                maxScore: x.maxScore,
                                normalizedScore: this.normalize(
                                  x.score,
                                  max,
                                  0
                                ),
                              });
                            });

                            this.teamScores.sort((a, b): number => {
                              return a.normalizedScore === b.normalizedScore
                                ? 0
                                : a.normalizedScore > b.normalizedScore
                                ? -1
                                : 1;
                            });

                            let lastPlaced = 1;
                            this.teamScores.forEach((x, i) => {
                              if (i > 0) {
                                if (
                                  x.normalizedScore !== this.scores[i - 1].score
                                ) {
                                  lastPlaced++;
                                }
                                this.scores.push({
                                  placed: lastPlaced,
                                  score: x.normalizedScore,
                                  maxScore: x.maxScore,
                                });
                              } else {
                                this.scores.push({
                                  placed: lastPlaced,
                                  score: x.normalizedScore,
                                  maxScore: x.maxScore,
                                });
                              }
                            });
                          }
                          this.loading = false;
                        },
                        error: () => {
                          this.loading = false;
                        },
                      });
                  } else {
                    this.toastService.addToast(
                      ToastType.error,
                      'Something went wrong'
                    );
                    this.router.navigate([UrlConstants.home]);
                  }
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

  normalize(val: number, max: number, min: number) {
    return (val - min) / (max - min);
  }

  getScore(i: number): string {
    if (this.scores.length > 0 && this.scores[i].maxScore === 0)
      return 'Not Placed';

    if (i === 0 && this.scores.length > 1) {
      return this.scores[i].placed === this.scores[i + 1].placed
        ? 'Tied for #' + this.scores[i].placed
        : '#' + this.scores[i].placed;
    }

    if (i === this.scores.length - 1 && this.scores.length > 1) {
      return this.scores[i].placed === this.scores[i - 1].placed
        ? 'Tied for #' + this.scores[i].placed
        : '#' + this.scores[i].placed;
    }

    if (
      this.scores.length > 1 &&
      (this.scores[i].placed === this.scores[i + 1].placed ||
        this.scores[i].placed === this.scores[i - 1].placed)
    ) {
      return 'Tied for #' + this.scores[i].placed;
    }

    return '#' + this.scores[i].placed;
  }
}
