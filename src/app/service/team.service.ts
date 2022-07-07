import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamsByActivities(
    activityIds: string[]
  ): Promise<{ activityId: string; teams: Team[] }[]> {
    return this.http
      .get<Team[]>('../../assets/temp/teams.json')
      .toPromise()
      .then((res) => {
        const teams: { activityId: string; teams: Team[] }[] = [];

        activityIds.forEach((id) => {
          const teamById: Team[] = [];

          res.forEach((t) => {
            if (t.activityId === id) teamById.push(t);
          });

          teams.push({ activityId: id, teams: teamById });
        });

        return teams;
      })
      .then((data) => data);
  }
}
