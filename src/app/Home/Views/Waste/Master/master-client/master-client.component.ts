import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { never } from 'rxjs';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-master-client',
  templateUrl: './master-client.component.html',
  styleUrls: ['./master-client.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterClientComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  getAllData:any = [];
  loading = false;
  masterClientSubmit = false;
  PDFViewFlag = false;
  PDFFlag = false;
  ProductPDFFile:any = {};
  ProductPDFLink = undefined;
  CollectionSMS = false;
  CollectionEmail = false;
  CollectionWhatsapp = false;
  masterClientContactSubmit = false;
  addPersonList:any = [];
  buttonname = "Create"
  Spinner = false;
  checked: boolean = false;
  clientId:any = 0;
  can_popup = false;
  act_popup = false;
  ObjmasterClient: masterClient = new masterClient ();
  ObjcontactPerson: contactPerson = new contactPerson ();
  constructor(
    private apicall : ApiService,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Client",
      Link: " Master Client"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetAllBrowse();
  }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.masterClientContactSubmit = false;
    this.masterClientSubmit = false;
    this.addPersonList= [];
    this.clientId = undefined;
    this.ObjmasterClient = new masterClient ();
    this.ObjcontactPerson = new contactPerson ();
   }
   getEventValue($event:any) :string {
    return $event.target.value;
  } 
  FetchPDFFile(event:any) {
    this.PDFFlag = false;
    this.ProductPDFFile = {};
    if (event) {
      this.ProductPDFFile = event.files[0];
      this.PDFFlag = true;
    }
  }
  addPerson(valid:any){
   // let addlist:any = []
   this.masterClientContactSubmit = true;
   console.log(valid)
   if(valid){
    let  addlist = {
      name:this.ObjcontactPerson.Contact_Name,
      phone:this.ObjcontactPerson.Contact_Phone_No,
      email:this.ObjcontactPerson.Contact_Email_Id
    }
    this.addPersonList.push(addlist);
    this.masterClientContactSubmit = false;
    this.ObjcontactPerson = new contactPerson();
    
   }
}
saveMasterClient(valid:any){
this.masterClientSubmit = true;
 if(valid){
   if(!this.ObjmasterClient.Alert_Manager_Whatsapp && !this.ObjmasterClient.Alert_Manager_Email && !this.ObjmasterClient.Alert_Manager_SMS){
    this.compacctToast.clear();
    this.compacctToast.add({
      key:"compacct-toast",
      severity: "error",
      summary: "Try Again",
      detail: "Selete minimum one field on Collection Alert Manager"
    });
    return
   }
  let savedata:any = [];
   if(this.checked){
    this.ObjmasterClient.Alert_SubClient_SMS = this.ObjmasterClient.Alert_Manager_SMS;
    this.ObjmasterClient.Alert_SubClient_Email = this.ObjmasterClient.Alert_Manager_Email;
    this.ObjmasterClient.Alert_SubClient_Whatsapp = this.ObjmasterClient.Alert_Manager_Whatsapp;
   }
   if(!this.addPersonList.length){
      this.compacctToast.clear();
      this.compacctToast.add({
      key:"compacct-toast",
      severity: "error",
      summary: "Try Again",
      detail: "Enter minimum one Contact Detalis"
    });
    return
   }
   let repoetName:string ="";  
   let msg:string="";
   if(this.clientId){
    repoetName = "Waste_Mng_Master_Client_Update";
    msg ="Update"; 
    this.addPersonList.forEach((ele:any)=> {
      let tempsave = {
        Client_ID:this.clientId,
        Client_Name:this.ObjmasterClient.Client_Name,
        Address:this.ObjmasterClient.Address,					
        Pincode:this.ObjmasterClient.Pincode,				
        Category:this.ObjmasterClient.Category,						
        Google_Maps_Link:this.ObjmasterClient.Google_Maps_Link,				
        Document_Name:"NA",					
        Alert_Manager_SMS:this.ObjmasterClient. Alert_Manager_SMS?1:0,					
        Alert_Manager_Email:this.ObjmasterClient.Alert_Manager_Email?1:0,			
        Alert_Manager_Whatsapp:this.ObjmasterClient.Alert_Manager_Whatsapp?1:0,		
        Alert_SubClient_SMS:this.ObjmasterClient.Alert_SubClient_SMS?1:0,				
        Alert_SubClient_Email:this.ObjmasterClient.Alert_SubClient_Email?1:0,					
        Alert_SubClient_Whatsapp:this.ObjmasterClient.Alert_SubClient_Whatsapp?1:0,
        Contact_Name:ele.name,
        Contact_Phone_No:ele.phone, 
        Contact_Email_Id:ele.email,
      }
      savedata.push(tempsave);
    });
    console.log("Edit");
   }
   else {
    repoetName = "Waste_Mng_Master_Client_Create";
    msg ="Create"; 
    this.addPersonList.forEach((ele:any)=> {
      let tempsave = {
        Client_Name:this.ObjmasterClient.Client_Name,
        Address:this.ObjmasterClient.Address,					
        Pincode:this.ObjmasterClient.Pincode,				
        Category:this.ObjmasterClient.Category,						
        Google_Maps_Link:this.ObjmasterClient.Google_Maps_Link,				
        Document_Name:"NA",					
        Alert_Manager_SMS:this.ObjmasterClient. Alert_Manager_SMS?1:0,					
        Alert_Manager_Email:this.ObjmasterClient.Alert_Manager_Email?1:0,			
        Alert_Manager_Whatsapp:this.ObjmasterClient.Alert_Manager_Whatsapp?1:0,		
        Alert_SubClient_SMS:this.ObjmasterClient.Alert_SubClient_SMS?1:0,				
        Alert_SubClient_Email:this.ObjmasterClient.Alert_SubClient_Email?1:0,					
        Alert_SubClient_Whatsapp:this.ObjmasterClient.Alert_SubClient_Whatsapp?1:0,
        Contact_Name:ele.name,
        Contact_Phone_No:ele.phone, 
        Contact_Email_Id:ele.email,
      }
      savedata.push(tempsave);
    });
    console.log("Save");
   }
    console.log("repoetName",savedata);
    const ParamObj:any = {
        "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name":repoetName
      }
      this.apicall.PostData(ParamObj,JSON.stringify(savedata)).subscribe((data:any)=>{
        console.log("data",data);
        if (data[0].Column1) { 
          this.addPersonList = [];
          this.masterClientSubmit = false;
          this.clientId = undefined;
          this.ObjmasterClient = new masterClient();
          this.ObjcontactPerson = new contactPerson();
          this.GetAllBrowse();
          this.compacctToast.clear();
          this.compacctToast.add({
            key:"compacct-toast",
            severity: "success",
            summary: 'Succesfully '+msg,
            detail: "Master Client Succesfully "+msg
          });
          
        }
        else {
          this.compacctToast.clear();
          this.compacctToast.add({
            key:"compacct-toast",
            severity: "error",
            summary: "error",
            detail: "Error Occured"
          });
        }
      })
  }
 
}
GetAllBrowse(){
  const ParamObj:any = {
    "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
    "Report_Name":"Waste_Mng_Master_Client_Browse"
   }
   this.apicall.GetData(ParamObj).subscribe((data:any)=>{
     this.getAllData = data;
     console.log("All Data",this.getAllData);
   })
}
onConfirm(){
  if(this.clientId){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Active_Waste_Mng_Master_Client"
    }
    this.apicall.PostData(obj, JSON.stringify({Client_ID: this.clientId})).subscribe((data:any)=>{
      if (data[0].Column1 === "Done"){
        this.act_popup = false;
        this.onReject();
         this.GetAllBrowse();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Product ID: " + this.clientId,
            detail: "Succesfully Active"
          });
      }

    })
  }
}
onConfirm2(){
  if(this.clientId){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Deactive_Waste_Mng_Master_Client"
    }
    this.apicall.PostData(obj, JSON.stringify({Client_ID: this.clientId})).subscribe((data:any)=>{
      if (data[0].Column1 === "Done"){
        this.can_popup = false;
        this.onReject();
         this.GetAllBrowse();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Product ID: " + this.clientId,
            detail: "Succesfully Deactive"
          });
      }

    })
  }
}
onReject() {
  this.compacctToast.clear('c');
}

