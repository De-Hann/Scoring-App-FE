import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

@NgModule({
  exports: [
    ProgressSpinnerModule,
    TabViewModule,
    TableModule,
    CardModule,
    ButtonModule,
    BreadcrumbModule,
    DividerModule,
  ],
})
export class PrimeModule {}
