import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-master-customer-type',
  templateUrl: './master-customer-type.component.html',
  styleUrls: ['./master-customer-type.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterCustomerTypeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objcustomar = new customar();
  ProductFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  productid = undefined;
  loading = false;
constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { 
   
  }
  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Customer",
      Link: " Master Customer"
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
    this.Objcustomar = new customar();
    this.ProductFormSubmitted = false;
    this.buttonname = "Create";
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.productid = undefined;
    this.loading = false;
   }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Customer_Type"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
       //this.seachSpinner = false;
     })
  }

  onConfirm(){
    if(this.productid){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Customer_Type_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Cust_Type_ID : this.productid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.productid,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.productid){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Customer_Type_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Cust_Type_ID : this.productid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.productid ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  onReject(){
    this.compacctToast.clear("c");
  }
  EditProduct(col:any){
    if(col.Cust_Type_ID){
      this.productid = undefined;
      this.productid = col.Cust_Type_ID;
      this.tabIndexToView = 1;
      this.Objcustomar = new customar();
      this.ProductFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Customer_Type_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Cust_Type_ID: col.Cust_Type_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objcustomar = data[0];
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })

    }
  }
  Active(col:any){
   if(col.Cust_Type_ID ){
      this.can_popup = false;
      this.productid = undefined ;
      this.act_popup = true;
      this.productid = col.Cust_Type_ID   ;
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
   if(col.Cust_Type_ID){
      this.act_popup = false;
      this.productid = undefined ;
      this.can_popup = true;
     this.productid = col.Cust_Type_ID  ;
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
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  savecustomarData(valid:any){
    this.ProductFormSubmitted = true;
    if(valid){
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.productid){
        reportName = "Customer_Type_Update";
        meg="Update";
          saveData = {
            Cust_Type_ID : this.productid,
            Cust_Type  : this.Objcustomar.Cust_Type 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Cust_Type === this.Objcustomar.Cust_Type);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Customer_Type";
        saveData = {
          Cust_Type : this.Objcustomar.Cust_Type 
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
            summary: "Master Customar Type",
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
class customar {
  Cust_Type!:any;  
  Cust_Type_ID!:any;
}