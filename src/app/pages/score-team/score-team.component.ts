import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { Category } from 'src/app/models/category';
import { UpdateScoreRequest } from 'src/app/models/score';
import { Team } from 'src/app/models/team';
import { CategoryService } from 'src/app/service/category.service';
import { ScoreService } from 'src/app/service/score.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-score-team',
  templateUrl: './score-team.component.html',
  styleUrls: ['./score-team.component.scss'],
})
export class ScoreTeamComponent implements OnInit {
  backUrl: string = UrlConstants.viewActivity;
  team: Team | undefined | null = null;
  categories!: any;
  needsSaving: boolean = false;
  dataToSave: any[] = [];
  userId: string | undefined | null = null;
  // currentActivity: Activity = {}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private categoryService: CategoryService,
    private scoreService: ScoreService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId') || '';

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((store) => {
        if (store) {
          this.userId = store.id;
          this.teamService
            .getTeamById(teamId)
            .pipe(take(1))
            .subscribe((team) => {
              this.team = team;
              this.categoryService
                .getCategoriesByTeamId(this.team.id, store.id)
                .pipe(take(1))
                .subscribe((data) => {
                  this.categories = data;
                  console.log(this.categories);
                });
            });
        } else {
          this.router.navigate([UrlConstants.home]);
        }
      });
  }

  starSelected(value: any) {
    this.needsSaving = value.value > 0;
    const exist = this.dataToSave.findIndex(
      (d: any) => d.catId === value.catId
    );
    if (exist > -1) {
      this.dataToSave[exist].value = value.value;
    } else {
      this.dataToSave.push(value);
    }
  }

  onClickSave() {
    this.needsSaving = false;
    const prepared: UpdateScoreRequest[] = Object.assign(
      this.dataToSave.map((d) => ({
        userId: this.userId,
        categoryId: d.catId,
        score: d.value,
      }))
    );

    this.scoreService.updateScores(prepared).subscribe((data) => {
      this.toastService.addToast(
        ToastType.success,
        'Score updated successfully'
      )
    }, (err) => {
      this.toastService.addToast(
        ToastType.error,
        'Something went wrong, couldnt update score'
      )
    });
  }
}
