import { UrlConstants } from './../../constants';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as authActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(authActions.logout());
    this.router.navigate([UrlConstants.login]);
  }
}
