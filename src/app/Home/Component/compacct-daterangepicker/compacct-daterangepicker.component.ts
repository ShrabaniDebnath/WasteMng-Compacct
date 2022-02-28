import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
declare var $: any;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compacct-daterangepicker',
  templateUrl: './compacct-daterangepicker.component.html',
  styleUrls: ['./compacct-daterangepicker.component.css', './daterange.css']
})
export class CompacctDaterangepickerComponent implements OnInit {
  daterangepickerOptions = {};
    public today: Date = new Date(new Date().toDateString());
    public today2: Date = new Date(new Date().toDateString());
    public StartDate = this.today;
    public EndDate = this.today2;
    public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
        ;
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd: Date = this.today;
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd: Date = this.today;
    public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
    public yearEnd: Date = this.today;
    public TutopiaPendigTickStart = new Date(new Date(2021,3, 1).toDateString());
    public TutopiaPendigTickEnd = this.today;
    EnabledFlag = true
  @Output() DaterangeObj = new EventEmitter();
  @Input() set DefaultDateOpt(value:any) {
     if (value === 'weekwise') {
      this.StartDate = this.weekStart;
       this.EndDate = this.weekEnd;
      this.DaterangeObj.emit([this.StartDate,this.EndDate]);
    }else if (value === 'TutopiaPendigTick') {
      this.StartDate = this.TutopiaPendigTickStart;
       this.EndDate = this.TutopiaPendigTickEnd;
      this.DaterangeObj.emit([this.StartDate,this.EndDate]);
    } else {
      this.StartDate = this.today;
      this.EndDate = this.today2;
    }

  }
  @Input() set HardCodeDateOpt(value:any) {
    if (value.length) {
      this.StartDate = value[0];
      this.EndDate = value[1];
      this.DaterangeObj.emit([this.StartDate,this.EndDate]);
   }

 }
  @Input() set DefaultEnable(value:any) {
  this.EnabledFlag = value ? false :  true;
  }
  @ViewChild('compactDaterange',{static:false}) compactDaterange!:ElementRef;


  FinDetails = [];
  constructor(
    private $http: HttpClient) { }

  ngOnInit() {
  }

  rangeSelected(events:any) {
    if (events.length === 2) {
      this.DaterangeObj.emit(events);
    } else {
      this.DaterangeObj.emit(null);
    }
  }

}
