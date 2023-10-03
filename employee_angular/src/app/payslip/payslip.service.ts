import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3060/payslip';
  public payslip(){
    return this._http.post<any>(this.url, {
    })
  }
}
