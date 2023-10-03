import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3060/leave-request';
  public leave_req(){
    return this._http.post<any>(this.url, {
    })
  }
}
