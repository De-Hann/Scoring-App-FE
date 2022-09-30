import { LoginComponent } from './pages/login/login.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { UrlConstants } from './constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './service/auth.guard';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { CalcScoreComponent } from './pages/calc-score/calc-score.component';

const routes: Routes = [
  {
    path: UrlConstants.home,
    canActivate: [AuthGuard],
    component: ViewEventComponent,
  },
  {
    path: UrlConstants.createActivty + '/:eventId',
    canActivate: [AuthGuard],
    component: CreateActivityComponent,
  },
  {
    path: UrlConstants.editActivty + '/:eventId/:activityId',
    canActivate: [AuthGuard],
    component: CreateActivityComponent,
  },
  {
    path: UrlConstants.createTeam + '/:activityId',
    canActivate: [AuthGuard],
    component: CreateTeamComponent,
  },
  {
    path: UrlConstants.calculate_scores + '/:activityId',
    canActivate: [AuthGuard],
    component: CalcScoreComponent,
  },
  {
    path: UrlConstants.editTeam + '/:activityId/:teamId',
    canActivate: [AuthGuard],
    component: CreateTeamComponent,
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
