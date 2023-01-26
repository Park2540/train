
import { Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm,FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { FakeAPIService } from 'src/app/_fake';
import {SettingService} from 'src/app/servics/setting/setting.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from 'src/app/_metronic/partials';

export class Userlis{
  name: string;
  nickname: string;
  systems: string;
  
}
@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss','modalpopup.component.css']
})

export class ModalpopupComponent implements OnInit{
  @Input() public modalConfig: ModalConfig;
 
  private modalRef: NgbModalRef;
  errormsg:any;
  successmsg:any;
  Userlis: Userlis= new Userlis();
  Userlisform: FormGroup;
  constructor(
    private Us: FormBuilder,
    private apiservice: SettingService,
    private actrouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  )
  {
    this. Userlisform =this.Us.group({
      name : ['',Validators.required],
      nickname : ['',Validators.required],
      system : ['',Validators.required],
  
    });
  }


  ngOnInit() {
    
  
  }

  onSubmit(){
    if (this. Userlisform.valid){
      this.apiservice.createNewUserlis(this. Userlisform.value).subscribe((res:any) => {
        console.log(this. Userlisform.value);
        console.log(res);
        
        this. Userlisform.reset(); 
      })
        
    }
   
    else{
      this.errormsg="all field required"
    }
  }

  async close(): Promise<void> {
    if (
      this.modalConfig.shouldClose === undefined ||
      (await this.modalConfig.shouldClose())
    ) {
      const result =
        this.modalConfig.onClose === undefined ||
        (await this.modalConfig.onClose());
      this.modalRef.close(result);
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.disableDismissButton !== undefined) {
      return;
    }

    if (
      this.modalConfig.shouldDismiss === undefined ||
      (await this.modalConfig.shouldDismiss())
    ) {
      const result =
        this.modalConfig.onDismiss === undefined ||
        (await this.modalConfig.onDismiss());
      this.modalRef.dismiss(result);
    }
  }

}