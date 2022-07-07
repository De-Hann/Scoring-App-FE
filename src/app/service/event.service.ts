import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  public getEvents(): Promise<Event[]> {
    return this.http
      .get<Event[]>('./../../assets/temp/event-large.json')
      .toPromise()
      .then((res) => {
        return res;
      })
      .then((data) => {
        return data;
      });
  }

  public getEventById(id: string): Promise<Event | undefined> {
    return this.http
      .get<Event[]>('./../../assets/temp/event-large.json')
      .toPromise()
      .then((res) => {
        return res.find((e) => e.id === id);
      })
      .then((data) => {
        return data;
      });
  }
}
