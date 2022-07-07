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

@NgModule({
  declarations: [AppComponent, EventsComponent, SpinnerComponent, TeamsComponent, ViewEventComponent, NavigationComponent, BannerComponent, TeamCardComponent, SmallCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    PrimeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
