import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateScoreRequest } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private url: string = environment.api + 'Score/';
  constructor(private http: HttpClient) {}

  public updateScores(models: UpdateScoreRequest[]) {
    return this.http.post(this.url + 'UpdateScores', [...models]).pipe(take(1));
  }
}
