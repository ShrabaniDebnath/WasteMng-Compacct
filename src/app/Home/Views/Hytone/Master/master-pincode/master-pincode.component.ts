import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-pincode',
  templateUrl: './master-pincode.component.html',
  styleUrls: ['./master-pincode.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterPincodeComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objpincode = new pincode();
  pincodeFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  PincodeID = undefined;
  getPostOfficeList:any = [];
  loading = false;
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Pincode",
      Link: "Master Pincode"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
    this.GetPostOffice();
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Pincode"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
       //this.seachSpinner = false;
     })
  }
  GetPostOffice(value?:any){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Post_Office "
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.getPostOfficeList = data;
       console.log('getPostOfficeList=====',this.getPostOfficeList)
       this.Objpincode.Post_Office_ID  = value ? value.toString() : undefined;
       console.log("Objpincode.Post_Office_ID",this.Objpincode.Post_Office_ID );
       //this.seachSpinner = false;
     })
  }
  onReject(){
    this.compacctToast.clear("c");
  }
  Active(col:any){
    if(col.Pincode_ID){
      this.can_popup = false;
      this.PincodeID = undefined ;
      this.act_popup = true;
      this.PincodeID = col.Pincode_ID;
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
    if(col.Pincode_ID){
      this.act_popup = false;
      this.PincodeID = undefined ;
      this.can_popup = true;
     this.PincodeID = col.Pincode_ID  ;
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
    if(this.PincodeID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Pincode_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Pincode_ID  : this.PincodeID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PincodeID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.PincodeID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Pincode_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Pincode_ID : this.PincodeID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.PincodeID ,
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
    this.Objpincode = new pincode();
    this.pincodeFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.PincodeID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  savepostData(valid:any){
    this.pincodeFormSubmitted = true;
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.PincodeID){
        reportName = "Post_Pincode_Update";
        meg="Update";
          saveData = {
            Pincode_ID : this.PincodeID,
            Pincode : this.Objpincode.Pincode,
            Post_Office_ID:this.Objpincode.Post_Office_ID 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Post_Office_Name === this.Objpincode.Pincode);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Pincode";
        saveData = {
          Pincode : this.Objpincode.Pincode,
          Post_Office_ID:this.Objpincode.Post_Office_ID
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
            summary: "Master Pincode",
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
    if(col.Pincode_ID){
      this.PincodeID = undefined;
      this.PincodeID = col.Pincode_ID;
      this.tabIndexToView = 1;
      this.Objpincode = new pincode();
      this.pincodeFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Pincode_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Pincode_ID : col.Pincode_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.GetPostOffice(data[0].Post_Office_ID);
     
      this.Objpincode = data[0];
       console.log('EditList =====',this.Objpincode)
       //this.seachSpinner = false;
     })

    }
  }
}
class pincode{
  Pincode_ID!:any;
  Pincode!:any;
  Post_Office_ID!:any;
}