import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class UserMasterComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Objuser = new user();
  userFormSubmitted = false;
  Spinner = false;
  alldataList = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  userID = undefined;
  loading = false;
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { 
   
    }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master User",
      Link: "Master User"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetBrowseData();
  }
  GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Browse_Master_User "
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
  onConfirm(){
    if(this.userID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Active_Master_User_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({User_ID  : this.userID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "User ID: " + this.userID,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  onConfirm2(){
    if(this.userID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Deactive_Master_User_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({User_ID : this.userID})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "user ID: " + this.userID ,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  Active(col:any){
    if(col.User_ID){
      this.can_popup = false;
      this.userID = undefined ;
      this.act_popup = true;
      this.userID = col.User_ID   ;
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
    if(col.User_ID){
      this.act_popup = false;
      this.userID = undefined ;
      this.can_popup = true;
     this.userID = col.User_ID;
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
  EditProduct(col:any){
    if(col.User_ID){
      this.userID = undefined;
      this.userID = col.User_ID;
      this.tabIndexToView = 1;
      this.Objuser = new user();
      this.userFormSubmitted = false;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Master_User_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({User_ID : col.User_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.Objuser = data[0];
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
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
    this.buttonname = "Create";
    this.Objuser = new user();
    this.userFormSubmitted = false;
    this.Spinner = false;
    this.can_popup = false;
    this.act_popup = false;
    this.userID = undefined;
    this.loading = false;
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  saveuserData(valid:any){
    this.userFormSubmitted = true;
    if(valid){
     this.Spinner = true;
     let saveData:any = [];
     let reportName = "";
     let meg="";
      if(this.userID){
       reportName = "Master_User_Update";
       meg="Update";
         saveData = {
          User_ID:this.userID,
          User_Name:this.Objuser.User_Name,
          Phone_No:this.Objuser.Phone_No,
          Email:this.Objuser.Email,
         }
      }
      else {
      const checkData = this.alldataList.filter((ele:any)=> ele.User_Name === this.Objuser.User_Name);
      if(!checkData.length){
        meg = "Create"
       reportName = "Add_Master_User";
       saveData = {
        User_Name:this.Objuser.User_Name,
        Phone_No:this.Objuser.Phone_No,
        Email:this.Objuser.Email,
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
           summary: "Master user",
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
class user{
  User_ID!:any;
  User_Name!:any;
  Phone_No!:any;
  Email!:any;
}