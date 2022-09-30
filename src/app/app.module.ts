import { MessageService } from 'primeng/api';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EventsComponent } from './pages/events/events.component';

import { PrimeModule } from './modules/prime.modules';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { TeamCardComponent } from './components/team/team-card/team-card.component';
import { SmallCardComponent } from './components/shared/small-card/small-card.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './providers/interceptor.providers';
import { metaReducers, reducers } from './store';
import { ToastService } from './service/toast.service';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { CreateActivityComponent } from './pages/create-activity/create-activity.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';
import { UpdateFooterComponent } from './components/team/update-footer/update-footer.component';
import { CalcScoreComponent } from './pages/calc-score/calc-score.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    SpinnerComponent,
    TeamsComponent,
    ViewEventComponent,
    NavigationComponent,
    BannerComponent,
    TeamCardComponent,
    SmallCardComponent,
    LoginComponent,
    LogoutComponent,
    CreateEventComponent,
    CreateActivityComponent,
    CreateTeamComponent,
    UpdateFooterComponent,
    CalcScoreComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    PrimeModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [httpInterceptorProviders, ToastService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
