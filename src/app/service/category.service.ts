import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = environment.api + 'Category/';
  constructor(private http: HttpClient) {}

  public getCategoriesByTeamId(
    activityId: string,
    userId: string
  ): Observable<Category[]> {
    const params = new HttpParams().set('id', activityId).set('userId', userId);
    return this.http.get<Category[]>(this.url + 'GetCategoriesByTeamId', {
      params,
    });
  }
}
