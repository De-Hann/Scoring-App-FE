import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { BookingService } from 'src/app/service/booking.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-qr-viewer',
  templateUrl: './qr-viewer.component.html',
  styleUrls: ['./qr-viewer.component.scss'],
})
export class QrViewerComponent implements OnInit {
  private userId!: string;
  public qrData!: string;

  public loading: boolean = true;

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((store) => {
        this.userId = store?.id;

        this.bookingService.getQrCode(this.userId).subscribe((res: any) => {
          this.qrData = res.img;
          this.loading = false;
        });
      });
  }

  logout() {
    this.router.navigate([UrlConstants.logout]);
  }
}
