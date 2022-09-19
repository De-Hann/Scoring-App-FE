import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
  private url: string = environment.api + 'Event/';
  constructor(private http: HttpClient) {}

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + 'GetAll').pipe(take(1));
  }

  public getEventById(id: string): Observable<Event | undefined> {
    return this.http
      .get<Event>(this.url + 'GetById', {
        params: new HttpParams().set('id', id),
      })
      .pipe(take(1));
  }
}
