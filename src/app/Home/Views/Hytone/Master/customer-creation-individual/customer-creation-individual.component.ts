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
  emailId = undefined;
  PhoneNumber = undefined;
  OccupationID = undefined;
  DocumentID = undefined;
  OccupationAddList:any = [];
  DependentAddList:any = [];
  addDocumentList:any = [];
  bankList:any = [];
  IFSCList:any = [];
  addBankList:any = [];
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
  }
  DeleteContact(index:any){

  }
  addoccupation(valid:any){
   console.log("Ocuupation Valid",valid);
  }
  addDependent(valid:any){
    console.log("Dependent Valid",valid);
  }
  addOtherAddress(valid:any){
   console.log("Other Address",valid);
  }
  addDocumentsname(valid:any){
   console.log("Documents Name Valid",valid);
  }
  addBankDetalis(valid:any){
   console.log("Bank Detalis Valid",valid);
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
  Customer_ID:any;
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
}