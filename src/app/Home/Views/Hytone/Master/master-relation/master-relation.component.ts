import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-relation',
  templateUrl: './master-relation.component.html',
  styleUrls: ['./master-relation.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterRelationComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objrelation = new relation();
  relationFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  RelationID = undefined;
  getPostOfficeList:any = [];
  loading = false;
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Relation",
      Link: "Master Relation"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Relation_Data  "
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
    if(col.Relation_ID){
      this.can_popup = false;
      this.RelationID = undefined ;
      this.act_popup = true;
      this.RelationID = col.Relation_ID;
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
    if(col.Relation_ID){
      this.act_popup = false;
      this.RelationID = undefined ;
      this.can_popup = true;
     this.RelationID = col.Relation_ID;
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
    if(this.RelationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Relation_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Relation_ID  : this.RelationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.RelationID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.RelationID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Relation_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Relation_ID : this.RelationID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.RelationID ,
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
    this.Objrelation = new relation();
    this.relationFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.RelationID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  saverelationData(valid:any){
    this.relationFormSubmitted = true;
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.RelationID){
        reportName = "Relation_Data_Update";
        meg="Update";
          saveData = {
            Relation_ID : this.RelationID,
            Relation_Name : this.Objrelation.Relation_Name
           }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Relation_Name === this.Objrelation.Relation_Name);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Relation_Data";
        saveData = {
          Relation_Name : this.Objrelation.Relation_Name
          
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
            summary: "Master Relation",
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
    if(col.Relation_ID){
      this.RelationID = undefined;
      this.RelationID = col.Relation_ID;
      this.tabIndexToView = 1;
      this.Objrelation = new relation();
      this.relationFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Relation_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Relation_ID : col.Relation_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objrelation = data[0];
       console.log('EditList =====',this.Objrelation)
       //this.seachSpinner = false;
     })

    }
  }
}
class relation {
  Relation_Name!:any;
  Relation_ID!:any;
}