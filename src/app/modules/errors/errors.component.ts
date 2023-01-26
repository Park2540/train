import { Component, HostBinding, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import{DetailsService} from 'src/app/servics/details/details.service'
import {MatTableDataSource} from '@angular/material/table';
import {PrimeIcons} from 'primeng/api';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./style.error.css'],
})
export class ErrorsComponent implements OnInit {
  URL=environment.apiUrl
  events: any[];
  detail: any;
  constructor(private router: Router,
    private DetailsService: DetailsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private route:ActivatedRoute
    ) {}
    dataSource = new MatTableDataSource<PeriodicElement>()
    displayedColumns: string[] = [ 'problemdetail','detail'];
  ngOnInit(): void {this.events = [
            {status: 'รับเรื่อง',    date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'ดำเนินการ', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'เสร็จสิ้น', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
           
        ];
    this.getproblemrecords()
  }
    
  
  getproblemrecords(){
    this.route.params.subscribe((param:any) => {
      console.log(param);
      this.DetailsService.getproblemrecords(param.id).subscribe((data:any ) => {
        console.log(data);
        this.detail = data.problemrecord[0]
        console.log(this.detail);
        
        var newdata:PeriodicElement[] = data.problemrecord;
        this.dataSource.data = newdata;
        this.changeDetectorRefs.detectChanges()
      })
    })
}}
export interface PeriodicElement {
  id: string;
  agency:string;
  informer:string;
  informermessage:string;
  problem:string;
  casuseproblem:string;
  solution:string;
  suggestion:string;
  operator:string;
  systems:string[];
  levels:string[];
  status:string[];
  contacts:string[];
  agencies:string[];
  problemtype:string[];
  operators:string[];
  created_at:string;
  sender_at:string;
  completed_at:string;
  timesla:string;

  path_file:string;
}