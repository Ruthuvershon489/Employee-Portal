import { Component, OnInit } from '@angular/core';
import { PayslipService } from './payslip.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  constructor(private _httpservice: PayslipService) { }

  PAYSLIP: any;
  searchtext: any;

  headers = ["SEQUENCE NO", "START DATE OF PAYROLL PERIOD", "END DATE OF PAYROLL PERIOD",
              "OFF-CYCLE PAYROLL PAYMENT DATE", "PAYDATE FOR PAYROLL RESULT", "SHORT TEXT FOR FIXED VALUES"];

  names = ["SEQUENCENUMBER", "FPBEGIN", "FPEND", "BONUSDATE", "PAYDATE", "PAYTYPE_TEXT"];

  ngOnInit() {
    this._httpservice.payslip().subscribe(
      data =>{
        this.PAYSLIP = data;
        console.log(this.PAYSLIP);
      }, err => {
        console.log(err);
      }
    )
  }

  /////////////////////   Sorting   ///////////////////////
  key: String = "id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}

