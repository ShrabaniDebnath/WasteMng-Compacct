import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/API/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSubmit = false;
  ObjLogin = new Login()
  msg = false;
  msgValue:string = "";
  finList:any = [];
  finYear = "";
  constructor(
    private apicall : ApiService,
    private router : Router,
    private cookie : CookieService) { }

  ngOnInit(): void {
    $("body").addClass("hold-transition login-page");
    this.GetFinYear();
  }
  async Login() {
    let loginDetails = await this.ValidLogin();
    console.log(loginDetails);
    if(loginDetails.length && loginDetails[0].User_ID) {
      this.msg = false;
      this.cookie.set('_Compacct_Cookie_data',JSON.stringify(loginDetails[0]));
      this.router.navigate(['/Home/Dashboard']);
      
    } else{
      this.cookie.delete('_Compacct_Cookie_data');
      console.log("Error",loginDetails[0].Column1);
      this.msgValue = loginDetails[0].Column1;
      this.msg = true;
    }
    
  }
  async ValidLogin() {
    const ParamObj:any = {
      "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name":"Login_Waste_Management"
     }
     let res = await this.apicall.PostData(ParamObj,JSON.stringify(this.ObjLogin)).toPromise();
    return res;
  }
  GetFinYear(){
    const ParamObj:any = {
      "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name":"Get_Fin_Year"
     }
     this.apicall.GetData(ParamObj).subscribe((data:any)=>{
      this.finList = data;
      console.log(this.finList);
      console.log(this.finList.length - 1);
      this.finYear = this.finList[this.finList.length - 1].Fin_Year_ID
     })
  }

}
class Login{
  User_Name! :string;
  Password! :any;
}