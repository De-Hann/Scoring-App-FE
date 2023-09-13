import { ScoreTeamComponent } from './pages/score-team/score-team.component';
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
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { Roles } from './models/roles';
import { QrViewerComponent } from './pages/qr-viewer/qr-viewer.component';
import { QrScannerComponent } from './pages/qr-scanner/qr-scanner.component';

const routes: Routes = [
  {
    path: UrlConstants.home,
    canActivate: [AuthGuard],
    data: {
      roles: [Roles.Judge, Roles.Admin],
    },
    component: ViewEventComponent,
  },
  {
    path: UrlConstants.qrViewer,
    canActivate: [AuthGuard],
    data: {
      roles: [Roles.General, Roles.Admin],
    },
    component: QrViewerComponent,
  },
  {
    path: UrlConstants.qrScanner,
    canActivate: [AuthGuard],
    data: {
      roles: [Roles.Maintainer, Roles.Admin],
    },
    component: QrScannerComponent,
  },
  {
    path: UrlConstants.leaderboard,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: LeaderboardComponent,
  },
  {
    path: UrlConstants.createActivty + '/:eventId',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: CreateActivityComponent,
  },
  {
    path: UrlConstants.editActivty + '/:eventId/:activityId',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: CreateActivityComponent,
  },
  {
    path: UrlConstants.createTeam + '/:activityId',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: CreateTeamComponent,
  },
  {
    path: UrlConstants.editTeam + '/:activityId/:teamId',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: CreateTeamComponent,
  },
  {
    path: UrlConstants.score_team + '/:teamId',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: ScoreTeamComponent,
  },
  {
    path: UrlConstants.viewActivity + '/:id',
    canActivate: [AuthGuard],
    data: { roles: [Roles.Judge, Roles.Admin] },
    component: TeamsComponent,
  },
  {
    path: UrlConstants.login,
    component: LoginComponent,
  },
  {
    path: UrlConstants.logout,
    component: LogoutComponent,
  },
  {
    path: UrlConstants.signup,
    component: SignupComponent,
  },
  { path: '**', redirectTo: UrlConstants.home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
