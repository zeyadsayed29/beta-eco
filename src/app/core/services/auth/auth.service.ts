import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/environments';
import {jwtDecode} from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private httpClient: HttpClient) { }
  private readonly _Router = inject(Router)
  userData:any =  null;

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`, data);
  }


  sendLoginForm(data:object):Observable<any>  {
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin` , data)
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !==null){
     this.userData = jwtDecode(localStorage.getItem('userToken') !)
     console.log(this.userData , 'user dataaa')
    }
  }

  logout():void{
    localStorage.removeItem('userToken')
    this.userData = null
    // navigate to login
    // call abi remove token لو فيه
    this._Router.navigate(['/login'])
  }


  setEmailverify(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  setCodeverify(data:object):Observable<any>{
    return this.httpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }

  setResetPassword(data:object):Observable<any>{
    return this.httpClient.put(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }
}
