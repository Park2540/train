import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsExamplesRoutingModule } from './widgets-examples-routing.module';
import { WidgetsExamplesComponent } from './widgets-examples.component';
import { ListsComponent } from './lists/lists.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { MixedComponent } from './mixed/mixed.component';
import { TablesComponent } from './tables/tables.component';
import { FeedsComponent } from './feeds/feeds.component';
import { WidgetsModule } from '../../_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalpopupComponent } from './lists/modalpopup/modalpopup.component';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingService } from 'src/app/servics/setting/setting.service';
// import{userlist}from './lists/lists.component';
// import { CustomerService, ProductService } from './lists/customerservice'


// import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
// import { Component, QueryList, ViewChildren } from '@angular/core';
// import { Observable } from 'rxjs';

// // import { Country } from './country';
// // import { CountryService } from './country.service';
// // import { NgbdSortableHeader, SortEvent } from './sortable.directive';
// import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    WidgetsExamplesComponent,
    ListsComponent,
    StatisticsComponent,
    ChartsComponent,
    MixedComponent,
    TablesComponent,
    FeedsComponent,
    
    

  ],
  imports: [
    CommonModule, 
    WidgetsExamplesRoutingModule,
    FormsModule, 
    WidgetsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    MatTableModule,
    MatSortModule,
    TableModule,
    MatButtonModule,
    MatDialogModule
    
  ],
  providers: [
    SettingService
  ]
  ,
  entryComponents: [ 
    ModalpopupComponent,]
})
export class WidgetsExamplesModule {}
