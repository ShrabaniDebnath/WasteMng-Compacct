import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
