import { Component, ViewChild,OnInit,OnChanges,ChangeDetectorRef,ElementRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import{DetailsService} from 'src/app/servics/details/details.service'
// import { Customer } from './customer';
// import { CustomerService } from './customerservice';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-account',
  styleUrls: ['./style-account.css'],
  templateUrl: './account.component.html',
})

export class AccountComponent implements  OnInit {
  urlCopy=0;
  // name = "Angular " + VERSION.major;
  constructor(private DetailsService: DetailsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private route:Router){}
  displayedColumns: string[] = ['id', 'systems', 'levels', 'problem', 'time','status','link','detail'];

  pagination: pagination = {
    limit: 10,
    page: 1,
    pages: 0,
    total_row: 0
  };
   keyword:string=''
   word:string=''
  @ViewChild("PeriodicElement") PeriodicElement: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageItems: Array<number> = [];
  
  dataSource = new MatTableDataSource<PeriodicElement>()
  ngOnInit(){
    this.getproblemdetails()
  }

  setPage(pagination:any) {
    this.pageItems = this.getPages(
      pagination.page,
      pagination.pages
    );
  }
  selectPage(event:any) {
    console.log(event);
    this.pagination.page = event;
    this.getproblemdetails();
  }
  
  // ส่วนที่ใช้ในการเรียกใช้ gttpages เพื่อจำกัดข้อมูลการแสดงใหน้าการแสดง
  getPages(pCurrent:any, count:any): number[] {
    const totalPage = count;
    const pageCurrent = pCurrent;
    const pagesToShow = 5;
    const pages: number[] = [];
    pages.push(pageCurrent);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPage) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
  addkeyword(){
    this.keyword=this.word
    this.getproblemdetails()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.word=filterValue
    this.getproblemdetails()
    
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getproblemdetailbyid(id:any){
    // console.log(this.PeriodicElement.nativeElement.value);
    console.log(id);
    this.route.navigate(['/crafted/account/',id])
  }
  // resetValue() {
  

  //   this.PeriodicElement.nativeElement.value = "";

  // }
  followdetail(id:any){
    this.route.navigate(['/followdetail/',id])
  }

  getproblemdetails(){
    this.DetailsService.getproblemdetails(this.pagination,this.keyword).subscribe((data:any ) => {
      console.log(data);
      
      this.pagination = data.pageination;
      this.setPage(data.pageination);
 
      
      var newdata:PeriodicElement[] = data.problemrecord;
      this.dataSource.data = newdata;
      this.changeDetectorRefs.detectChanges()
      // this.dataSource.paginator = this.paginator;
    })

  }
  

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  Copy(id:any) {
    var dummy = document.createElement('input'),
    text = window.origin + '/followdetail/' + id;
    document.body.appendChild(dummy);
    dummy.value = text ;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    // this.urlCopy!=null
    this.copycomfirms()
   
}
copycomfirms(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'คัดลอกสำเร็จ',
    showConfirmButton: false,
    timer: 1500
  })
  
}

}
export interface PeriodicElement {
  id: string;
  name: string;
  systems:string[];
  levels:string[];
  problem:string;
  created_at:string;
  status:string;
  link:string;

}
export interface pagination {
  page: number;
  limit: number;
  pages: number;
  total_row: number;
}


