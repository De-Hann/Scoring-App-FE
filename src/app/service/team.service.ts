import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private url: string = environment.api + 'Team/';

  constructor(private http: HttpClient) {}

  getTeamsByActivities(
    activityIds: string[]
  ): Observable<{ activityId: string; teams: Team[] }[]> {
    const params = new HttpParams();

    activityIds.forEach((x) => {
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
}
