import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    TabViewModule,
    InputTextModule,
    TableModule,
    CardModule,
    ButtonModule,
    BreadcrumbModule,
    DividerModule,
    ToastModule,
    CalendarModule,
    SliderModule,
  ],
})
export class PrimeModule {}
