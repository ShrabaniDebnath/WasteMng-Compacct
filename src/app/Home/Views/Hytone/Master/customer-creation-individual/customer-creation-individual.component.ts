import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateTimeConvertService } from 'src/app/Service/dateTime.service';

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
  addVerificationReportList:any = [];
  VerificationDate = new Date();
  pincodeList:any = [];
  phoneFormSubmitted = false;
  emailIdFormSubmitted = false;
  addPhoneList:any = [];
  addEmailIdList:any = [];
  PostOfficeList:any = [];
  GetAlldataList:any = [];
  constructor(private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private DateService: DateTimeConvertService,
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
    this.getOccupation();
    this.getRelation();
    this.getDocument();
    this.getBankName();
    this.getAsset();
    this.getAgency();
    this.getUser();
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
   clearData(){
    this.customerFormSubmitted = false;
    this.AddressFormSubmitted = false;
    this.OccupationFormSubmitted = false;
    this.DependentFormSubmitted = false;
    this.OtheraddressFormSubmitted = false;
    this.DocumentFormSubmitted = false;
    this.BankFormSubmitted = false;
    this.phoneFormSubmitted = false;
    this.emailIdFormSubmitted = false;
    this.VerificationReportFormSubmit = false;
    this.fatherDetalisFormSubmit = false;
    this.addFatherDetalis=[];
    this.motherDetalisFormSubmit = false;
    this.addMotherDetalisList=[];
    this.SpouseDetalisFormSubmit = false;
    this.addSpouseDetalisList = [];
    this.ReferenceFormSubmit = false;
    this.addReferenceList = [];
    this.assetDetalisFormSubmit = false;
    this.addAssetList =[];
    this.CreditReportFormsubmit = false;
    this.addCreditReportList = [];
    this.objcustomer = new customer();
    this.objaddress = new address();
    this.objasset = new asset();
    this.objbank = new bank();
    this.objDependent= new Dependent();
    this.objFatherDetails = new FatherDetails();
    this.objMotherDetails = new MotherDetails();
    this.objDocument = new Document();
    this.objReference = new Reference();
    this.objSpouseDetails = new SpouseDetails();
    this.objVerificationReport = new VerificationReport();
    this.objCreditReport = new CreditReport();
    this.VerificationDate = new Date();
    this.Spinner = false;
    this.addVerificationReportList = [];
    this.addBankList = [];
    this.AddOtheraddressList = [];
    this.DependentAddList = [];
    this.OccupationAddList = [];
    this.addEmailIdList = [];
    this.addPhoneList = [];
    this.addressList = [];
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
   const tempFilterCustType = this.typeList.filter((el:any)=>Number(el.Cust_Type_ID) === Number(this.objaddress.Cust_Type_ID))
   const tempFilterPoliceStation= this.PoliceStationList.filter((el:any)=>Number(el.Police_Station_ID) === Number(this.objaddress.Police_Station_ID))
   const tempFilterPincode = this.pincodeList.filter((el:any)=>Number(el.Pincode_ID) === Number(this.objaddress.Pincode_ID))
   const tempFilterPostOffice = this.PostOfficeList.filter((el:any)=>Number(el.Post_Office_ID) === Number(this.objaddress.Post_Office_ID))

   if(valid){
     this.addressList.push({
      Cust_Type_ID:this.objaddress.Cust_Type_ID,
      Address_Type:tempFilterCustType[0].Cust_Type,
      Address:this.objaddress.Address,				
      Police_Station_ID:this.objaddress.Police_Station_ID,
      Police_Station_Name:tempFilterPoliceStation[0].Police_Station_Name,
      Pincode_ID:this.objaddress.Pincode_ID,
      Pincode:tempFilterPincode[0].Pincode,
      Post_Office_ID:this.objaddress.Post_Office_ID,
      Post_Office_Name:tempFilterPostOffice[0].Post_Office_Name
     })
     this.AddressFormSubmitted = false;
     this.objaddress = new address();
   }
  }
  addPhone(valid:any){
    this.phoneFormSubmitted = true;
    if(valid){
      this.addPhoneList.push({
        Mobile_No:this.PhoneNumber
      })
      this.PhoneNumber = undefined;
      this.phoneFormSubmitted = false;
    }
  }
  addEmailId(valid:any){
    this.emailIdFormSubmitted = true;
    if(valid){
      this.addEmailIdList.push({
        Email_ID:this.emailId
      })
      this.emailId = undefined;
      this.emailIdFormSubmitted = false;
      console.log("addEmailIdList",this.addEmailIdList);
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
    else if(value === "Bank_Details"){
      this.addBankList.splice(index, 1);
    }
    else if(value === "Mother_Detalis"){
      this.addMotherDetalisList.splice(index, 1);
    }
    else if(value === "Spouse_Details"){
      this.addSpouseDetalisList.splice(index, 1);
    }
    else if(value === "Reference"){
      this.addReferenceList.splice(index, 1);
    }
    else if(value === "Asset"){
      this.addAssetList.splice(index, 1);
    }
    else if(value === "Credit_Report"){
      this.addCreditReportList.splice(index, 1);
    }
    else if(value === "Verification_Report"){
      this.addVerificationReportList.splice(index, 1);
    }
    else if(value === "Address"){
      this.addressList.splice(index, 1);
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
      Occupation_name: tempGetOccupationname[0].Occupation_Name,
      Occupation_ID: this.OccupationID
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
   this.BankFormSubmitted = true;
   if(valid){
     const tempFilterbank = this.bankNameList.filter((el:any)=>Number(el.Bank_ID) === Number(this.objbank.Bank_ID));
     const tempFilterIESC = this.IFSCList.filter((el:any)=>Number(el.IFSC_ID) === Number(this.objbank.IFSC_ID))
    this.addBankList.push({
      Bank_ID:this.objbank.Bank_ID,
      Bank_Name:tempFilterbank[0].Bank_Name,
      Account_No:this.objbank.Account_No,
      IFSC_ID:this.objbank.IFSC_ID,
      IFSC_Code : tempFilterIESC[0].IFSC_Code,
      Branch_Name:this.objbank.Branch_Name
    })
    this.BankFormSubmitted = false;
    this.objbank = new bank();
   }
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
   this.motherDetalisFormSubmit = true;
   if(valid){
    this.addMotherDetalisList.push({
      Mother_Adress : this.objMotherDetails.Mother_Adress,
      Mother_Phone_No : this.objMotherDetails.Mother_Phone_No
    })
    this.objMotherDetails = new MotherDetails();
    this.motherDetalisFormSubmit = false;
   }
  }
  addSpouseDetalis(valid:any){
  console.log("Spouse Detalis valid",valid);
  this.SpouseDetalisFormSubmit = true;
  if(valid){
    this.addSpouseDetalisList.push({
      Address:this.objSpouseDetails.Address,
      Spouse_Phone_No:this.objSpouseDetails.Spouse_Phone_No,
    })
    this.objSpouseDetails = new SpouseDetails();
    this.SpouseDetalisFormSubmit = false;
   }
  }
  addReference(valid:any){
   console.log("Reference Valid",valid);
   this.ReferenceFormSubmit = true;
   if(valid){
     const tempFilter = this.RelationList.filter((el:any)=>Number(el.Relation_ID) === Number(this.objReference.Relation_ID))
    this.addReferenceList.push({
      Reference_Name:this.objReference.Reference_Name,
      Relation_ID:this.objReference.Relation_ID,
      Relation_Name:tempFilter[0].Relation_Name,
      Address:this.objReference.Address,
      Phone_No:this.objReference.Phone_No,
    })
    this.ReferenceFormSubmit = false;
    this.objReference = new Reference();
   }
  }
  addassetDetalis(valid:any){
  console.log("Asset Detalis valid",valid)
  this.assetDetalisFormSubmit = true;
  if(valid){
      const tempFilter = this.AssetList.filter((el:any)=>Number(el.Asset_ID) === Number(this.objasset.Asset_ID))
     this.addAssetList.push({
      Asset_ID:this.objasset.Asset_ID,
      Asset_Name : tempFilter[0].Asset_Name,
      Asset_value:this.objasset.Asset_value
     })
     this.assetDetalisFormSubmit = false;
     this.objasset = new asset();
    }
  
  }
  addCreditReport(valid:any){
   console.log("Credit Report",valid);
   this.CreditReportFormsubmit = true;
   if(valid){
   this.addCreditReportList.push({
    CIC_Name:this.objCreditReport.CIC_Name,
	  Score:this.objCreditReport.Score
   })
   this.CreditReportFormsubmit = false;
   this.objCreditReport = new CreditReport();
  }
  }
  addVerificationReport(valid:any){
    console.log("Credit Report",valid);
    this.VerificationReportFormSubmit = true;
    if(valid){
      const tempFilterUser = this.EmployeeusernameList.filter((el:any)=>Number(el.User_ID) === Number(this.objVerificationReport.User_ID))
      const tempFilteragent = this.AgencyList.filter((el:any)=>Number(el.Agent_ID) === Number(this.objVerificationReport.Agent_ID))
      let user = undefined;
      let agencyName = undefined;
      if(tempFilterUser.length){
       user =  tempFilterUser[0].User_Name
      }
      if(tempFilteragent.length){
        agencyName = tempFilteragent[0].Name
      }
      this.addVerificationReportList.push({
      Agent_ID:this.objVerificationReport.Agent_ID ? this.objVerificationReport.Agent_ID : undefined,
      Agent_Name: agencyName ? agencyName :undefined,
      Report_Reference_No:this.objVerificationReport.Report_Reference_No ? this.objVerificationReport.Report_Reference_No : undefined,
      User_ID:this.objVerificationReport.User_ID ? this.objVerificationReport.User_ID : undefined,
      User_Name:user ? user : undefined,
      Verification_Date:this.DateService.dateTimeConvert(new Date(this.VerificationDate))
     })
    this.VerificationReportFormSubmit = false;
    let Extrnal  = this.objVerificationReport.ExternalInternal;
    this.objVerificationReport = new VerificationReport();
    this.objVerificationReport.ExternalInternal = Extrnal;
    this.VerificationDate = new Date();
   }
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
      this.PostOfficeList = data;
       console.log('PostOfficeList=====',this.PostOfficeList)
       //this.seachSpinner = false;
     })
  }
  getPincode(){
    if(this.objaddress.Post_Office_ID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Get_Pincode_For_Dropdown"
       }
       this.apicall.PostData(obj,JSON.stringify({Post_Office_ID : this.objaddress.Post_Office_ID})).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        this.pincodeList = data;
         console.log('pincodeList=====',this.pincodeList)
         //this.seachSpinner = false;
       })
    }
    
  }
  getOccupation(){
    const obj = {
      "Sp_Name": "SP_Master_01",
      "Report_Name": "Get_Occupatin_Data_For_Dropdown"
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
      "Report_Name": "Get_Relation_Data_For_Dropdown"
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
    if(this.objbank.Bank_ID){
      const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Get_IFSC_For_Dropdown"
       }
       this.apicall.PostData(obj,JSON.stringify({Bank_ID : this.objbank.Bank_ID})).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        this.IFSCList = data;
         console.log('IFSCList=====',this.IFSCList)
         //this.seachSpinner = false;
       })
    }
    else{
      this.objbank.IFSC_ID = undefined
       this.objbank.Branch_Name = undefined
    }
   
  }
  getBranchName(){
    if(this.objbank.IFSC_ID){
      const tempFilter = this.IFSCList.filter((el:any)=>Number(el.IFSC_ID) === Number(this.objbank.IFSC_ID));
      this.objbank.Branch_Name = tempFilter[0].Branch_Name
    }
    else{
      this.objbank.Branch_Name = undefined
    }

  }
  getAsset(){
     const obj = {
        "Sp_Name": "SP_Master_01",
        "Report_Name": "Get_Asset_Name_For_Dropdown"
       }
       this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        this.AssetList = data;
         console.log('AssetList=====',this.AssetList)
         //this.seachSpinner = false;
       })
  
   
  }
  getAgency(){
    const obj = {
       "Sp_Name": "SP_Master_01",
       "Report_Name": "Get_Agency_Data_Dropdwn"
      }
      this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
       this.AgencyList = data;
        console.log('AgencyList=====',this.AgencyList)
        //this.seachSpinner = false;
      })
 }
 getUser(){
  const obj = {
     "Sp_Name": "SP_Master_01",
     "Report_Name": "Get_Master_User_Dropdown"
    }
    this.apicall.GetData(obj).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
     this.EmployeeusernameList = data;
      console.log('EmployeeusernameList=====',this.EmployeeusernameList)
      //this.seachSpinner = false;
    })
}
ExternalInternalChange(){
  if(this.objVerificationReport.ExternalInternal){
      this.addVerificationReportList = [];
      this.VerificationReportFormSubmit = false;
      let Extrnal  = this.objVerificationReport.ExternalInternal;
      this.objVerificationReport = new VerificationReport();
      this.objVerificationReport.ExternalInternal = Extrnal;
  }
}
saveCustomerCreation(valid:any){
 this.customerFormSubmitted = true;
 if(valid){
   let meg = "Create"
  this.Spinner = true;
    if(!this.addressList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Enter minimum one Address Detalis"
          });
      return
    }
    if(!this.addAssetList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Enter minimum one Asset Detalis"
          });
      return
    }
    if(!this.addBankList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Enter minimum one Bank Detalis"
          });
      return
    }
    if(!this.addPhoneList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Enter minimum one Phone Number"
          });
      return
    }
    if(!this.DependentAddList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum one Dependent Detalis"
          });
      return
    }
    if(!this.addEmailIdList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum one Email Id"
          });
      return
    }
    if(!this.addFatherDetalis.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Father Detalis"
          });
      return
    }
    if(!this.addMotherDetalisList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum  Mother Detalis"
          });
      return
    }
    if(!this.OccupationAddList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum one Occupation Detalis"
          });
      return
    }
    if(!this.AddOtheraddressList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum one Other Address"
          });
      return
    }
    if(!this.addDocumentList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Document Detalis"
          });
      return
    }
    if(!this.addReferenceList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Reference Detalis"
          });
      return
    }
    if(!this.addSpouseDetalisList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Spouse Detalis"
          });
      return
    }
    if(!this.addVerificationReportList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Verification Report"
          });
      return
    }
    if(!this.addCreditReportList.length){
      this.Spinner = false;
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message", 
            detail: "Enter minimum Credit Report"
          });
      return
    }
    this.objcustomer.Ad = this.addressList;
   this.objcustomer.Asset = this.addAssetList;
   this.objcustomer.Bank = this.addBankList;
   this.objcustomer.Contact = this.addPhoneList;
   this.objcustomer.Dependent = this.DependentAddList;
   this.objcustomer.Email = this.addEmailIdList;
   this.objcustomer.Father = this.addFatherDetalis;
   this.objcustomer.Mother = this.addMotherDetalisList;
   this.objcustomer.Occupation = this.OccupationAddList;
   this.objcustomer.Other_A = this.AddOtheraddressList;
   this.objcustomer.Other_D = this.addDocumentList;
   this.objcustomer.Ref =this.addReferenceList;
   this.objcustomer.Spouse = this.addSpouseDetalisList;
   this.objcustomer.V_rep = this.addVerificationReportList;
   this.objcustomer.CIC = this.addCreditReportList;
   this.objVerificationReport.Verification_Date = this.DateService.dateTimeConvert(new Date(this.VerificationDate))
   console.log("Save",this.objcustomer);
   const ParamObj:any = {
    "Sp_Name":"SP_Master_01",
    "Report_Name":"Add_Master_Customer_Data"
  }
  this.apicall.PostData(ParamObj,JSON.stringify(this.objcustomer)).subscribe((data:any)=>{
    console.log("Save",data);
    if (data[0].Column1) {
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "success",
        summary: "Master Customar Type",
        detail: "Succesfully "+meg
      });
      this.GetBrowseData();
      this.clearData();
    }
  })
 }
 else{
  this.compacctToast.clear();
  this.compacctToast.add({
    key: "compacct-toast",
    severity: "error",
    summary: "Warn Message",
    detail: "Error Occured "
  });
 }
}
GetBrowseData(){
  //this.Searchlist = []
  const obj = {
    "Sp_Name": "SP_Master_01",
    "Report_Name": "Browse_Master_Customer_Data"
   }
   this.apicall.GetData(obj).subscribe((data:any)=>{
    this.GetAlldataList = data;
     console.log('GetAlldataList=====',this.GetAlldataList)
     //this.seachSpinner = false;
   })
}
EditProduct(col:any){

}
Active(col:any){

}
Inactive(col:any){

}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
class customer{
  Customer_Type:any = "Individual";
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
  Ad:any;
  Asset:any;
  Bank:any;
  Contact:any;
  Dependent:any;
  Email:any;
  Father:any;
  Mother:any;
  Occupation:any;
  Other_A:any;
  Other_D:any;
  Ref:any;
  Spouse:any;
  V_rep:any;
  CIC:any;
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