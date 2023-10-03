import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from './leave-request.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {

  constructor(private _httpservice: LeaveRequestService) { }

  LR: any;
  searchtext: any;

  headers = ["EMPLOYEE NO", "SUB-TYPE", "START DATE", "END DATE", "NO OF INFOTYPE RECORD", "ATTENDANCE/ABSENCE TYPE",
              "TEXT OF ATTENDANCE/ABSENCE TYPE", "ATTENDANCE AND ABSENCE DAYS", "ABSENCE HOURS"];

  names = ["EMPLOYEENO", "SUBTYPE", "VALIDBEGIN", "VALIDEND", "RECORDNR", "ABSENCETYPE", "NAMEOFABSENCETYPE", "ABSENCEDAYS",
            "ABSENCEHOURS"];

  ngOnInit() {
    this._httpservice.leave_req().subscribe(
      data =>{
        this.LR = data;
        console.log(this.LR);
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
