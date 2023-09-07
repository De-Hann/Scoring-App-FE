import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import { AppState, selectUserState } from 'src/app/store';
import { AuthStateModel } from 'src/app/store/models/auth.model';
import * as authActions from 'src/app/store/actions/auth.actions';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  signUpForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    numberOfPeople: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUserState)
      .pipe(take(1))
      .subscribe({
        next: (store) => {
          if (store !== null) {
            this.router.navigate([UrlConstants.home]);
          }
        },
      });
  }

  navigateToLogin() {
    this.router.navigate([UrlConstants.login]);
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.bookingService
        .signup(
          this.signUpForm.get('username')?.value!,
          this.signUpForm.get('password')?.value!,
          this.signUpForm.get('email')?.value!,
          +this.signUpForm.get('numberOfPeople')?.value!
        )
        .subscribe({
          next: (res: any) => {
            this.authService
              .login(
                this.signUpForm.get('username')?.value!,
                this.signUpForm.get('password')?.value!
              )
              .subscribe({
                next: (res: any) => {
                  const auth: AuthStateModel = {
                    id: res.id,
                    userName: res.username,
                    token: res.token,
                    userType: res.userType,
                  };

                  this.store.dispatch(authActions.login({ auth }));

                  if (auth.userType === 1 || auth.userType === 2)
                    this.router.navigate([UrlConstants.home]);
                  else if (auth.userType === 3)
                    this.router.navigate([UrlConstants.qrScanner]);
                  else if (auth.userType === 0)
                    this.router.navigate([UrlConstants.qrViewer]);
                },
                error: (err) => {
                  if (err.status === 400) {
                    this.toastService.addToast(
                      ToastType.error,
                      'Could not sign you in automatically'
                    );
                    this.navigateToLogin();
                  }
                },
              });
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastService.addToast(
                ToastType.error,
                'Error trying to sign you up. Please try again later'
              );
            }
          },
        });
    }
  }
}
