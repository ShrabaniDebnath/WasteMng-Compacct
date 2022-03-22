import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-police-station',
  templateUrl: './master-police-station.component.html',
  styleUrls: ['./master-police-station.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterPoliceStationComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjpoliceStation = new policeStation();
  policeFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  PoliceStationID = undefined;
  loading = false;
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Police Station",
      Link: "Master Police Station"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
  }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
   }
   clearData(){
    this.buttonname = "Create";
    this.ObjpoliceStation = new policeStation();
    this.policeFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.PoliceStationID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
   GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Police_Station "
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
       //this.seachSpinner = false;
     })
  }
  onReject(){
    this.compacctToast.clear("c");
  }
  onConfirm(){
    if(this.PoliceStationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Police_Station_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Police_Station_ID : this.PoliceStationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PoliceStationID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.PoliceStationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Police_Station_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Police_Station_ID : this.PoliceStationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PoliceStationID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  EditProduct(col:any){
    if(col.Police_Station_ID){
      this.PoliceStationID = undefined;
      this.PoliceStationID = col.Police_Station_ID;
      this.tabIndexToView = 1;
      this.ObjpoliceStation = new policeStation();
      this.policeFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Police_Station_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Police_Station_ID: col.Police_Station_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.ObjpoliceStation = data[0];
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })

    }
  }
  Active(col:any){
    if(col.Police_Station_ID ){
      this.can_popup = false;
      this.PoliceStationID = undefined ;
      this.act_popup = true;
      this.PoliceStationID = col.Police_Station_ID   ;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "c",
        sticky: true,
        severity: "warn",
        summary: "Are you sure?",
        detail: "Confirm to proceed"
      });
    }
  }
  Inactive(col:any){
    if(col.Police_Station_ID){
      this.act_popup = false;
      this.PoliceStationID = undefined ;
      this.can_popup = true;
     this.PoliceStationID = col.Police_Station_ID  ;
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "c",
        sticky: true,
        severity: "warn",
        summary: "Are you sure?",
        detail: "Confirm to proceed"
      });
    }
  }
  savepoliceData(valid:any){
    this.policeFormSubmitted = true;
    console.log("valid",valid);
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.PoliceStationID){
        reportName = "Police_Station_Name_Update";
        meg="Update";
          saveData = {
            Police_Station_ID : this.PoliceStationID,
            Police_Station_Name : this.ObjpoliceStation.Police_Station_Name 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Police_Station_Name === this.ObjpoliceStation.Police_Station_Name);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Police_Station";
        saveData = {
          Police_Station_Name : this.ObjpoliceStation.Police_Station_Name 
        }
       }
       else {
        this.Spinner = false;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Already in List"
        });
         return
         
       }

       }
       const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": reportName
      }
      this.apicall.PostData(obj,JSON.stringify(saveData)).subscribe((data:any)=>{
        if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Master Police Station",
            detail: "Succesfully "+meg
          });
          //if (this.buttonname != "Update") {
          this.clearData();
          this.GetBrowseData();
          this.tabIndexToView = 0;
          this.items = ["BROWSE", "CREATE"];
          this.buttonname = "Create";
          //}
      } else {
        this.Spinner = false;
        this.compacctToast.clear();
        this.compacctToast.add({
          key: "compacct-toast",
          severity: "error",
          summary: "Warn Message",
          detail: "Error Occured "
        });
      }
      })

    }
  }
}
class policeStation{
  Police_Station_Name!:any;
  Police_Station_ID!:any;
}