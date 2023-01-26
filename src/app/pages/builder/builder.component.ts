import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { FakeAPIService } from 'src/app/_fake';
import { LayoutService } from '../../_metronic/layout';
import {ApiInsertService} from 'src/app/servics/insertdata/insert.service'
import Swal from 'sweetalert2'
export class insertproblem{
  id:number;
  agency: string;
  contact: string;
  informer: string;
  informermessage: string;
  system: string;
  problemtype: string;
  level: string;
  problem: string;
  
}

interface System {
  id: number;
  name: string
}
interface users{
  id:number;
  name:string
}
interface problemtype{
  id:number;
  name:string
}
interface levels{
  id:number;
  name:string
}
interface agency{
  id:number;
  name:string
}
interface contact{
  id:number;
  name:string
}
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})

export class BuilderComponent implements OnInit {
  comfirms=0;
  file: File ;
  errormsg:any;
  successmsg:any;
  insertproblem: insertproblem = new insertproblem();
  insertproblemDataform: FormGroup;
  systems: System[] = []
  users:users[]=[]
  problemtype:problemtype[]=[]
  levels:levels[]=[]
  agency:agency[]=[]
  contact:contact[]=[]
  constructor(
    private fb: FormBuilder,
    private apiservice: ApiInsertService,
    private actrouter: ActivatedRoute,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ){}

  ngOnInit() {

  this.insertproblemDataform =this.fb.group({
    agency : ['',Validators.required],
    contact : ['',Validators.required],
    informer : ['',Validators.required],
    informermessage : ['',Validators.required],
    system : ['',Validators.required],
    problemtype : ['',Validators.required],
    level : ['',Validators.required],
    problem : ['',Validators.required],
    
  })
  

  this.getSystems()
  this.getUser()
  this.getProblem()
  this.getLevels()
  this.getAgencys()
  this.getContacts()
  }
  
comfirm(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'บันทึกรายการสำเร็จ',
    showConfirmButton: false,
    timer: 1500
  })
}
  getSystems() {
    this.apiservice.getListSystem().subscribe((res: any)=> {
      
      this.systems = res
      console.log(this.systems)
      this.changeDetectorRefs.detectChanges()
    })
  }
  getUser() {
    this.apiservice.getListUser().subscribe((res: any)=> {
      
      this.users = res
      console.log(this.users)
      this.changeDetectorRefs.detectChanges()
    })
  }
  getProblem() {
    this.apiservice.getListProblem().subscribe((res: any)=> {
      
      this.problemtype = res
      console.log(this.problemtype)
      this.changeDetectorRefs.detectChanges()
    })
  }
  getLevels() {
    this.apiservice.getListLevels().subscribe((res: any)=> {
      
      this.levels = res
      console.log(this.levels)
      this.changeDetectorRefs.detectChanges()
    })
  }
  getAgencys() {
    this.apiservice.getListAgencys().subscribe((res: any)=> {
      
      this.agency = res
      console.log(this.agency)
      this.changeDetectorRefs.detectChanges()
    })
  }
  getContacts() {
    this.apiservice.getListContacts().subscribe((res: any)=> {
      
      this.contact = res
      console.log(this.contact)
      this.changeDetectorRefs.detectChanges()
    })
  }
  fileupload(event:any){
    this.file = event.target.files[0];
    console.log("file",this.file)
  }


  onSubmit(){
    if (this.insertproblemDataform.valid){
      
      this.apiservice.createNewInsertproblem(this.insertproblemDataform.value,this.file).subscribe((res:any) => {
        console.log(this.insertproblemDataform.value,this.file);
        console.log(res);
        this.comfirms=res
        this.comfirms!=null
        this.comfirm()

        // this.res!=null
        this.insertproblemDataform.reset(); 
        // this.routes.navigate(['/crafted/account/'])
      })
        
    }
   
    else{
      this.errormsg="all field required"
    }
  }

}