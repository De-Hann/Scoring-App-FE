import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivities(eventId: string): Promise<Activity[]> {
    return this.http
      .get<Activity[]>('./../../assets/temp/activity.json')
      .toPromise()
      .then((res) => {
        const activities: Activity[] = [];
        res.forEach((x) => {
          if (x.eventId === eventId) activities.push(x);
        });
        return activities;
      })
      .then((data) => {
        return data;
      });
  }
}
