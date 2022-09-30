import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-score-team',
  templateUrl: './score-team.component.html',
  styleUrls: ['./score-team.component.scss']
})
export class ScoreTeamComponent implements OnInit {

  backUrl: string = UrlConstants.viewActivity;
  activity: Team | undefined | null = null;
  // currentActivity: Activity = {}
  constructor(private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId') || "";
    this.teamService.getTeamById(teamId).pipe(take(1)).subscribe((activity) =>  {
      this.activity = activity;
    })

  }

}
