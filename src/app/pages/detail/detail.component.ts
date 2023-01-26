import { Component, OnInit,ChangeDetectorRef,VERSION, ViewChild, ElementRef } from '@angular/core';
import{DetailsService} from 'src/app/servics/details/details.service'
import { NgForm,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router,ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailReportComponent implements OnInit {
  forwardcomfirm=0;
  finishcomfirm=0;
  URL=environment.apiUrl
  operators:operators[]=[]
  users:users[]=[]
  id = 0;
  urlCopy=0;
  part=''
  detail: any;
  
  updetproblemDataform: FormGroup;
  finishproblemDataform: FormGroup;
  updetproblem: updetproblem = new updetproblem();
  finishproblem: finishproblem = new finishproblem();
  forwardDiv = false;
  finishDIV=false;
  casuseproblemV=false;
  // PeriodicElement: PeriodicElement[];
  // name = "Angular " + VERSION.major;
  // @ViewChild("PeriodicElement") PeriodicElement: ElementRef;
  constructor(
    private action: FormBuilder,
    private finishs:FormBuilder,

    private actrouter: ActivatedRoute,
    private DetailsService: DetailsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private route:ActivatedRoute,
    private routes:Router
    ) { }
    
  dataSource = new MatTableDataSource<PeriodicElement>()
  displayedColumns: string[] = ['detail'];
  ngOnInit(): void {
    this.updetproblemDataform =this.action.group({
      operator : ['',Validators.required],
    });
    this.finishproblemDataform =this.finishs.group({
      casuseproblem : ['',Validators.required],
      solution : ['',Validators.required],
      suggestion : ['',Validators.required],
    });
    this.getproblemrecords()
    this.getoperators()
    this.getUser()
 
 }
 getproblemrecords(){
  this.route.params.subscribe((param:any) => {
    console.log(param);
    this.id = param.id;
    this.DetailsService.getproblemrecords(param.id).subscribe((data:any ) => {
      console.log(data);
      // this.PeriodicElement=data.problemrecord;
      // this.pagination = data.pageination;
      // this.setPage(data.pageination);
      var newdata:PeriodicElement[] = data.problemrecord;
      this.detail = data.problemrecord[0]
      
      this.part= data.problemrecord[0].path_file
      this.dataSource.data = newdata;
      this.changeDetectorRefs.detectChanges()
      // this.dataSource.paginator = this.paginator;
    })
  })
  

}
Copy(id:any) {
  var dummy = document.createElement('input'),
  text = window.origin + '/followdetail/' + id;
  document.body.appendChild(dummy);
  dummy.value = text ;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  
  // var urlCopy=dummy.value
  // this.urlCopy!=null
  this.copycomfirms()
 
}
getoperators() {
  this.DetailsService.getListoperators().subscribe((res: any)=> {
    this.operators = res
    
    console.log(this.operators)
    this.changeDetectorRefs.detectChanges()
  })

}
getUser() {
  this.DetailsService.getListUser().subscribe((res: any)=> {
    this.users = res
    console.log(this.users)
    this.changeDetectorRefs.detectChanges()
  })
}
onSubmitUpdate(){
  if (this.updetproblemDataform.valid){
    this.DetailsService.updateproblemupdate(this.id,this.updetproblemDataform.value).subscribe((res:any) => {
      console.log(this.updetproblemDataform.value);
      console.log(res);
      this.forwardcomfirm=res
      this.forwardcomfirm !=null
      this.forwardcomfirms()
      this.updetproblemDataform.reset();
      this.getproblemrecords()
      // window.location.reload();
      this.forwardDiv = false;
    })
    
  }
  
}

onSubmitFinish() {
  if (this.finishproblemDataform.valid){
    this.DetailsService.finishproblemupdate(this.id,this.finishproblemDataform.value).subscribe((res:any) => {
      console.log(this.finishproblemDataform.value);
      console.log(res);
      this.finishcomfirm=res
      this.finishcomfirm !=null
      this.finishcomfirms()
      this.finishproblemDataform.reset();
      this.getproblemrecords()
      this.finishDIV =false;
      // window.location.reload();
    })
    
  }

}
// ฟังชันการส่งต่อปัญหา
forward(){
  this.forwardDiv = true;
}
cancelforward(){
  this.forwardDiv = false;
}
// ฟังชันเสร็จสิ้นปัญหา
finish(){
  this.finishDIV =true;
}
cancelfinsh(){
  this.finishDIV =false;
}
cancel(){
  // console.log(this.PeriodicElement.nativeElement.value);
  this.routes.navigate(['/crafted/account/'])
}
casuseproblemss(){
  this.casuseproblemV
}
forwardcomfirms(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'บันทึกรายการสำเร็จ',
    showConfirmButton: false,
    timer: 1500
  })

}
finishcomfirms(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'บันทึกรายการสำเร็จ',
    showConfirmButton: false,
    timer: 1500
  })
  
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
//  updatproblemrecords(){
//   this.updatproblemrecords()
//  }
    // this.getValue()
  // getValue() {
  //   console.log(this.PeriodicElement.nativeElement.value);
  // }
  // getproblemrecordbyid(id: string) {
  //   this.DetailsService.getproblemdetailsbyid(id).then(() => {
  //     console.log('empelado eliminado con exito');
  //     this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
  //       positionClass: 'toast-bottom-right'
  //     });
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }

}
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
interface operators{
  id:number;
  name:string
}
interface users{
  id:number;
  name:string
}
export class updetproblem{
  operator:string;
  
}

export class finishproblem{
  casuseproblem:string;
  solution:string;
  suggestion:string;


  
}