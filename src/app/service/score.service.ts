import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LeaderBoardScore, UpdateScoreRequest } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private url: string = environment.api + 'Score/';
  constructor(private http: HttpClient) {}

  public updateScores(models: UpdateScoreRequest[]) {
    return this.http.post(this.url + 'UpdateScores', [...models]).pipe(take(1));
  }

  
  public getActivityScore(activityId: string): Observable<LeaderBoardScore[]> {
    return of([
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"Pork",id:"yy",score:4.3, teamName:"Samba"}),
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"Pork",id:"yy",score:6.3, teamName:"lado"}),
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"Pork",id:"yy",score:4.3, teamName: "boiler"}),
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"Pork",id:"yy",score:4.3, teamName: "griller"}),
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"chicken",id:"yy",score:4.3, teamName: "boiler"}),
      new LeaderBoardScore({activityId: "fdc35303-7102-486d-9584-d736f1b9bbfb",categoryName:"snake",id:"yy",score:4.3, teamName: "lado"}),
      new LeaderBoardScore({activityId: "39d3d21e-1011-416f-8044-2e17fa42b669",categoryName:"gin",id:"yy",score:4.3, teamName: "lado"}),
      new LeaderBoardScore({activityId: "39d3d21e-1011-416f-8044-2e17fa42b669",categoryName:"gin",id:"yy",score:4.3, teamName: "premium"}),
      new LeaderBoardScore({activityId: "39d3d21e-1011-416f-8044-2e17fa42b669",categoryName:"vodka",id:"yy",score:4.3, teamName: "lado"}),
      new LeaderBoardScore({activityId: "39d3d21e-1011-416f-8044-2e17fa42b669",categoryName:"snake",id:"yy",score:4.3, teamName: "pretties"}),
    ].filter(ld => ld.activityId === activityId))
  }
}
