import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url: string = environment.api + 'Booking/';
  constructor(private http: HttpClient) { }

  uploadQrCode(id: string) {
    const params = new HttpParams().set('id', id)
    return this.http.get(this.url + 'GetBooking', { params }).pipe(take(1));
  }
}
