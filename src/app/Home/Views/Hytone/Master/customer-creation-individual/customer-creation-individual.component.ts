import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-creation-individual',
  templateUrl: './customer-creation-individual.component.html',
  styleUrls: ['./customer-creation-individual.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class CustomerCreationIndividualComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Spinner = false;
  GetAllDataList = [];
  can_popup = false;
  act_popup = false;
  loading = false;
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Customar Creation (Individual)",
      Link: "Customar Creation (Individual)"
    });
    this.items = ["BROWSE", "CREATE"];
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
   }
   clearData(){

   }
   onReject(){
    this.compacctToast.clear("c");
  }
  onConfirm(){

  }
  onConfirm2(){
    
  }
}
