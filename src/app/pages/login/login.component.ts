import { ToastService, ToastType } from './../../service/toast.service';
import { UrlConstants } from './../../constants';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthStateModel } from 'src/app/store/models/auth.model';
import { AppState, selectUserState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as authActions from '../../store/actions/auth.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
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

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.get('username')?.value!,
          this.loginForm.get('password')?.value!
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);

            const auth: AuthStateModel = {
              id: res.id,
              userName: res.username,
              token: res.token,
            };

            this.store.dispatch(authActions.login({ auth }));

            this.router.navigate([UrlConstants.home]);
          },
          error: (err) => {
            if (err.status === 400) {
              this.toastService.addToast(
                ToastType.error,
                'Entered credentials are incorrect. Please try again',
                'Invalid Credentials'
              );
            }
          },
        });
    }
  }
}
