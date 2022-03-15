import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateTimeConvertService } from 'src/app/Service/dateTime.service';

@Component({
  selector: 'app-master-agency',
  templateUrl: './master-agency.component.html',
  styleUrls: ['./master-agency.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterAgencyComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  act_popup = false;
  can_popup = false;
  objagency = new agency()
  objkyc  = new kyc()
  objcontact = new contact()
  loading = false
  alldataList:any = [];
  agencyFormSubmitted = false;
  kycFormSubmitted = false;
  contactFormSubmit = false;
  kycList:any = [];
  policestationList:any = [];
  postOfficeList:any = [];
  pincodeList:any = [];
  contactList:any = [];
  Spinner = false;
  AgentID = undefined;
  appdate:Date = new Date();
  RateChartDate:Date = new Date();
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private DateService: DateTimeConvertService,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Agency",
      Link: "Master Agency"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
    this.getpoliceStation();
    this.getPostOffice();
    this.getpincode();
  }
  GetBrowseData(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Agency_Data"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.alldataList = data;
       console.log('alldataList=====',this.alldataList)
     })
  }
  getpoliceStation(value?:any){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Police_Station_For_Agency"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.policestationList = data;
      this.objagency.Police_Station_ID = value ? value.toString() : undefined;
       console.log('policestationList=====',this.policestationList)
     })
  }
  getPostOffice(value?:any){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Post_Office_For_Agency"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.postOfficeList = data;
      this.objagency.Post_Office_ID = value ? value.toString() : undefined;
       console.log('postOfficeList=====',this.postOfficeList)
     })
  }
  getpincode(value?:any){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Pincode_Agency "
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.pincodeList = data;
      this.objagency.Pincode_ID = value ? value.toString() : undefined;
       console.log('pincodeList=====',this.pincodeList)
     })
  }
  onReject(){
    this.compacctToast.clear("c");
  }
 
TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.clearData();
   }
   clearData(){
    this.act_popup = false;
    this.can_popup = false;
    this.AgentID = undefined;
    this.objagency = new agency()
    this.objkyc  = new kyc()
    this.objcontact = new contact()
    this.loading = false
    this.agencyFormSubmitted = false;
    this.kycFormSubmitted = false;
    this.contactFormSubmit = false;
    this.kycList = [];
     this.contactList = [];
    this.Spinner = false;
    this.AgentID = undefined;
    this.appdate= new Date();
    this.RateChartDate = new Date();
   }
   EditProduct(col:any){
     if(col.Agent_ID){
      this.tabIndexToView = 1;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
      this.act_popup = false;
      this.can_popup = false;
      this.AgentID = undefined;
      this.AgentID = col.Agent_ID;
      this.objagency = new agency()
      this.objkyc  = new kyc()
      this.objcontact = new contact()
      this.loading = false
      this.agencyFormSubmitted = false;
      this.kycFormSubmitted = false;
      this.contactFormSubmit = false;
      this.kycList = [];
      this.contactList = [];
      this.Spinner = false;
      this.appdate= new Date();
      this.RateChartDate = new Date();
      this.getEditAgency(col.Agent_ID);
     }
   }
   getEditAgency(ID:any){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Agency_Data"
    }
    this.apicall.PostData(obj,JSON.stringify({Agent_ID:Number(ID)})).subscribe((res:any)=>{
      
      const data = res.length && res[0].doc ? JSON.parse(res[0].doc) : [];
      this.getpoliceStation(data[0].Police_Station_ID);
      this.getPostOffice(data[0].Post_Office_ID);
      this.getpincode(data[0].Pincode_ID);
     
      this.objagency = data[0];
      this.appdate = new Date (data[0].Date_Of_Appointment);
      this.RateChartDate = new Date (data[0].Date_Of_Rate_Chart);
      this.contactList = data[0].poc;
      this.kycList= data[0].kyc;
      console.log("Edit contactList",this.contactList);
      console.log("Edit kycList",this.kycList);
      console.log("Edit data",this.objagency);
    })
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  }
  AddKyc(valid:any){
    this.kycFormSubmitted = true;
    if(valid){
      this.kycList.push({
        KYC_Description : this.objkyc.KYC_Description,
        KYC_NO : this.objkyc.KYC_NO
      });
      this.kycFormSubmitted = false;
      this.objkyc = new kyc();
    }
    console.log("Kyc",this.kycList);
  }
  delete(index:any) {
    this.kycList.splice(index,1)
  }
  deletecon(index:any){
    this.contactList.splice(index,1)
  }
  addContact(valid:any){
   this.contactFormSubmit = true;
   console.log("Contact",valid);
   if(valid){
      this.contactList.push({
        Contact_Name : this.objcontact.Contact_Name,
        Contact_Email : this.objcontact.Contact_Email,
        Contact_Mobile : this.objcontact.Contact_Mobile,
        Contact_Designation : this.objcontact.Contact_Designation
      })
   }
   this.objcontact = new contact();
   this.contactFormSubmit = false;
  }
  gstNoclear(){
   
   if(this.objagency.GST_Registered === 'N'){
      this.objagency.GST_NO = "";
    }
   }
   saveAgency(valid:any){
   this.agencyFormSubmitted = true;
   console.log("valid",valid)
   if(valid){
     if(this.kycList.length && this.contactList.length){
       let reportName = "";
       let msg = "";
       let saveData:any = [];
       const getPin = this.pincodeList.filter((el:any)=>Number(el.Pincode_ID) === Number(this.objagency.Pincode_ID));
       this.objagency.Pincode = getPin[0].Pincode
        console.log("AgentID",this.AgentID);
        if(this.AgentID){
           reportName = "Agency_Data_Update";
           msg = "Update";
          saveData = {
            Agent_ID:this.AgentID,
            Name:this.objagency.Name,
            Address:this.objagency.Address,
            Police_Station_ID:this.objagency.Police_Station_ID,
            Post_Office_ID:this.objagency.Post_Office_ID,
            Pincode_ID:this.objagency.Pincode_ID,
            Pincode:this.objagency.Pincode,
            GST_Registered:this.objagency.GST_Registered,
            GST_NO:this.objagency.GST_NO,
            PAN_NO:this.objagency.PAN_NO,
            Date_Of_Appointment:this.DateService.dateTimeConvert(new Date(this.appdate)),
            Date_Of_Rate_Chart:this.DateService.dateTimeConvert(new Date(this.RateChartDate)),
            kyc:this.kycList,
            poc:this.contactList
          }
        }
        else{
           reportName = "Add_Agency_Data";
           msg = "Create";
          saveData = {
            Name:this.objagency.Name,
            Address:this.objagency.Address,
            Police_Station_ID:this.objagency.Police_Station_ID,
            Post_Office_ID:this.objagency.Post_Office_ID,
            Pincode_ID:this.objagency.Pincode_ID,
            Pincode:this.objagency.Pincode,
            GST_Registered:this.objagency.GST_Registered,
            GST_NO:this.objagency.GST_NO,
            PAN_NO:this.objagency.PAN_NO,
            Date_Of_Appointment:this.DateService.dateTimeConvert(new Date(this.appdate)),
            Date_Of_Rate_Chart:this.DateService.dateTimeConvert(new Date(this.RateChartDate)),
            kyc:this.kycList,
            poc:this.contactList
          }
        }
        console.log("saveData",JSON.stringify(saveData));
       console.log("reportName",reportName);
        const obj = {
          "Sp_Name": "SP_Master_01",
          "Report_Name": reportName
        }
        this.apicall.PostData(obj,JSON.stringify(saveData)).subscribe((data:any)=>{
          console.log("data",data);
          if (data[0].Column1) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Master Agency",
              detail: "Succesfully "+msg
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
     else {
      this.compacctToast.clear();
      this.compacctToast.add({
      key:"compacct-toast",
      severity: "error",
      summary: "Try Again",
      detail: "Enter minimum one Contact Detalis / KYC DESCRIPTION"
    });
     }
   }
   }

   Active(col:any){
    if(col.Agent_ID){
      this.can_popup = false;
      this.AgentID = undefined ;
      this.act_popup = true;
      this.AgentID = col.Agent_ID;
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
    if(col.Agent_ID){
      this.act_popup = false;
      this.AgentID = undefined ;
      this.can_popup = true;
     this.AgentID = col.Agent_ID  ;
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
    if(this.AgentID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Activate_Agency_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Agent_ID:this.AgentID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.AgentID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.AgentID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Agency_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Agent_ID : this.AgentID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.AgentID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
}
class agency {
  Agent_ID!:any
  Name!:any
  Address!:any
  Police_Station_ID!:any
  Post_Office_ID!:any
  Pincode_ID!:any
  Pincode!:any
  GST_Registered!:any
  GST_NO!:any
  PAN_NO!:any
  Date_Of_Appointment!:any
  Date_Of_Rate_Chart!:any
} 
class kyc{
Agent_ID:any
KYC_Description:any
KYC_NO:any
}
class contact{
Agent_ID:any
Contact_Name:any
Contact_Email:any
Contact_Mobile:any
Contact_Designation:any
}