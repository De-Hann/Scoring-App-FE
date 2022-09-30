import { HttpClient, HttpParams } from '@angular/common/http';
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

  
  public getActivityLeaderBoard(activityId: string): Observable<LeaderBoardScore[]> {
    const params = new HttpParams().set('activityId', activityId);
    return this.http.get<LeaderBoardScore[]>(this.url + 'GetLeaderBoard', { params });
  }
}
