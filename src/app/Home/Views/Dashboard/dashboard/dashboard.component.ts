import { Component, OnInit } from '@angular/core';
import { CompacctHeader } from 'src/app/Service/common.header.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private Header: CompacctHeader,) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Dashboard",
      Link: "Dashboard"
    });
  }

}
