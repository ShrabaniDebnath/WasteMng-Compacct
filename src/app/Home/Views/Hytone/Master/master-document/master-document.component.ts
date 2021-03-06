import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";


@Component({
  selector: 'app-master-document',
  templateUrl: './master-document.component.html',
  styleUrls: ['./master-document.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class MasterDocumentComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjDocument = new Document();
  DocumentFormSubmitted = false;
  Spinner = false;
  Searchlist = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  documentid = undefined;
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
    this.DocumentFormSubmitted = true;
    if (valid) {
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Master_Document_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.CheckBrowselist = data;
       console.log('CheckBrowselist=====',this.CheckBrowselist)
       //this.seachSpinner = false;
       const samedname = this.CheckBrowselist.filter((item:any)=> item.Document_Name == this.ObjDocument.Document_Name );
       if(samedname.length) {
         this.compacctToast.clear();
             this.compacctToast.add({
               key: "compacct-toast",
               severity: "error",
               summary: "Warn Message",
               detail: "Document Name Already Exit"
             });
       } 
       else {
           this.createMasterDocument();
         }
     })
    }
  }
   createMasterDocument(){
    //this.DocumentFormSubmitted = true;
    //if (valid) {
      this.Spinner = true;
      //const obj = { Product_String: JSON.stringify([this.ObjProduct]) };
      let reportname;
      if (this.buttonname != "Update") {
        reportname = "Master_Document_Create"
      } 
      else {
        reportname = "Master_Document_Update"
      }
      this.ObjDocument.Document_ID = this.ObjDocument.Document_ID ? this.ObjDocument.Document_ID : 0
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": reportname
      }
      this.apicall.PostData(obj,JSON.stringify([this.ObjDocument])).subscribe((data:any)=>{
        console.log('createstatus ===', data[0].Column1)
        if (data[0].Column1) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Document Name ",
              detail: this.ObjDocument.Document_ID ? "Succesfully Updated" : "Succesfully Created"
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
      "Report_Name": "Master_Document_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.Searchlist = data;
       console.log('Searchlist=====',this.Searchlist)
       //this.seachSpinner = false;
     })
  }
    EditProduct(edit:any){
   this.ObjDocument.Document_ID = undefined;
   this.clearData();
    if (edit.Document_ID) {
      console.log("edit.Document_ID ===", edit.Document_ID )
      this.ObjDocument.Document_ID = edit.Document_ID;
      this.tabIndexToView = 1;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_02",
      "Report_Name": "Get_Master_Document_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Document_ID: this.ObjDocument.Document_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.ObjDocument.Document_Name = data[0].Document_Name;
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })
    }
  }
  Active(row:any){
    this.can_popup = false;
    this.documentid = undefined ;
    if(row.Document_ID){
      this.act_popup = true;
      this.documentid = row.Document_ID  ;
      console.log("active Row ===", this.documentid);
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
    if(this.documentid){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Active_Master_Document_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Document_ID : this.documentid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.documentid,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  Inactive(col:any){
    this.act_popup = false;
    this.documentid = undefined ;
    if(col.Document_ID){
      this.can_popup = true;
      this.documentid = col.Document_ID  ;
      console.log("deactive Row ===", this.documentid);
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
    if(this.documentid){
      const obj = {
        "Sp_Name": "SP_Master_02",
        "Report_Name": "Deactive_Master_Document_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Document_ID : this.documentid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.documentid ,
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
    this.DocumentFormSubmitted = false;
    this.Spinner = false;
    this.ObjDocument = new Document();
    this.ObjDocument.Document_ID = undefined;
    // if (this.buttonname != "create") {
    // this.GetBrowseData();
    // this.tabIndexToView = 0;
    // this.items = ["BROWSE", "Create"];
    // this.buttonname = "Create";
    // }
   }

}
class Document {
  Document_ID!: any;
  Document_Name!: string;
}
