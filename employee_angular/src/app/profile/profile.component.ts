import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _httpservice: ProfileService) { }


  emp_prof_personnel_num: string = "";
  emp_prof_object_type: string = "";
  emp_prof_start_date: string = "";
  emp_prof_end_date: string = "";
  emp_prof_status: string = "";
  emp_prof_personnel_area: string = "";
  emp_prof_emp_grp: string = "";
  emp_prof_org_unit: string = "";
  emp_prof_obj_name: string = "";
  emp_prof_obj_id: string = "";
  emp_prof_formatted_name_of_emp: string = "";
  emp_prof_last_name: string = "";
  emp_prof_first_name: string = "";
  emp_prof_city: string = "";
  emp_prof_street: string = "";
  emp_prof_country_key: string = "";
  emp_prof_telephone: string = "";



  company_comp_code: string="";
  company_comp_name: string="";
  company_city: string="";
  company_country: string="";
  company_currency: string="";
  company_lang: string="";
  company_chart_of_acc: string="";
  company_financial_year_variant: string="";
  company_country_iso: string="";
  company_currency_iso: string="";
  company_lang_iso: string="";


  ngOnInit() {
    this._httpservice.profile().subscribe(
      data =>{

        this.emp_prof_personnel_num = data[0][0].PERNR;
        this.emp_prof_object_type = data[0][0].OTYPE;
        this.emp_prof_start_date = data[0][0].BEGDA;
        this.emp_prof_end_date = data[0][0].ENDDA;
        this.emp_prof_status = data[0][0].STATUS;
        this.emp_prof_personnel_area = data[0][0].WERKS;
        this.emp_prof_emp_grp = data[0][0].PERSG;
        this.emp_prof_org_unit = data[0][0].ORGEH;
        this.emp_prof_obj_name = data[0][0].ORGEH_TXT;
        this.emp_prof_obj_id = data[0][0].PLANS;
        this.emp_prof_formatted_name_of_emp = data[0][0].ENAME;
        this.emp_prof_last_name = data[0][0].NACHN;
        this.emp_prof_first_name = data[0][0].VORNA;
        this.emp_prof_city = data[0][0].ORT01;
        this.emp_prof_street = data[0][0].STRAS;
        this.emp_prof_country_key = data[0][0].LAND;
        this.emp_prof_telephone = data[0][0].TELNR;


        this.company_comp_code = data[1][0].COMP_CODE;
        this.company_comp_name = data[1][0].COMP_NAME;
        this.company_city = data[1][0].CITY;
        this.company_country = data[1][0].COUNTRY;
        this.company_currency = data[1][0].CURRENCY;
        this.company_lang = data[1][0].LANGU;
        this.company_chart_of_acc = data[1][0].CHRT_ACCTS;
        this.company_financial_year_variant = data[1][0].FY_VARIANT;
        this.company_country_iso = data[1][0].COUNTRY_ISO;
        this.company_currency_iso = data[1][0].CURRENCY_ISO;
        this.company_lang_iso = data[1][0].LANGU_ISO;

        // console.log(data[0]);
        // console.log(data[1]);
      }, err => {
        console.log(err);
      }
    )
  }
}
