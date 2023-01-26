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
export class Contactlis{
  id:number
  name: string;
}
// ส่วนของการแสดง
export class Contactlist{
  id:number;
  name: string;
}
@Component({
  selector: 'app-statustics',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})

// ...........เป็นการเรียกใช้tableในprimeng..........
export class FeedsComponent implements OnInit { 

  displayedColumns: string[] = ['name','delete','detail'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('modalupdate') modalupdate: ElementRef;
  @ViewChild('modaldelete') modaldelete: ElementRef;
  @ViewChild(MatSort) sort !: MatSort;
  Contactlis: Contactlis = new Contactlis();
  dataSource = new MatTableDataSource<Contactlist>()
  
  Contactlisform: FormGroup;
  updateContactlism: FormGroup;
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
    this. Contactlisform =this.Us.group({
      name : ['',Validators.required],
  
    });
    this.updateContactlism =this.action.group({
      name : ['',Validators.required],
    });
   
    this.getListcontact()
    // this.getSystems()
    
  }

  onSubmit(){
    if (this.Contactlisform.valid){
      this.SettingService.createNewcontact(this.Contactlisform.value).subscribe((res:any) => {
        console.log(this.Contactlisform.value);
        console.log(res);
        this.getListcontact()
        this.comfirms()
        this.closeDialog()
        this.Contactlisform.reset(); 
      })
      
    }
  }
  onSubmitUpdate(){
   
    if (this.updateContactlism.valid){
      this.SettingService.updateUserlis(this.Contactlis.id,this.updateContactlism.value).subscribe((res:any) => {
        console.log(this.updateContactlism.value);
        console.log(res);
        this.getListcontact()
        this.comfirms()
        this.closeDialog()
        
      })
      
    }
    
  }
  onSubmitdelete(){
    console.log('hello');
      this.SettingService.deletecontact(this.Contactlis.id).subscribe((res:any) => {
        this.getListcontact()
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
    this.Contactlisform.controls['name'].setValue(code.name)
    this.Contactlis.id = code.id;
    this.Contactlis.name = code.name;
    
    
    this.modalService.open(this.modalupdate, {
    size: 'lg'
  });}
  OpenDialogdelete(enteranimation: any, exitanimation: any,code:any) {
    console.log(code)
    this.Contactlisform.controls['name'].setValue(code.name)
    this.Contactlis.id = code.id;
    this.Contactlis.name = code.name;
    
    this.modalService.open(this.modaldelete, {
    size: 'lg'}
    );
    
}
closeDialog(){
  this.modalService.dismissAll();

}
getListcontact(){
    this.SettingService.getListcontact().subscribe((data:any ) => {
      console.log(data);
      var newdata:Contactlis[] = data;
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
