import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-ifsc',
  templateUrl: './master-ifsc.component.html',
  styleUrls: ['./master-ifsc.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterIfscComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objifsc = new ifsc();
  ifscFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  ifscID = undefined;
  getPostOfficeList:any = [];
  BankSearchlist:any = [];
  loading = false;
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master IFSC",
      Link: "Master IFSC"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
    this.getBank();
   
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_IFSC_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
       //this.seachSpinner = false;
     })
  }
  getBank(value?:any ){
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_Bank_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.BankSearchlist = data;
      this.Objifsc.Bank_ID = value ? value.toString() : undefined;
      console.log('BankSearchlist=====',this.BankSearchlist)
       //this.seachSpinner = false;
     })
  }
  onReject(){
    this.compacctToast.clear("c");
  }
  Active(col:any){
    if(col.IFSC_ID){
      this.can_popup = false;
      this.ifscID = undefined ;
      this.act_popup = true;
      this.ifscID = col.IFSC_ID;
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
    if(col.IFSC_ID){
      this.act_popup = false;
      this.ifscID = undefined ;
      this.can_popup = true;
     this.ifscID = col.IFSC_ID  ;
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
    if(this.ifscID){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Active_Master_IFSC_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({IFSC_ID  : this.ifscID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.ifscID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.ifscID){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Deactive_Master_IFSC_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({IFSC_ID : this.ifscID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.ifscID ,
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
    this.Objifsc = new ifsc();
    this.ifscFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.ifscID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  saveIfscData(valid:any){
    this.ifscFormSubmitted = true;
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
    
      if(this.ifscID){
        reportName = "Master_IFSC_Update";
        meg="Update";
          saveData = {
            IFSC_ID : this.ifscID,
            IFSC_Code : this.Objifsc.IFSC_Code,
            Bank_ID:this.Objifsc.Bank_ID,
            Branch_Name:this.Objifsc.Branch_Name 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.IFSC_Code === this.Objifsc.IFSC_Code);
       if(!checkData.length){
         meg = "Create"
        reportName = "Master_IFSC_Create";
        saveData = {
          IFSC_Code:this.Objifsc.IFSC_Code,
          Bank_ID:Number(this.Objifsc.Bank_ID),
          Branch_Name:this.Objifsc.Branch_Name
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
       console.log("Save Data",saveData);
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
            summary: "Master IFSC",
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
    if(col.IFSC_ID){
      this.ifscID = undefined;
      this.ifscID = col.IFSC_ID;
      this.tabIndexToView = 1;
      this.Objifsc = new ifsc();
      this.ifscFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Get_Master_IFSC_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({IFSC_ID : col.IFSC_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.getBank(data[0].Bank_ID);
       this.Objifsc = data[0];
       console.log('EditList =====',this.Objifsc)
       //this.seachSpinner = false;
     })

    }
  }
}
class ifsc{
  IFSC_Code : any;
  Bank_ID:any;
  Branch_Name:any;
  IFSC_ID:any
}