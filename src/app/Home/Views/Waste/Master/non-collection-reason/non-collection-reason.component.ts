import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
declare var $:any;

@Component({
  selector: 'app-non-collection-reason',
  templateUrl: './non-collection-reason.component.html',
  styleUrls: ['./non-collection-reason.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class NonCollectionReasonComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objreason = new reason();
  reasonFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  ReasonID = undefined;
  loading = false;
  constructor( private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Non Collection Reason",
      Link: "Non Collection Reason"
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
    this.Objreason = new reason();
    this.reasonFormSubmitted = false;
    this.Spinner = false;
    this.EditList = [];
    this.can_popup = false;
    this.act_popup = false;
    this.ReasonID = undefined;
    this.loading = false;
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  onReject(){
    this.compacctToast.clear("c");
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Browse_Non_Collection_Reason"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
       //this.seachSpinner = false;
     })
  }
  onConfirm(){
    if(this.ReasonID){
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Active_Non_Collection_Reason"
      }
      this.apicall.PostData(obj, JSON.stringify({Non_Collection_Reason_ID : this.ReasonID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Non Collection Reason ID: " + this.ReasonID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.ReasonID){
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Deactive_Non_Collection_Reason"
      }
      this.apicall.PostData(obj, JSON.stringify({Non_Collection_Reason_ID : this.ReasonID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.ReasonID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  EditProduct(col:any){
    if(col.Non_Collection_Reason_ID){
      this.ReasonID = undefined;
      this.ReasonID = col.Non_Collection_Reason_ID;
      this.tabIndexToView = 1;
      this.Objreason = new reason();
      this.reasonFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Get_Non_Collection_Reason"
     }
     this.apicall.PostData(obj, JSON.stringify({Non_Collection_Reason_ID: col.Non_Collection_Reason_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objreason = data[0];
       console.log('Objreason =====',this.Objreason)
       //this.seachSpinner = false;
     })

    }
  }
  Active(col:any){
    if(col.Non_Collection_Reason_ID ){
      this.can_popup = false;
      this.ReasonID = undefined ;
      this.act_popup = true;
      this.ReasonID = col.Non_Collection_Reason_ID   ;
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
    if(col.Non_Collection_Reason_ID){
      this.act_popup = false;
      this.ReasonID = undefined ;
      this.can_popup = true;
     this.ReasonID = col.Non_Collection_Reason_ID  ;
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
  saveReasoneData(valid:any){
    this.reasonFormSubmitted = true;
    console.log("valid",valid);
    if(valid){
      this.Spinner = true;
      let saveData:any = [];
      let reportName = "";
      let meg="";
       if(this.ReasonID){
        reportName = "Update_Non_Collection_Reason";
        meg="Update";
          saveData = {
            Non_Collection_Reason_ID : this.ReasonID,
            Non_Collection_Reason : this.Objreason.Non_Collection_Reason 
          }
       }
       else {
       const checkData = this.alldataList.filter((ele:any)=> ele.Non_Collection_Reason === this.Objreason.Non_Collection_Reason);
       if(!checkData.length){
         meg = "Create"
        reportName = "Add_Non_Collection_Reason";
        saveData = {
          Non_Collection_Reason : this.Objreason.Non_Collection_Reason 
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
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": reportName
      }
      this.apicall.PostData(obj,JSON.stringify(saveData)).subscribe((data:any)=>{
        if (data[0].Column1) {
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Non Collection Reason",
            detail: "Succesfully "+meg
          });
          //if (this.buttonname != "Update") {
          this.clearData();
          this.GetBrowseData();
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
class reason{
  Non_Collection_Reason!:any;
  Non_Collection_Reason_ID!:any;
}