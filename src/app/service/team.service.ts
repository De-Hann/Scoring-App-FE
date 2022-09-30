import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeam, Team } from '../models/team';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamScores } from '../models/teamScores';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url: string = environment.api + 'Team/';

  constructor(private http: HttpClient) {}

  getTeamsByActivities(
    activityIds: string[]
  ): Observable<{ activityId: string; teams: Team[] }[]> {
    const params = new HttpParams().set('activityIds', activityIds[0]);

    activityIds.slice(1).forEach((x) => {
      params.append('activityIds', x);
    });

    return this.http
      .get<{ activityId: string; teams: Team[] }[]>(
        this.url + 'GetByActivityIds',
        {
          params: params,
        }
      )
      .pipe(take(1));
  }

  getTeamScoresByActivity(
    userId: string,
    activityId: string
  ): Observable<TeamScores[]> {
    return this.http
      .get<TeamScores[]>(this.url + 'GetTeamScoreByActivity', {
        params: new HttpParams()
          .set('activityId', activityId)
          .set('userId', userId),
      })
      .pipe(take(1));
  }

  getTeamById(teamId: string): Observable<Team> {
    const params = new HttpParams().set('Id', teamId);

    return this.http
      .get<Team>(this.url + 'GetTeamById', {
        params: params,
      })
      .pipe(take(1));
  }

  public createTeam(model: CreateTeam): Observable<Team> {
    return this.http.post<Team>(this.url + 'Create', {
      ...model,
    });
  }
}
