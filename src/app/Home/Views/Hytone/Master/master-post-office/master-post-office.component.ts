import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-post-office',
  templateUrl: './master-post-office.component.html',
  styleUrls: ['./master-post-office.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterPostOfficeComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjpostOffice = new postOffice();
  postFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  PostOfficeID = undefined;
  loading = false;
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Post Office",
      Link: "Master Post Office"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Post_Office "
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
    if(this.PostOfficeID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Post_Office_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Post_Office_ID  : this.PostOfficeID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PostOfficeID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.PostOfficeID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Post_Office_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Post_Office_ID : this.PostOfficeID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PostOfficeID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  EditProduct(col:any){
    if(col.Post_Office_ID){
      this.PostOfficeID = undefined;
      this.PostOfficeID = col.Post_Office_ID;
      this.tabIndexToView = 1;
      this.ObjpostOffice = new postOffice();
      this.postFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Post_Office_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Post_Office_ID : col.Post_Office_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.ObjpostOffice = data[0];
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })

    }
  }
  Active(col:any){
    if(col.Post_Office_ID  ){
      this.can_popup = false;
      this.PostOfficeID = undefined ;
      this.act_popup = true;
      this.PostOfficeID = col.Post_Office_ID   ;
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
    if(col.Post_Office_ID){
      this.act_popup = false;
      this.PostOfficeID = undefined ;
      this.can_popup = true;
     this.PostOfficeID = col.Post_Office_ID  ;
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
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
   }
   clearData(){
    this.buttonname = "Create";
    this.ObjpostOffice = new postOffice();
    this.postFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.PostOfficeID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  savepostData(valid:any){
   this.postFormSubmitted = true;
   if(valid){
    this.Spinner = true;
    let saveData:any = [];
    let reportName = "";
    let meg="";
     if(this.PostOfficeID){
      reportName = "Post_Office_Name_Update";
      meg="Update";
        saveData = {
          Post_Office_ID : this.PostOfficeID,
          Post_Office_Name : this.ObjpostOffice.Post_Office_Name 
        }
     }
     else {
     const checkData = this.alldataList.filter((ele:any)=> ele.Post_Office_Name === this.ObjpostOffice.Post_Office_Name);
     if(!checkData.length){
       meg = "Create"
      reportName = "Add_Post_Office";
      saveData = {
        Post_Office_Name : this.ObjpostOffice.Post_Office_Name 
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
          summary: "Master Post Office",
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
class postOffice{
  Post_Office_Name!:any;
  Post_Office_ID !:any;
}