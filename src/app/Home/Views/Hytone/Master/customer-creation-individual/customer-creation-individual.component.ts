import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-creation-individual',
  templateUrl: './customer-creation-individual.component.html',
  styleUrls: ['./customer-creation-individual.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class CustomerCreationIndividualComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  Spinner = false;
  GetAllDataList = [];
  can_popup = false;
  act_popup = false;
  loading = false;
  objcustomer = new customer();
  objaddress = new address();
  objasset = new asset();
  objbank = new bank();
  objDependent= new Dependent();
  objFatherDetails = new FatherDetails();
  objMotherDetails = new MotherDetails();
  objDocument = new Document();
  objReference = new Reference();
  objSpouseDetails = new SpouseDetails();
  objVerificationReport = new VerificationReport();
  objCreditReport = new CreditReport()
  customerFormSubmitted = false;
  AddressFormSubmitted = false;
  OccupationFormSubmitted = false;
  DependentFormSubmitted = false;
  OtheraddressFormSubmitted = false;
  DocumentFormSubmitted = false;
  BankFormSubmitted = false;
  typeList:any = [];
  PoliceStationList:any = [];
  addressList:any = [];
  OccupationList:any = [];
  RelationList:any = [];
  DocumentList:any = [];
  AddOtheraddressList:any = [];
  emailId = undefined;
  PhoneNumber = undefined;
  OccupationID = undefined;
  DocumentID = undefined;
  OccupationAddList:any = [];
  DependentAddList:any = [];
  addDocumentList:any = [];
  bankList:any = [];
  bankNameList:any = [];
  IFSCList:any = [];
  addBankList:any = [];
  fatherDetalisFormSubmit = false;
  addFatherDetalis:any=[];
  motherDetalisFormSubmit = false;
  addMotherDetalisList:any=[];
  SpouseDetalisFormSubmit = false;
  addSpouseDetalisList:any = [];
  ReferenceFormSubmit = false;
  addReferenceList:any = [];
  AssetList:any = [];
  assetDetalisFormSubmit = false;
  addAssetList:any =[];
  CreditReportFormsubmit = false;
  addCreditReportList:any = [];
  VerificationReportFormSubmit = false;
  AgencyList:any = [];
  EmployeeusernameList:any = [];
  addVerificationReportList = [];
  VerificationDate = new Date();
  pincodeList:any = [];
  phoneFormSubmitted = false;
  emailIdFormSubmitted = false;
  addPhoneList:any = [];
  addEmailIdList:any = [];
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Customar Creation (Individual)",
      Link: "Customar Creation (Individual)"
    });
    this.items = ["BROWSE", "CREATE"];
    this.getType();
    this.getPoliceStation();
    this.getPostOffice();
    this.getPincode();
    this.getOccupation();
    this.getRelation();
    this.getDocument();
    this.getBankName();
    this.getIFSC();
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
   clearData(){
     
   }
   onReject(){
    this.compacctToast.clear("c");
  }
  onConfirm(){
     
  }
  onConfirm2(){
    
  }
  addAddress(valid:any){
   console.log("Address valid",valid);
   this.AddressFormSubmitted = true;
   if(valid){
     this.AddressFormSubmitted = false;
   }
  }
  addPhone(valid:any){
    this.phoneFormSubmitted = true;
    if(valid){
      this.addPhoneList.push({
        phone:this.PhoneNumber
      })
      this.PhoneNumber = undefined;
      this.phoneFormSubmitted = false;
    }
  }
  addEmailId(valid:any){
    this.emailIdFormSubmitted = true;
    if(valid){
      this.addEmailIdList.push({
        Email:this.emailId
      })
      this.emailId = undefined;
      this.emailIdFormSubmitted = false;
    }
  }
  
  DeleteContact(index:any,value?:any){
    if(value === "phone"){
      this.addPhoneList.splice(index, 1);
    }
    else if(value === "email"){
      this.addEmailIdList.splice(index, 1);
    }
    else if(value === "Occupation_name"){
      this.OccupationAddList.splice(index, 1);
    }
    else if(value === "Dependent"){
      this.DependentAddList.splice(index, 1);
    }
    else if(value === "otherAddress"){
      this.AddOtheraddressList.splice(index, 1);
    }
    else if(value === "Document"){
      this.addDocumentList.splice(index, 1);
    }
    else if(value === "Father_Details"){
      this.addFatherDetalis.splice(index, 1);
    }
    else {
      console.log("Delete error")
    }
  }
  addoccupation(valid:any){
   console.log("Ocuupation Valid",valid);
   this.OccupationFormSubmitted = true;
   if(valid){
     const tempGetOccupationname = this.OccupationList.filter((el:any)=> Number(el.Occupation_ID) === Number(this.OccupationID))
    this.OccupationAddList.push({
      Occupation_name: tempGetOccupationname[0].Occupation_Name
    })
    this.OccupationFormSubmitted = false;
    this.OccupationID = undefined;
   }
  }
  addDependent(valid:any){
    console.log("Dependent Valid",valid);
    this.DependentFormSubmitted = true;
    if(valid){
      const tempnameFilter = this.RelationList.filter((el:any)=> Number(el.Relation_ID) === Number(this.objDependent.Relation_ID))
      this.DependentAddList.push({
      	Dependent_No: this.objDependent.Dependent_No,
        Dependent_Name: this.objDependent.Dependent_Name,
        Relation_ID:this.objDependent.Relation_ID,
        Relation_Name : tempnameFilter[0].Relation_Name
      })
      this.objDependent = new Dependent();
      this.DependentFormSubmitted = false;

    }
  }
  addOtherAddress(valid:any){
   console.log("Other Address",valid);
   this.OtheraddressFormSubmitted = true;
   if(valid){
    const tempFilter = this.DocumentList.filter((el:any)=> Number(el.Document_ID) === Number(this.objDocument.Document_ID))
    this.AddOtheraddressList.push({
      Document_ID:this.objDocument.Document_ID,
      Document_No:this.objDocument.Document_No,
      Document_Name:tempFilter[0].Document_Name
    })
    this.objDocument = new Document()
    this.OtheraddressFormSubmitted = false;
   }
  }
  addDocumentsname(valid:any){
   console.log("Documents Name Valid",valid);
   this.DocumentFormSubmitted = true;
   if(valid){
    const tempFilter = this.DocumentList.filter((el:any)=> Number(el.Document_ID) === Number(this.DocumentID))
    this.addDocumentList.push({
      Document_ID:this.DocumentID,
      Document_Name:tempFilter[0].Document_Name
    })
    this.objDocument = new Document()
    this.OtheraddressFormSubmitted = false;
   }
  }
  addBankDetalis(valid:any){
   console.log("Bank Detalis Valid",valid);
  }
  addfatherDetalis(valid:any){
   console.log("Father Detalis Valid",valid);
   this.fatherDetalisFormSubmit = true;
   if(valid){
    this.addFatherDetalis.push({
      Father_Adress : this.objFatherDetails.Father_Adress,
      Father_Phone_No : this.objFatherDetails.Father_Phone_No
    })
    this.objFatherDetails = new FatherDetails();
    this.fatherDetalisFormSubmit = false;
   }
  }
  addMotherDetalis(valid:any){
   console.log("Mother Detalis Valid",valid);
  }
  addSpouseDetalis(valid:any){
  console.log("Spouse Detalis valid",valid);
  }
  addReference(valid:any){
   console.log("Reference Valid",valid);
  }
  addassetDetalis(valid:any){
  console.log("Asset Detalis valid",valid)
  }
  addCreditReport(valid:any){
   console.log("Credit Report",valid);
  }
  getType(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Customer_Type_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.typeList = data;
       console.log('typeList=====',this.typeList)
       //this.seachSpinner = false;
     })
  }
  getPoliceStation(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Police_Station_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.PoliceStationList = data;
       console.log('PoliceStationList=====',this.PoliceStationList)
       //this.seachSpinner = false;
     })
  }
  getPostOffice(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Post_Office_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.PoliceStationList = data;
       console.log('PoliceStationList=====',this.PoliceStationList)
       //this.seachSpinner = false;
     })
  }
  getPincode(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Pincode_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.pincodeList = data;
       console.log('pincodeList=====',this.pincodeList)
       //this.seachSpinner = false;
     })
  }
  getOccupation(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Occupatin_Data_For_Dropdown "
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.OccupationList = data;
       console.log('OccupationList=====',this.OccupationList)
       //this.seachSpinner = false;
     })
  }
  getRelation(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Relation_Data_For_Dropdown  "
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.RelationList = data;
       console.log('RelationList=====',this.RelationList)
       //this.seachSpinner = false;
     })
  }
  getDocument(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Document_Data_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.DocumentList = data;
       console.log('DocumentList=====',this.DocumentList)
       //this.seachSpinner = false;
     })
  }
  getBankName(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Bank_Name_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.bankNameList = data;
       console.log('bankList=====',this.bankNameList)
       //this.seachSpinner = false;
     })
  }
  getIFSC(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_IFSC_For_Dropdown"
     }
     this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
      this.IFSCList = data;
       console.log('IFSCList=====',this.IFSCList)
       //this.seachSpinner = false;
     })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
