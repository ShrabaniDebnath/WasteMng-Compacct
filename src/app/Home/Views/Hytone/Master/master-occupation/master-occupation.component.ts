import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-occupation',
  templateUrl: './master-occupation.component.html',
  styleUrls: ['./master-occupation.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterOccupationComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objoccupation = new occupation();
  occupationFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  OccupationID = undefined;
  getPostOfficeList:any = [];
  loading = false;
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Occupation",
      Link: "Master Occupation"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Occupatin_Data "
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
  Active(col:any){
    if(col.Occupation_ID){
      this.can_popup = false;
      this.OccupationID = undefined ;
      this.act_popup = true;
      this.OccupationID = col.Occupation_ID;
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
    if(col.Occupation_ID){
      this.act_popup = false;
      this.OccupationID = undefined ;
      this.can_popup = true;
     this.OccupationID = col.Occupation_ID  ;
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
  onConfirm(){
    if(this.OccupationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Occupation_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Occupation_ID  : this.OccupationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.OccupationID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.OccupationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Occupation_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Occupation_ID : this.OccupationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.OccupationID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
   }
   clearData(){
    this.Objoccupation = new occupation();
    this.occupationFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.OccupationID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  saveoccupationData(valid:any){
    this.occupationFormSubmitted = true;
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.OccupationID){
        reportName = "Occupation_Data_Update";
        meg="Update";
          saveData = {
            Occupation_ID : this.OccupationID,
            Occupation_Name : this.Objoccupation.Occupation_Name
           }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Occupation_Name === this.Objoccupation.Occupation_Name);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Occupatin_Data";
        saveData = {
          Occupation_Name : this.Objoccupation.Occupation_Name
          
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
            summary: "Master Occupation",
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
  EditProduct(col:any){
    if(col.Occupation_ID){
      this.OccupationID = undefined;
      this.OccupationID = col.Occupation_ID;
      this.tabIndexToView = 1;
      this.Objoccupation = new occupation();
      this.occupationFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Occupation_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Occupation_ID : col.Occupation_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objoccupation = data[0];
       console.log('EditList =====',this.Objoccupation)
       //this.seachSpinner = false;
     })

    }
  }

}
class occupation{
  Occupation_Name!:any;
}