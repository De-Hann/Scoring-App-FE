import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Activity, CreateActivity } from '../models/activity';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private url: string = environment.api + 'Activity/';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url + 'GetAll').pipe(take(1));
  }

  public getActivityById(id: string): Observable<Activity> {
    return this.http
      .get<Activity>(this.url + 'getActivityById', {
        params: new HttpParams().set('id', id),
      })
      .pipe(take(1));
  }

  public getActivityByEventId(id: string): Observable<Activity[]> {
    return this.http
      .get<Activity[]>(this.url + 'GetByEventId', {
        params: new HttpParams().set('eventId', id),
      });
  }

  public createActivity(model: CreateActivity): Observable<Activity> {
    return this.http.post<Activity>(this.url + 'Create', {
      ...model,
    });
  }
}
