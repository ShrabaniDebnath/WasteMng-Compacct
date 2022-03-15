import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-asset',
  templateUrl: './master-asset.component.html',
  styleUrls: ['./master-asset.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterAssetComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objasset = new asset();
  AssetFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  AssetID = undefined;
  loading = false;
  constructor(  
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Asset",
      Link: "Master Asset"
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
    this.Objasset = new asset();
    this.AssetFormSubmitted = false;
    this.Spinner = false;
    this.alldataList = [];
    this.EditList = [];
    this.can_popup = false;
    this.act_popup = false;
    this.AssetID = undefined;
    this.loading = false;;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_Asset_Browse "
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
    if(this.AssetID){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Active_Master_Asset_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Asset_ID : this.AssetID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.AssetID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    console.log("call 3");
    if(this.AssetID){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Deactive_Master_Asset_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Asset_ID : this.AssetID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.AssetID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  EditProduct(col:any){
    if(col.Asset_ID){
      this.AssetID = undefined;
      this.AssetID = col.Asset_ID;
      this.tabIndexToView = 1;
      this.Objasset = new asset();
      this.AssetFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Get_Master_Asset_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Asset_ID: col.Asset_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objasset = data[0];
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })

    }
  }
  Active(col:any){
    if(col.Asset_ID){
      this.can_popup = false;
      this.AssetID = undefined ;
      this.act_popup = true;
      this.AssetID = col.Asset_ID;
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
    console.log("call");
    if(col.Asset_ID){
      this.act_popup = false;
      this.AssetID = undefined ;
      this.can_popup = true;
     this.AssetID = col.Asset_ID;
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
  saveassetData(valid:any){
    this.AssetFormSubmitted = true;
    console.log("valid",valid);
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.AssetID){
        reportName = "Master_Asset_Update";
        meg="Update";
          saveData = {
            Asset_ID : this.AssetID,
            Asset_Name : this.Objasset.Asset_Name 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Asset_Name === this.Objasset.Asset_Name );
       if(!checkData.length){
         meg = "Create"
        reportName = "Master_Asset_Create";
        saveData = {
          Asset_Name : this.Objasset.Asset_Name
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
        "Sp_Name": "SP_Master_02",
        "Report_Name": reportName
      }
      this.apicall.PostData(obj,JSON.stringify(saveData)).subscribe((data:any)=>{
        if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Master Asset",
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
class asset {
  Asset_ID!:any;
  Asset_Name!:any;
}