clear() {
  this.compacctToast.clear();
}
Edit(col:any){
 if(col.Client_ID){
   console.log("col",col);
   this.clientId = 0;
   this.clientId = col.Client_ID
   this.tabIndexToView = 1;
    this.items = ["BROWSE", "UPDATE"];
    this.buttonname = "Update";
    this.GetEditMasterclient(col.Client_ID);
  
 }
}
GetEditMasterclient(id:number){
  const ParamObj:any = {
    "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
    "Report_Name":"Get_Waste_Mng_Master_Client_Edit_Data"
   }
   const savedata = {
    Client_ID:id
   }
   this.apicall.PostData(ParamObj,JSON.stringify(savedata)).subscribe((data:any)=>{
     this.ObjmasterClient = data[0];
     console.log("Edit",data);
     console.log("ObjmasterClient",this.ObjmasterClient);
     data.forEach((ele:any) => {
        this.addPersonList.push({
          name:ele.Client_Name,
          phone:ele.Contact_Phone_No,
          email:ele.Contact_Email_Id
        })
     });
   })
}
DeleteContact(index:any){
  this.addPersonList.splice(index, 1);
}
Active(row:any){
  this.can_popup = false;
  this.clientId = undefined ;
  if(row.Client_ID){
    this.act_popup = true;
    this.clientId = row.Client_ID ;
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
  this.act_popup = false;
  this.clientId = undefined ;
  if(col.Client_ID){
    this.can_popup = true;
    this.clientId = col.Client_ID ;
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
  
}

class masterClient {
  Client_Name:any
  Address:any					
  Pincode:any				
  Category:any						
  Google_Maps_Link:any				
  Document_Name:string = "NA"					
  Alert_Manager_SMS:boolean = false;					
  Alert_Manager_Email:boolean = false;			
  Alert_Manager_Whatsapp:boolean = false;		
  Alert_SubClient_SMS:boolean = false;				
  Alert_SubClient_Email:boolean = false;					
  Alert_SubClient_Whatsapp:boolean=  false;	
}
class contactPerson{
  Contact_Name:any
  Contact_Phone_No:any 
  Contact_Email_Id:any
}