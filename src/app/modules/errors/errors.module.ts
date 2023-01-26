import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TimelineModule} from 'primeng/timeline'
import {  MatButtonModule } from '@angular/material/button'
import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from '../errors/errors.component';
import { detailcomponent } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';


@NgModule({
  declarations: [
    ErrorsComponent,
    detailcomponent,
    Error500Component
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    TableModule,
    ButtonModule,
    MatButtonModule,
    MatTableModule,
    TimelineModule
  ]
})
export class ErrorsModule { }
