import { } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//  import { ModalpopupComponent } from './modalpopup/modalpopup.component'
import {ListsComponent} from './lists.component'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule } from '@angular/material/paginator';

import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SettingService} from 'src/app/servics/setting/setting.service'
// import { ProductService } from './customerservice';
// import {Product} from './customer';
// import { MatDialogModule } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    ListsComponent,
  ],
  imports: [
    CommonModule,
    NgModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TableModule,
    ButtonModule,
    
],
providers: [SettingService],
bootstrap: [ListsComponent]
})
export class ListsModule {}
