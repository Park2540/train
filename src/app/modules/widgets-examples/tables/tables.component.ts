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
export class agencyslis{
  id:number
  name: string;
}
// ส่วนของการแสดง
export class agencyslist{
  id:number;
  name: string;
}
@Component({
  selector: 'app-statustics',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

// ...........เป็นการเรียกใช้tableในprimeng..........
export class TablesComponent implements OnInit { 

  displayedColumns: string[] = ['name','delete','detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalupdate') modalupdate: ElementRef;
  @ViewChild('modaldelete') modaldelete: ElementRef;
  @ViewChild(MatSort) sort !: MatSort;
  agencyslis: agencyslis = new agencyslis();
  dataSource = new MatTableDataSource<agencyslist>()
  
  agencyslisform: FormGroup;
  updateagencyslis: FormGroup;
  // systems: System[] = []
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
    this. agencyslisform =this.Us.group({
      name : ['',Validators.required],
  
    });
    this.updateagencyslis =this.action.group({
      name : ['',Validators.required],
    });
   
    this.getListagencys()
    // this.getSystems()
    
  }

  onSubmit(){
    if (this.agencyslisform.valid){
      this.SettingService.createNewagencys(this.agencyslisform.value).subscribe((res:any) => {
        console.log(this.agencyslisform.value);
        console.log(res);
        this.getListagencys()
        this.comfirms()
        this.closeDialog()
        this.agencyslisform.reset(); 
      })
      
    }
  }
  onSubmitUpdate(){
   
    if (this.updateagencyslis.valid){
      this.SettingService.updateUserlis(this.agencyslis.id,this.updateagencyslis.value).subscribe((res:any) => {
        console.log(this.updateagencyslis.value);
        console.log(res);
        this.getListagencys()
        this.comfirms()
        this.closeDialog()
        
      })
      
    }
    
  }
  onSubmitdelete(){
    console.log('hello');
      this.SettingService.deleteagencys(this.agencyslis.id).subscribe((res:any) => {
        this.getListagencys()
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
    this.agencyslisform.controls['name'].setValue(code.name)
    this.agencyslis.id = code.id;
    this.agencyslis.name = code.name;
    
    
    this.modalService.open(this.modalupdate, {
    size: 'lg'
  });}
  OpenDialogdelete(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.agencyslisform.controls['name'].setValue(code.name)
    this.agencyslis.id = code.id;
    this.agencyslis.name = code.name;
    
    this.modalService.open(this.modaldelete, {
    size: 'lg'}
    );
    
}
closeDialog(){
  this.modalService.dismissAll();

}
getListagencys(){
    this.SettingService.getListagencys().subscribe((data:any ) => {
      console.log(data);
      var newdata:agencyslis[] = data;
      console.log(newdata);
      this.dataSource.data = newdata;
      this.changeDetectorRefs.detectChanges()
    })

  }
  // getSystems() {
  //   this.SettingService.getListSystem().subscribe((res: any)=> {
  //     this.systems = res
  //     console.log(this.systems)
  //     this.changeDetectorRefs.detectChanges()
  //   })
  // }
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
