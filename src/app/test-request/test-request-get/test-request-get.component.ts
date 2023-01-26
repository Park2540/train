import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/servics/setting/setting.service';

@Component({
  selector: 'app-test-request-get',
  templateUrl: './test-request-get.component.html',
  styleUrls: ['./test-request-get.component.scss']
})
export class TestRequestGetComponent implements OnInit {


  constructor(private settingservics: SettingService) { }

  ngOnInit(): void {
    this.settingservics.getUserLis(6265).subscribe((response: any)=>{
      console.log('response',response);
    })

    this.settingservics.update
  }

}
