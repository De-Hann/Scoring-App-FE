import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.api + 'Auth/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post(this.url + 'Login', {
        username,
        password,
      })
      .pipe(take(1));
  }
}
