import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { never } from 'rxjs';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-master-sub-client',
  templateUrl: './master-sub-client.component.html',
  styleUrls: ['./master-sub-client.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class MasterSubClientComponent implements OnInit {
  items:any = [];
  tabIndexToView = 0;
  masterClientList:any = [];
  mastersubClientSubmit = false;
  addressCheckHou = false;
  loading = false;
  addressCheckCor = false;
  pricingplanList:any=[];
  Pricing :any=undefined;
  Spinner = false;
  SubclientId:any=0;
  buttonname = "Create";
  objsubClient :subClient = new subClient();
  ObjcontactPerson: contactPerson = new contactPerson();
  addPersonList:any = [];
  getAllData:any =[]; 
  can_popup = false;
  act_popup = false;
  masterClientContactSubmit = false;
  link:any = undefined;
  constructor(private apicall : ApiService,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Sub Client",
      Link: " Master Sub Client"
    });
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create"
    this.GetMasterClient();
    this.GetAllBrowse();
   }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.mastersubClientSubmit =false;
    this.masterClientContactSubmit = false;
    this.SubclientId = undefined;
    this.addPersonList = [];
    this.objsubClient = new subClient();
    this.ObjcontactPerson = new contactPerson();
    this.link = undefined;
   
   }
   GetMasterClient(){
    
    const ParamObj:any = {
      "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name":"Waste_Mng_Master_Client_Browse"
     }
     this.apicall.GetData(ParamObj).subscribe((data:any)=>{
       this.masterClientList = data;
       console.log("All masterClientList",this.masterClientList);
     })
   }
  
  onReject() {
    this.compacctToast.clear('c');
  }
  clear() {
    this.compacctToast.clear();
  }
  MasterChange(){
    this.Getpricingplan(this.objsubClient.Client_ID);
    const selmaster = this.masterClientList.filter((ele:any)=> Number(ele.Client_ID) === Number(this.objsubClient.Client_ID))
     console.log("selmaster",selmaster[0]);
      this.objsubClient.Alert_SubClient_Email = selmaster[0].Alert_SubClient_Email;
      this.objsubClient.Alert_SubClient_SMS = selmaster[0].Alert_SubClient_SMS;
      this.objsubClient.Alert_SubClient_Whatsapp = selmaster[0].Alert_SubClient_Whatsapp;
     if(selmaster[0].Category === "Housing"){
       this.addressCheckCor = false;
       this.addressCheckHou = true;
       this.objsubClient.Google_Maps_Link = selmaster[0].Google_Maps_Link;
       this.objsubClient.Sub_Client_Address = undefined;
       this.objsubClient.Sub_Client_Pincode = undefined;
     }
     else {
       this.objsubClient.Google_Maps_Link = this.link ? this.link :"";
       this.addressCheckHou = false;
      this.addressCheckCor = true;
      this.objsubClient.Sub_Client_Tower = undefined;
       this.objsubClient.Sub_Client_Flat_No = undefined;
     }
  }
  Getpricingplan(id:any,value?:any){
    this.pricingplanList = [];
    this.objsubClient.Product_ID  =  undefined;
    if(id) {
      const ParamObj:any = {
        "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name":"Get_Product_Price_Plan_For_Sub_Client"
       }
      
       this.apicall.GetData(ParamObj).subscribe((data:any)=>{
         this.pricingplanList = data;
         console.log("All pricingplanList",this.pricingplanList);
         this.objsubClient.Product_ID  = value ? value : undefined;
       })
    }
    
  }
  DeleteContact(index:any){
    this.addPersonList.splice(index, 1);
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
 saveMastersubClient(valid:any){
   console.log("valid",valid);
   this.mastersubClientSubmit =true;
  if(valid){
    if(!this.objsubClient.Alert_SubClient_Email && !this.objsubClient.Alert_SubClient_SMS && !this.objsubClient.Alert_SubClient_Whatsapp){
      this.compacctToast.clear();
      this.compacctToast.add({
        key:"compacct-toast",
        severity: "error",
        summary: "Try Again",
        detail: "Selete minimum one field on Collection Alert Manager"
      });
      return
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
   let savedata:any = [];
   if(this.SubclientId){
    repoetName = "Waste_Mng_Master_SubClient_Update";
    msg ="Update";
    this.addPersonList.forEach((ele:any) => {
      let tempData = {
       Sub_Client_ID:Number(this.SubclientId),
       Client_ID:Number(this.objsubClient.Client_ID),
       Sub_Client_Name:this.objsubClient.Sub_Client_Name,
       Plan_Name:this.objsubClient.Product_ID,
       Google_Maps_Link:this.objsubClient.Google_Maps_Link,
       Sub_Client_Address:this.objsubClient.Sub_Client_Address?this.objsubClient.Sub_Client_Address : "NA",
       Sub_Client_Pincode:this.objsubClient.Sub_Client_Pincode?this.objsubClient.Sub_Client_Pincode : "NA",
       Sub_Client_Tower:this.objsubClient.Sub_Client_Tower?this.objsubClient.Sub_Client_Tower : "NA",
       Sub_Client_Flat_No:this.objsubClient.Sub_Client_Flat_No?this.objsubClient.Sub_Client_Flat_No : "NA",
       Alert_SubClient_Email:this.objsubClient.Alert_SubClient_Email?1:0,
       Alert_SubClient_SMS:this.objsubClient.Alert_SubClient_SMS?1:0,
       Alert_SubClient_Whatsapp:this.objsubClient.Alert_SubClient_Whatsapp?1:0,
       Contact_Name:ele.name,
       Contact_Phone_No:ele.phone,
       Contact_Email_Id:ele.email
      }
      savedata.push(tempData)
    });
   }
   else{
    repoetName = "Waste_Mng_Master_SubClient_Create";
    msg ="Create"; 
    this.addPersonList.forEach((ele:any) => {
      let tempData = {
       Client_ID:Number(this.objsubClient.Client_ID),
       Sub_Client_Name:this.objsubClient.Sub_Client_Name,
       Plan_Name:this.objsubClient.Product_ID,
       Google_Maps_Link:this.objsubClient.Google_Maps_Link,
       Sub_Client_Address:this.objsubClient.Sub_Client_Address?this.objsubClient.Sub_Client_Address : "NA",
       Sub_Client_Pincode:this.objsubClient.Sub_Client_Pincode?this.objsubClient.Sub_Client_Pincode : "NA",
       Sub_Client_Tower:this.objsubClient.Sub_Client_Tower?this.objsubClient.Sub_Client_Tower : "NA",
       Sub_Client_Flat_No:this.objsubClient.Sub_Client_Flat_No?this.objsubClient.Sub_Client_Flat_No : "NA",
       Alert_SubClient_Email:this.objsubClient.Alert_SubClient_Email?1:0,
       Alert_SubClient_SMS:this.objsubClient.Alert_SubClient_SMS?1:0,
       Alert_SubClient_Whatsapp:this.objsubClient.Alert_SubClient_Whatsapp?1:0,
       Contact_Name:ele.name,
       Contact_Phone_No:ele.phone,
       Contact_Email_Id:ele.email
      }
      savedata.push(tempData)
    });
   }
   console.log("save Data",savedata);
   console.log("repoetName",repoetName);
   const ParamObj:any = {
    "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
    "Report_Name":repoetName
  }
  this.apicall.PostData(ParamObj,JSON.stringify(savedata)).subscribe((data:any)=>{
    console.log("After save",data);
    if (data[0].Column1) { 
      this.addPersonList = [];
      this.mastersubClientSubmit = false;
      this.objsubClient = new subClient();
      this.ObjcontactPerson = new contactPerson();
      this.SubclientId = undefined;
      this.link = undefined;
      this.Pricing = undefined;
      this.addressCheckHou = false;
      this.GetAllBrowse();
      this.compacctToast.clear();
      this.compacctToast.add({
        key:"compacct-toast",
        severity: "success",
        summary: 'Succesfully '+msg,
        detail: "Master Sub Client Succesfully "+msg
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
    "Report_Name":"Waste_Mng_Master_SubClient_Browse"
   }
   this.apicall.GetData(ParamObj).subscribe((data:any)=>{
     this.getAllData = data;
     console.log("All Data",this.getAllData);
   })
}
getEventValue($event:any) :string {
  return $event.target.value;
}
Edit(col:any){
 if(col.Sub_Client_ID){
  this.SubclientId = 0;
  this.SubclientId = col.Sub_Client_ID;
  this.tabIndexToView = 1;
  this.link = undefined;
  this.objsubClient = new subClient();
  this.ObjcontactPerson = new contactPerson();
  this.addPersonList = [];
  this.mastersubClientSubmit =false;
  this.masterClientContactSubmit = false;
  this.items = ["BROWSE", "UPDATE"];
  this.buttonname = "Update";
  this.GetEditMasterSubclient(col.Sub_Client_ID);
  
 }
}
 GetEditMasterSubclient(id:number){
  const ParamObj:any = {
    "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
    "Report_Name":"Get_Waste_Mng_Master_SubClient_Edit_Data"
   }
   const savedata = {
    Sub_Client_ID:id
   }
   this.apicall.PostData(ParamObj,JSON.stringify(savedata)).subscribe((data:any)=>{
    this.Getpricingplan(data[0].Client_ID,data[0].Product_ID);
     this.objsubClient = data[0];
    this.link = data[0].Google_Maps_Link;
     data.forEach((ele:any) => {
        this.addPersonList.push({
          name:ele.Contact_Name,
          phone:ele.Contact_Phone_No,
          email:ele.Contact_Email_Id
        })
     });
     console.log("addPersonList",this.addPersonList);
     const selmaster = this.masterClientList.filter((ele:any)=> Number(ele.Client_ID) === Number(this.objsubClient.Client_ID))
     if(selmaster[0].Category === "Housing"){
      this.addressCheckCor = false;
      this.addressCheckHou = true;
      this.objsubClient.Sub_Client_Address = undefined;
      this.objsubClient.Sub_Client_Pincode = undefined;
    }
    else {
      this.addressCheckHou = false;
      this.addressCheckCor = true;
      this.objsubClient.Sub_Client_Tower = undefined;
      this.objsubClient.Sub_Client_Flat_No = undefined;
    }
   
 

   })
   
}
// PricingChange(){
//   const prichan = this.pricingplanList.filter((ele:any)=> Number(ele.Product_ID) === Number(this.objsubClient.Product_ID));
//   this.Pricing = prichan[0].Price;
// }
onConfirm(){
  if(this.SubclientId){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Active_Waste_Mng_Master_SubClient"
    }
    this.apicall.PostData(obj, JSON.stringify({Sub_Client_ID: this.SubclientId})).subscribe((data:any)=>{
      if (data[0].Column1 === "Done"){
        this.act_popup = false;
        this.onReject();
         this.GetAllBrowse();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Product ID: " + this.SubclientId,
            detail: "Succesfully Active"
          });
      }

    })
  }
}
onConfirm2(){
  if(this.SubclientId){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Deactive_Waste_Mng_Master_SubClient"
    }
    this.apicall.PostData(obj, JSON.stringify({Sub_Client_ID: this.SubclientId})).subscribe((data:any)=>{
      if (data[0].Column1 === "Done"){
        this.can_popup = false;
        this.onReject();
         this.GetAllBrowse();
          this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "success",
            summary: "Product ID: " + this.SubclientId,
            detail: "Succesfully Deactive"
          });
      }

    })
  }
}
Active(row:any){
  this.can_popup = false;
  this.SubclientId = undefined ;
  if(row.Sub_Client_ID){
    this.act_popup = true;
    this.SubclientId = row.Sub_Client_ID ;
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
  this.SubclientId = undefined ;
  if(col.Sub_Client_ID){
    this.can_popup = true;
    this.SubclientId = col.Sub_Client_ID ;
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
class subClient{
  Client_ID:any;
  Sub_Client_Name:any;
  Product_ID:any;
  Google_Maps_Link:any;
  Sub_Client_Address:any;
  Sub_Client_Pincode:any;
  Sub_Client_Tower:any;
  Sub_Client_Flat_No:any;
  Alert_SubClient_Email: any = false;
  Alert_SubClient_SMS:any = false;
  Alert_SubClient_Whatsapp:any = false;
}
class contactPerson{
  Contact_Name:any
  Contact_Phone_No:any 
  Contact_Email_Id:any
}