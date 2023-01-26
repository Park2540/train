import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { MatPaginator } from '@angular/material/paginator';
 import { NgForm,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SettingService } from 'src/app/servics/setting/setting.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import {MultiSelectModule} from 'primeng/multiselect';

interface System {
  id: number;
  name: string
}
// ส่วนของแบบฟรอมส่ง
export class Userlis{
  id:number
  name: string;
  nickname: string;
  systems: string[]=[];

}
// ส่วนของการแสดง
export class userlist{
  id:number;
  name: string;
  nickname: string;
  systems : string[];
  listsystems:string[];
  // systems:string[];
}
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

// ...........เป็นการเรียกใช้tableในprimeng..........
export class ListsComponent implements OnInit { 

  displayedColumns: string[] = ['name', 'nickname','listsystems','delete','detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalupdate') modalupdate: ElementRef;
  @ViewChild('modaldelete') modaldelete: ElementRef;
  @ViewChild(MatSort) sort !: MatSort;
  Userlis: Userlis = new Userlis();
  dataSource = new MatTableDataSource<userlist>()
  
  userlisform: FormGroup;
  updateuserlisform: FormGroup;
  systems: System[] = []
  private modalRef: NgbModalRef;
  
  constructor(
    private action: FormBuilder,
    private Us: FormBuilder,
    private actrouter: ActivatedRoute,
    private router: Router,
    private SettingService: SettingService,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef,
    // private dialogRef: MatDialogRef<OpenDialogdelete>
    ) { }
    
  ngOnInit(): void {
    this. userlisform =this.Us.group({
      name : ['',Validators.required],
      nickname : ['',Validators.required],
      systems : ['',Validators.required],
  
    });
    this.updateuserlisform =this.action.group({
      name : ['',Validators.required],
      nickname : ['',Validators.required],
      systems : ['',Validators.required],
    });
   
    this.getListUser()
    this.getSystems()
    
  }

  onSubmit(){
    if (this.userlisform.valid){
      this.SettingService.createNewUserlis(this.userlisform.value).subscribe((res:any) => {
        console.log(this.userlisform.value);
        console.log(res);
        this.getListUser()
        this.comfirms()
        this.closeDialog()
        this.userlisform.reset(); 
      })
      
    }
  }
  onSubmitUpdate(){
   
    if (this.updateuserlisform.valid){
      this.SettingService.updateUserlis(this.Userlis.id,this.updateuserlisform.value).subscribe((res:any) => {
        console.log(this.updateuserlisform.value);
        console.log(res);
        this.getListUser()
        this.comfirms()
        this.closeDialog()
        
      })
      
    }
    
  }
  onSubmitdelete(){
    console.log('hello');
      this.SettingService.deleteUserlis(this.Userlis.id).subscribe((res:any) => {
        this.getListUser()
        this.comfirms()
        this.closeDialog()
        
      })
  }
  
  OpenDialog(enteranimation: any, exitanimation: any,code:any) {
    console.log('open modal')
    this.modalService.open(this.modal, {
    size: 'lg'
  }
  
  );
  }
  OpenDialogupdate(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.userlisform.controls['name'].setValue(code.name)
    this.Userlis.id = code.id;
    this.Userlis.name = code.name;
    this.Userlis.nickname = code.nickname;
    this.Userlis.systems = code.systems;
    
    this.modalService.open(this.modalupdate, {
    size: 'lg'
  });}
  OpenDialogdelete(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.userlisform.controls['name'].setValue(code.name)
    this.Userlis.id = code.id;
    this.Userlis.name = code.name;
    this.Userlis.nickname = code.nickname;
    this.Userlis.systems = code.systems;
    
    this.modalService.open(this.modaldelete, {
    size: 'lg'}
    );
    
}
closeDialog(){
  this.modalService.dismissAll();

}
  getListUser(){
    this.SettingService.getListUser().subscribe((data:any ) => {
      console.log(data);
      var newdata:userlist[] = data;
      console.log(newdata);
      this.dataSource.data = newdata;
      this.changeDetectorRefs.detectChanges()
    })

  }
  getSystems() {
    this.SettingService.getListSystem().subscribe((res: any)=> {
      this.systems = res
      console.log(this.systems)
      this.changeDetectorRefs.detectChanges()
    })
  }
  comfirms(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'บันทึกรายการสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}



