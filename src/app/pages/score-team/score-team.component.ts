import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-score-team',
  templateUrl: './score-team.component.html',
  styleUrls: ['./score-team.component.scss']
})
export class ScoreTeamComponent implements OnInit {

  backUrl: string = UrlConstants.viewActivity;
  team: Team | undefined | null = null;
  categories: Category[] | undefined | null = null;
  needsSaving: boolean = false;
  dataToSave: any[] = [];
  userId: string | undefined | null = null;
  // currentActivity: Activity = {}
  constructor(
    private route: ActivatedRoute, 
    private teamService: TeamService, 
    private categoryService: CategoryService,
    private scoreService: ScoreService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId') || "";
    this.teamService.getTeamById(teamId).pipe(take(1)).subscribe((team) =>  {
      this.team = team;
      this.categoryService.getCategoriesByActivityId(this.team.activityId).pipe(take(1)).subscribe((data) =>  {
        this.categories = data;
        console.log(data)
      })
    });
    this.store.select('auth')
    .pipe(take(1))
    .subscribe((store) => {
      if (store) {
        this.userId = store.id;
      }
    })
  }

  starSelected(value: any) {
    this.needsSaving = value.value > 0;
    const exist = this.dataToSave.findIndex((d:any)=> d.catId === value.catId);
    if (exist > -1) {
      this.dataToSave[exist].value = value.value;
    } else {
      this.dataToSave.push(value);
    }
  }

  onClickSave() {
    this.needsSaving = false;
    const prepared: UpdateScoreRequest[] = Object.assign(this.dataToSave.map ( d => ({
        userId: this.userId,
        categoryId: d.catId,
        score: d.value
    })));

    console.log(prepared);

     this.scoreService.updateScores(prepared).subscribe((data => {
      console.log("success");
     }));
  }

}
