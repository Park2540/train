import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/servics/details/details.service';

@Component({
  selector: 'app-problemdetails',
  templateUrl: './problemdetails.component.html',
  styleUrls: ['./problemdetail.css']
})
export class ProblemdetailsComponent implements OnInit {

  constructor(
    private detailsservice:DetailsService
  ) { }

  ngOnInit(): void {
    this.getproblemdetails
  }

  getproblemdetails(){
    // this.detailsservice.getproblemdetails().subscribe(
    //   result => {
    //     console.log(result);
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // )
  }
}
