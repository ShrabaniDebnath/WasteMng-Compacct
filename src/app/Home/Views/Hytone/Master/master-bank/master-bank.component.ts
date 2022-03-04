import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class MasterBankComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjBank = new Bank();
  BankFormSubmitted = false;
  Spinner = false;
  BankSearchlist = [];
  BankEditList = [];
  can_popup = false;
  act_popup = false;
  bankid = undefined;
  loading = false;
  CheckBrowselist = [];

  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Document",
      Link: " Master Document"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
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
   CheckBrowseData(valid:any){
    this.CheckBrowselist = []
    this.BankFormSubmitted = true;
    if (valid) {
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_Bank_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.CheckBrowselist = data;
       console.log('CheckBrowselist=====',this.CheckBrowselist)
       //this.seachSpinner = false;
       const samename = this.CheckBrowselist.filter((item:any)=> item.Bank_Name == this.ObjBank.Bank_Name );
       if(samename.length) {
         this.compacctToast.clear();
             this.compacctToast.add({
               key: "compacct-toast",
               severity: "error",
               summary: "Warn Message",
               detail: "Bank Name Already Exit"
             });
       } 
       else {
           this.createMasterBank();
         }
     })
    }
  }
   createMasterBank(){
    this.BankFormSubmitted = true;
   // if (valid) {
      this.Spinner = true;
      //const obj = { Product_String: JSON.stringify([this.ObjProduct]) };
      let reportname;
      if (this.buttonname != "Update") {
        reportname = "Master_Bank_Create"
      } 
      else {
        reportname = "Master_Bank_Update"
      }
      this.ObjBank.Bank_ID = this.ObjBank.Bank_ID ? this.ObjBank.Bank_ID : 0
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": reportname
      }
      this.apicall.PostData(obj,JSON.stringify([this.ObjBank])).subscribe((data:any)=>{
        console.log('createstatus ===', data[0].Column1)
        if (data[0].Column1) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Bank Name ",
              detail: this.ObjBank.Bank_ID ? "Succesfully Updated" : "Succesfully Created"
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
      });
   // }
   }
   GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_Bank_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.BankSearchlist = data;
       console.log('BankSearchlist=====',this.BankSearchlist)
       //this.seachSpinner = false;
     })
  }
    EditProduct(edit:any){
   this.ObjBank.Bank_ID = undefined;
   this.clearData();
    if (edit.Bank_ID) {
      console.log("edit.Bank_ID ===", edit.Bank_ID )
      this.ObjBank.Bank_ID = edit.Bank_ID;
      this.tabIndexToView = 1;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Get_Master_Bank_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Bank_ID: this.ObjBank.Bank_ID})).subscribe((data:any)=>{
      this.BankEditList = data;
      this.ObjBank.Bank_Name = data[0].Bank_Name;
       console.log('BankEditList =====',this.BankEditList)
       //this.seachSpinner = false;
     })
    }
  }
  Active(row:any){
    this.can_popup = false;
    this.bankid = undefined ;
    if(row.Bank_ID){
      this.act_popup = true;
      this.bankid = row.Bank_ID  ;
      console.log("active Row ===", this.bankid);
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
    if(this.bankid){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Active_Master_Bank_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Bank_ID : this.bankid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.bankid,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  Inactive(col:any){
    this.act_popup = false;
    this.bankid = undefined ;
    if(col.Bank_ID){
      this.can_popup = true;
      this.bankid = col.Bank_ID  ;
      console.log("deactive Row ===", this.bankid);
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
  onConfirm2(){
    if(this.bankid){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Deactive_Master_Bank_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Bank_ID : this.bankid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.bankid ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  onReject(){
    this.compacctToast.clear("c");
  }
   clearData(){
    this.BankFormSubmitted = false;
    this.Spinner = false;
    this.ObjBank = new Bank();
    this.ObjBank.Bank_ID = undefined;
    // if (this.buttonname != "create") {
    // this.GetBrowseData();
    // this.tabIndexToView = 0;
    // this.items = ["BROWSE", "Create"];
    // this.buttonname = "Create";
    // }
   }

}
class Bank {
  Bank_ID!: any;
  Bank_Name!: string;
}
