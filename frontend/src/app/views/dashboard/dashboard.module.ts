import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ReactiveFormsModule } from '@angular/forms';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    ModalModule.forRoot(),
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
