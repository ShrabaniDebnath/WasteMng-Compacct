import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../Service/API/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookie : CookieService,
    private apicall : ApiService,) { }
  getAuthStatus() {
    let flag = false;
   const fecthCookiesData =  this.cookie.get('_Compacct_Cookie_data') ? JSON.parse(this.cookie.get('_Compacct_Cookie_data')) : {};
   console.log(fecthCookiesData)
   if(fecthCookiesData.User_ID) {
    flag = true;
   }
   return flag
  }
  
}
