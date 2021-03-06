import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { never } from 'rxjs';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import {MessageService} from 'primeng/api';

import * as XLSX from 'xlsx';
import { FileUpload } from 'primeng/fileupload';
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
  tempDocumentArr = [];
  uploadedFiles: any[] = [];
  DocumentRemarks = "";
  EditFlag = false;
  DocumentRemarksSubmit = false;
  ObjmasterClient: masterClient = new masterClient ();
  ObjcontactPerson: contactPerson = new contactPerson ();
 
  @ViewChild("fileInput", { static: false }) fileInput!: FileUpload;
  DocumentList:any = [];
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
  OpenInNewTab(link:any) {
    if(link) {
      window.open(link,'_blank');
    }
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
  // onClear(e:any,file:any){
  //   for(let k=0;k < this.ProductPDFFile.length;k++){
  //     if(this.ProductPDFFile[k].name === file.name){
  //       this.ProductPDFFile.splice(k,1);
  //       this.tempDocumentArr.splice(k,1);
  //       this.fileInput.remove(e,k);
  //     }
  //   }
  // }
  addPerson(valid:any){
   // let addlist:any = []
   this.masterClientContactSubmit = true;
   console.log(valid)
   if(valid){
    let  addlist = {
      name:this.ObjcontactPerson.Contact_Name,
      phone:this.ObjcontactPerson.Contact_Phone_No,
      email:this.ObjcontactPerson.Contact_Email_Id,
      Designation:this.ObjcontactPerson.Designation
    }
    this.addPersonList.push(addlist);
    this.masterClientContactSubmit = false;
    this.ObjcontactPerson = new contactPerson();
    }
}
addDocuments(valid:any){
  this.DocumentRemarksSubmit = true;
 if(valid && this.ProductPDFFile['size']){
   const obj = {
     file : this.ProductPDFFile,
     Document_Remarks : this.DocumentRemarks
   }
   this.DocumentList.push(obj);
   this.PDFFlag = false;
   this.ProductPDFFile = {};
  //  this.fileInput.clear();
  console.log(this.DocumentList);
  this.DocumentRemarks = "";
  this.DocumentRemarksSubmit = false;
 }
}
onClear(e:any,file:any){
  this.DocumentList.splice(e, 1);
}
// 

// UploadDoc(ind:any) {
//   const formData: FormData = new FormData();
//   formData.append("file",this.ProductPDFFile[ind]);
//   const ConTyp = this.ProductPDFFile[ind].type;
//   const ext =  this.ProductPDFFile[ind].name.slice((this.ProductPDFFile[ind].name.lastIndexOf(".") - 1 >>> 0) + 2);
//   const endpoint = "https://onlineexamstudent.azurewebsites.net/api/Upload_Tender_Document?code=26GEc0CZNCQAr5vipV99JYVq61m76KzvL2uepn22liB4k9Ys5re9jg==&BlCont=ocpl&ConTyp="+ConTyp+"&FootFall="+this.FootFall+"&DId="+docId+"&ext="+ext;
//   return  this.$http.post(endpoint, formData).toPromise()
// }
// async SaveDoc (obj:any,id:any) {
//    const UploadDoc = await this.UploadDoc(id);
//    console.log(UploadDoc);
//    const UpdateDocObj = {
//     'Client_ID' :id,
//     'Document_Remarks' : this.DocumentRemarks,
//     'File_Path' : UploadDoc[0].ImageURL
//   }
//   const ParamObj:any = {
//     "Sp_Name":"SP_Waste_Mng_Master_Client_SubClient",
//     "Report_Name": 'Waste_Mng_Master_Client_Document_Create'
//   }
  
//   const UpdatedDOC = await this.apicall.PostData(ParamObj,JSON.stringify(UpdateDocObj)).toPromise();
//   console.log(UpdatedDOC)
// }
// async upload(id:any){
//   if(id) {
//     this.Spinner = true;
//     const endpoint = "/BL_CRM_Txn_Enq_Tender/Upload_Tender_Document";
//     for(let k=0;k < this.DocumentList.length;k++){
//       const formData: FormData = new FormData();
//     formData.append("anint",   id );
//     formData.append("aFile",   this.DocumentList[k] );
//     console.log(this.DocumentList[k]);
//       const mgs = await this.SaveDoc(this.DocumentList[k],id);
//       console.log('Done' + k);
//       const totalLength = this.ProductPDFFile.length -1;
//       if(k ===totalLength) {
//           this.compacctToast.clear();
//             this.compacctToast.add({
//               key: "compacct-toast",
//               severity: "success",
//               summary: "Lead ID  :" +id,
//               detail: "Document uploaded successfully"
//             });
//             //this.GetDocument(this.FootFall);
//             this.Spinner = false;
//             this.PDFFlag = false;
//             this.ProductPDFFile = [];
//             this.fileInput.clear();
//             this.tempDocumentArr = [];
//             // this.tempDocumentObj ={
//             //   'file': {},
//             //   'Remarks' :'',
//             //   'Doc_Name' : ''
//             // }
//             this.DocumentRemarksSubmit = false;
//             //this.ObjDocument = new Document();
//           console.group("Compacct V2");
//           console.log("%c  Document Sucess:", "color:green;");
//           console.log(endpoint);
//       }
//     }
// };

// }
saveMasterClient(valid:any){
this.masterClientSubmit = true;
 if(valid && this.ChangeMapLink()){
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
        Designation:ele.Designation
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
        Designation:ele.Designation
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
          this.EditFlag = false;
          this.ObjmasterClient = new masterClient();
          this.ObjcontactPerson = new contactPerson();
          this.GetAllBrowse();
          this.items = ["BROWSE", "CREATE"];
          this.buttonname = "Create";
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
          name:ele.Contact_Name,
          phone:ele.Contact_Phone_No,
          email:ele.Contact_Email_Id,
          Designation:ele.Designation
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
exportexcel(Arr:any,fileName:any): void {
  let Arr2:any = [];
  Arr.forEach((element:any) => {
    const obj = {
      Client_Name: element.Client_Name,
      Address: element.Address,
      Category: element.Category,
      Google_Maps_Link: element.Google_Maps_Link,
      Alert_Manager_SMS: element.Alert_Manager_SMS ? "Yes" : "NO",
      Alert_Manager_Email: element.Alert_Manager_Email ? "Yes" : "NO",
      Alert_Manager_Whatsapp: element.Alert_Manager_Whatsapp ? "Yes" : "NO",
    }
    Arr2.push(obj)
  });
  
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Arr2);
  const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
  XLSX.writeFile(workbook, fileName+'.xlsx');
}
ChangeMapLink(){
  if(this.ObjmasterClient.Google_Maps_Link) {
   const  pattern1 = new RegExp("https://www.google.com/maps.*");
   const valid1 = pattern1.test(this.ObjmasterClient.Google_Maps_Link);
   if(!valid1) {
    const  pattern2 = new RegExp("https://goo.gl/maps.*");
    const valid2 = pattern2.test(this.ObjmasterClient.Google_Maps_Link);
      return  valid2;
   } else {
    return true;
   }
  } else {
    return false;
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
  Designation:any
} 