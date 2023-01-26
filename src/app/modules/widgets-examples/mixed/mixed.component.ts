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
export class Levellis{
  id:number
  name: string;
  time:string
}
// ส่วนของการแสดง
export class Levellist{
  id:number;
  name: string;
  time:string;
}
@Component({
  selector: 'app-statustics',
  templateUrl: './mixed.component.html',
  styleUrls: ['./mixed.component.css']
})

// ...........เป็นการเรียกใช้tableในprimeng..........
export class MixedComponent implements OnInit { 

  displayedColumns: string[] = ['name','time','delete','detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalupdate') modalupdate: ElementRef;
  @ViewChild('modaldelete') modaldelete: ElementRef;
  @ViewChild(MatSort) sort !: MatSort;
  Levellis: Levellis = new Levellis();
  dataSource = new MatTableDataSource<Levellist>()
  
  Levellisform: FormGroup;
  updateLevellis: FormGroup;
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
    this. Levellisform =this.Us.group({
      name : ['',Validators.required],
      time:['',Validators.required]
  
    });
    this.updateLevellis =this.action.group({
      name : ['',Validators.required],
      time:['',Validators.required]
    });
   
    this.getListlevel()
    // this.getSystems()
    
  }

  onSubmit(){
    if (this.Levellisform.valid){
      this.SettingService.createNewlevel(this.Levellisform.value).subscribe((res:any) => {
        console.log(this.Levellisform.value);
        console.log(res);
        this.getListlevel()
        this.comfirms()
        this.closeDialog()
        this.Levellisform.reset(); 
      })
      
    }
  }
  onSubmitUpdate(){
   
    if (this.updateLevellis.valid){
      this.SettingService.updatelevel(this.Levellis.id,this.updateLevellis.value).subscribe((res:any) => {
        console.log(this.updateLevellis.value);
        console.log(res);
        this.getListlevel()
        this.comfirms()
        this.closeDialog()
        
      })
      
    }
    
  }
  onSubmitdelete(){
    console.log('hello');
      this.SettingService.deletelevel(this.Levellis.id).subscribe((res:any) => {
        this.getListlevel()
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
    this.Levellisform.controls['name'].setValue(code.name)
    this.Levellis.id = code.id;
    this.Levellis.name = code.name;
    
    
    this.modalService.open(this.modalupdate, {
    size: 'lg'
  });}
  OpenDialogdelete(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.Levellisform.controls['name'].setValue(code.name)
    this.Levellis.id = code.id;
    this.Levellis.name = code.name;
    
    this.modalService.open(this.modaldelete, {
    size: 'lg'}
    );
    
}
closeDialog(){
  this.modalService.dismissAll();

}
getListlevel(){
    this.SettingService.getListlevel().subscribe((data:any ) => {
      console.log(data);
      var newdata:Levellis[] = data;
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
