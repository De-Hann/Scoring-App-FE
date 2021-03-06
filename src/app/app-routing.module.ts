import { ViewEventComponent } from './pages/view-event/view-event.component';
import { EventsComponent } from './pages/events/events.component';
import { UrlConstants } from './constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: UrlConstants.home, component: EventsComponent },
  { path: UrlConstants.viewEvent + '/:id', component: ViewEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