class customer{
  Name:any;								
  Alias_Name:any;							
  Monthly_Income:any;						
  PAN_Card:any;					
  Aadhar_Card:any;				
  Passport:any;					
  Driving_License:any;				
  Voter_ID:any;						
  Father_Status:any;						
  Father_Name	:any;					
  Mother_Status	:any;				
  Mother_Name	:any;					
  Marital_Status:any;					
  Spouse_Name:any;
}
class address{
  Customer_ID:any
  Cust_Type_ID:any;
  Address_Type:any;			
  Address:any;				
  Police_Station_ID:any;
  Pincode_ID:any;
  Post_Office_ID:any;
}
class asset {
  Customer_ID:any;
  Asset_ID:any;
  Asset_value:any;
}

class bank{
  Customer_ID:any;
  Bank_ID:any;
  Account_No:any;
  IFSC_ID:any;
  Branch_Name:any;
}
class Dependent{
  Customer_ID:any;
	Dependent_No:any;
	Dependent_Name:any;
	Relation_ID:any;
}

class FatherDetails {
  Customer_ID:any;
  Father_Adress:any;
  Father_Phone_No:any;
}
class MotherDetails{
  Customer_ID:any;
	Mother_Adress:any;
	Mother_Phone_No:any;
}

class Document{
  Document_ID:any;
  Document_No:any;
}
class Reference{
  Customer_ID:any;
  Reference_Name:any;
  Relation_ID:any;
  Address:any;
  Phone_No:any;
}

class SpouseDetails{
  Customer_ID:any;
  Address:any;
  Spouse_Phone_No:any;
}

class VerificationReport{
  Customer_ID:any;
	Agent_ID:any;
	Report_Reference_No:any;
	User_ID:any;
	Verification_Date:any;
  ExternalInternal:any;
}
class CreditReport{
  Customer_ID:any;
	CIC_Name:any;
	Score:any;
}