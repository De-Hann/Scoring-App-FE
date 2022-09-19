import { LoginComponent } from './pages/login/login.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { EventsComponent } from './pages/events/events.component';
import { UrlConstants } from './constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: UrlConstants.home,
    canActivate: [AuthGuard],
    component: EventsComponent,
  },
  {
    path: UrlConstants.viewEvent + '/:id',
    canActivate: [AuthGuard],
    component: ViewEventComponent,
  },
  {
    path: UrlConstants.viewActivity + '/:id',
    canActivate: [AuthGuard],
    component: TeamsComponent,
  },
  { path: UrlConstants.login, component: LoginComponent },
  { path: UrlConstants.logout, component: LogoutComponent },
  { path: '**', redirectTo: UrlConstants.home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
