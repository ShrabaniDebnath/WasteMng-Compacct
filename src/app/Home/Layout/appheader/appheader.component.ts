import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

 // title = 'ClientApp';
 userName: String = '';
 CompanyName: String = '';
 FinYearName: string = '';
 LogoReqFlag = false;
 fecthCookiesData:any = [];
  constructor(
    private router: Router,
    private cookie : CookieService) { }

  ngOnInit(): void {
   this.fecthCookiesData =  this.cookie.get('_Compacct_Cookie_data') ? JSON.parse(this.cookie.get('_Compacct_Cookie_data')) : {};
   this.userName = this.fecthCookiesData.User_Name;
  }
  Logout() {
    this.cookie.delete('_Compacct_Cookie_data');
    this.router.navigate(['/Login']);
  }
}
