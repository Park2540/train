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
export class problemlis{
  id:number
  name: string;
}
// ส่วนของการแสดง
export class problemlist{
  id:number;
  name: string;
}
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

// ...........เป็นการเรียกใช้tableในprimeng..........
export class ChartsComponent implements OnInit { 

  displayedColumns: string[] = ['name','delete','detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalupdate') modalupdate: ElementRef;
  @ViewChild('modaldelete') modaldelete: ElementRef;
  @ViewChild(MatSort) sort !: MatSort;
  problemlis: problemlis = new problemlis();
  dataSource = new MatTableDataSource<problemlist>()
  
  problemlisform: FormGroup;
  updateproblemlis: FormGroup;
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
    this. problemlisform =this.Us.group({
      name : ['',Validators.required],
  
    });
    this.updateproblemlis =this.action.group({
      name : ['',Validators.required],
    });
   
    this.getListproblem()
    // this.getSystems()
    
  }

  onSubmit(){
    if (this.problemlisform.valid){
      this.SettingService.createNewproblem(this.problemlisform.value).subscribe((res:any) => {
        console.log(this.problemlisform.value);
        console.log(res);
        this.getListproblem()
        this.comfirms()
        this.closeDialog()
        this.problemlisform.reset(); 
      })
      
    }
  }
  onSubmitUpdate(){
   
    if (this.updateproblemlis.valid){
      this.SettingService.updateUserlis(this.problemlis.id,this.updateproblemlis.value).subscribe((res:any) => {
        console.log(this.updateproblemlis.value);
        console.log(res);
        this.getListproblem()
        this.comfirms()
        this.closeDialog()
        
      })
      
    }
    
  }
  onSubmitdelete(){
    console.log('hello');
      this.SettingService.deleteproblem(this.problemlis.id).subscribe((res:any) => {
        this.getListproblem()
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
    this.problemlisform.controls['name'].setValue(code.name)
    this.problemlis.id = code.id;
    this.problemlis.name = code.name;
    
    
    this.modalService.open(this.modalupdate, {
    size: 'lg'
  });}
  OpenDialogdelete(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.problemlisform.controls['name'].setValue(code.name)
    this.problemlis.id = code.id;
    this.problemlis.name = code.name;
    
    this.modalService.open(this.modaldelete, {
    size: 'lg'}
    );
    
}
closeDialog(){
  this.modalService.dismissAll();

}
getListproblem(){
    this.SettingService.getListproblem().subscribe((data:any ) => {
      console.log(data);
      var newdata:problemlis[] = data;
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
