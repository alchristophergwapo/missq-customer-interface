import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  PASS_RESET_ADDRESS: string = 'http://3.137.219.17:8080/';

  constructor( private httpClient: HttpClient) { }

  public requestPassResetCode(email: string): Observable<any>{
    let url = this.PASS_RESET_ADDRESS + 'forgot_password/request_code';

    return this.httpClient.post<any>(url, email);
  }

  /**
    *function: checkCode
    * @params: data
    * return type: Observable of any type
    */
  public checkCode(data): Observable<any> {

    let url = this.PASS_RESET_ADDRESS + 'forgot_password/check_code'
    
    return this.httpClient.post<any>(url, data);
  }

  /**
   * updatePassword
   */
  public updatePassword(data): Observable<any> {

    let url = this.PASS_RESET_ADDRESS + 'forgot_password/update_password';

    return this.httpClient.post<any>(url, data);
  }

}
