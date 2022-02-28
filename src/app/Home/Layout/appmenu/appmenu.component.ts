import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  navItems: any;
  constructor() { }

  ngOnInit(): void {
  }
  getRoute(e:any){}
}
