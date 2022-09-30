import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { Category } from 'src/app/models/category';
import { Team } from 'src/app/models/team';
import { CategoryService } from 'src/app/service/category.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-score-team',
  templateUrl: './score-team.component.html',
  styleUrls: ['./score-team.component.scss']
})
export class ScoreTeamComponent implements OnInit {

  backUrl: string = UrlConstants.viewActivity;
  team: Team | undefined | null = null;
  categories: Category[] | undefined | null = null;
  // currentActivity: Activity = {}
  constructor(private route: ActivatedRoute, private teamService: TeamService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId') || "";
    this.teamService.getTeamById(teamId).pipe(take(1)).subscribe((team) =>  {
      this.team = team;
      this.categoryService.getCategoriesByActivityId(this.team.activityId).pipe(take(1)).subscribe((data) =>  {
        this.categories = data;
      })
    });
  }

}
