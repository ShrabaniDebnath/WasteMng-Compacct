import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
declare var $:any;

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CollectionDetailsComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  collectionBTN = "Non Collection";
  nonCollectionFlg = true;
  ObjCollectionDetails = new CollectionDetails();
  CollectionDetailsFormSubmitted = false;
  Spinner = false;
  CollDetailSearchlist = [];
  Clientlist = [];
  SubClientlist = [];
  Productlist = [];
  productaddSubmit:any = [];
  EditList = [];
  clientdisabled = false;
  Payment_In_Cash = false;
  loading = false;
  productDataList = [];
  stateOptions:any = [];
  PriceType= undefined;
  collectionList:any = [];
  tempArr:any = [];
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { 
    this.stateOptions = [{label: 'Bonus', value: 'Bonus'}, {label: 'Penalty', value: 'Penalty'}];
  }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Collection Details",
      Link: " Collection Details"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetClientData();
    //this.GetProductData();
    this.GetBrowseData();
    this.GetNonColl();
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  }
  TabClick(e:any) {
    this.tabIndexToView = e.index;
    this.items = ["BROWSE", "CREATE"];
    this.buttonname = "Create";
    this.nonCollectionFlg = true;
    this.collectionBTN = "Non Collection"
    this.clearData();
   }
   GetClientData(){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Waste_Mng_Master_Client_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      if(data.length) {
        data.forEach((element:any) => {
            element['label'] = element.Client_Name,
            element['value'] = element.Client_ID
          });
          this.Clientlist = data;
        } else {
          this.Clientlist = [];
  
        }
       console.log('Clientlist=====',this.Clientlist)
     })
   }
   GetSubClientData(){
    this.SubClientlist = [];
     if(this.ObjCollectionDetails.Client_ID) {
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Get_Master_SubClient"
       }
       this.apicall.PostData(obj, JSON.stringify({Client_ID: this.ObjCollectionDetails.Client_ID})).subscribe((data:any)=>{
       
        if(data.length) {
          data.forEach((element:any,i:any) => {
              element['label'] = element.Sub_Client_Name,
              element['value'] = element.Sub_Client_ID
            });
            this.SubClientlist = data;
          } else {
            this.SubClientlist = [];
    
          }
         console.log('SubClientlist=====',this.SubClientlist)
       })
     }
    
   }
   GetProductData(){
     const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Get_Master_Product_Price_Plan"
     }
     this.apicall.PostData(obj, JSON.stringify({Sub_Client_ID: this.ObjCollectionDetails.Sub_Client_ID})).subscribe((data:any)=>{
      if(data.length) {
        data.forEach((element:any) => {
            element['label'] = element.Product_Name,
            element['value'] = element.Product_ID
          });
          this.productDataList = data;
        } else {
          this.productDataList = [];
  
        }
       console.log('productDataList=====',this.productDataList)
     })
   }
   ProductdetailsChange() {
    this.ObjCollectionDetails.Price =  undefined;
  if(this.ObjCollectionDetails.Product_ID) {
    const ctrl = this;
    const productObj = $.grep(ctrl.productDataList,function(item:any) {return item.value == ctrl.ObjCollectionDetails.Product_ID})[0];
    console.log(productObj);
    this.ObjCollectionDetails.Product_Name =  productObj  && productObj.Product_Name ? productObj.Product_Name : undefined;
    this.ObjCollectionDetails.Price =  productObj  && productObj.Price ? productObj.Price : undefined;
  
  }
   }
   add(valid:any){
    this.CollectionDetailsFormSubmitted = true;
    this.clientdisabled = true;
    console.log("valid",valid);
    console.log("Getsameproduct",this.Getsameproduct());
     if(valid && this.Getsameproduct()){
       var productObj = {
       Product_ID : this.ObjCollectionDetails.Product_ID,
       Product_Name : this.ObjCollectionDetails.Product_Name,
       Price : this.ObjCollectionDetails.Price,
       Qty : this.ObjCollectionDetails.Qty,
       Amount : Number(this.ObjCollectionDetails.Price) * Number(this.ObjCollectionDetails.Qty)
     };
     this.productaddSubmit.push(productObj);
     //console.log("Product Submit",this.productaddSubmit);
     this.CollectionDetailsFormSubmitted = false;
     this.ObjCollectionDetails.Product_ID = undefined;
     this.ObjCollectionDetails.Price = undefined;
     this.ObjCollectionDetails.Qty = undefined;
    this.ChangePrice();
     //this.ObjProductPlan = new ProductPlan();
    }
   }
    Getsameproduct () {
    const sameproduct = this.productaddSubmit.filter((item:any)=> Number(item.Product_ID) === Number(this.ObjCollectionDetails.Product_ID) );
    if(sameproduct.length) {
      this.compacctToast.clear();
          this.compacctToast.add({
            key: "compacct-toast",
            severity: "error",
            summary: "Warn Message",
            detail: "Can't add same product."
          });
      return false;
    } 
    else {
        return true;
      }
    }
   delete(index:any) {
    this.productaddSubmit.splice(index,1);
    this.ChangePrice();
  
  }
   createMasterProductPlan(valid?:any){
     if(this.productaddSubmit.length) {
        this.tempArr = [];
        this.Spinner = true;
        this.productaddSubmit.forEach((item:any) => {
          const obj = {
              Product_ID : item.Product_ID,
              Product_Name : item.Product_Name,
              Price : Number(item.Price),
              Qty : Number(item.Qty),
              Amount : Number(item.Amount)
          }
    
        const TempObj = {
          Unique_ID : this.ObjCollectionDetails.Unique_ID ? this.ObjCollectionDetails.Unique_ID : 0,
          Client_ID : this.ObjCollectionDetails.Client_ID,
          Sub_Client_ID : this.ObjCollectionDetails.Sub_Client_ID,
          Payment_In_Cash : this.Payment_In_Cash ? 1 : 0,
          Grand_Total: this.ObjCollectionDetails.Grand_Total ? this.ObjCollectionDetails.Grand_Total : 0,
          Bonus:this.ObjCollectionDetails.Price_Type === "Bonus" ? this.ObjCollectionDetails.Amount : null,
          Penalty:this.ObjCollectionDetails.Price_Type === "Penalty" ? this.ObjCollectionDetails.Amount : null,
          Non_Collection_Reason : this.ObjCollectionDetails.Non_Collection_Reason_ID ? this.ObjCollectionDetails.Non_Collection_Reason_ID : 0,
          Remarks :  this.ObjCollectionDetails.Remarks,
          Status : "COLLECTED",
          Doc_No: this.ObjCollectionDetails.Doc_No ? this.ObjCollectionDetails.Doc_No : 0
        }
        this.tempArr.push({...obj,...TempObj})
      });
        this.saveCollention();
         }
      else if(valid) {
        this.tempArr = [];
        this.CollectionDetailsFormSubmitted = true;
        this.Spinner = true;
        this.tempArr = {
          Unique_ID : this.ObjCollectionDetails.Unique_ID ? this.ObjCollectionDetails.Unique_ID : 0,
          Client_ID : this.ObjCollectionDetails.Client_ID,
          Sub_Client_ID : this.ObjCollectionDetails.Sub_Client_ID,
          Payment_In_Cash : this.Payment_In_Cash ? 1 : 0,
          Grand_Total: this.ObjCollectionDetails.Grand_Total ? this.ObjCollectionDetails.Grand_Total : 0,
          Bonus:this.ObjCollectionDetails.Price_Type === "Bonus" ? this.ObjCollectionDetails.Amount : null,
          Penalty:this.ObjCollectionDetails.Price_Type === "Penalty" ? this.ObjCollectionDetails.Amount : null,
          Non_Collection_Reason : this.ObjCollectionDetails.Non_Collection_Reason_ID ? this.ObjCollectionDetails.Non_Collection_Reason_ID : 0,
          Remarks :  this.ObjCollectionDetails.Remarks,
          Doc_No: this.ObjCollectionDetails.Doc_No ? this.ObjCollectionDetails.Doc_No : 0,
          Status : "NON COLLECTED",
          Product_ID : 0,
          Product_Name : 0,
          Price : 0,
          Qty : 0,
          Amount : 0
        }
        this.saveCollention()
      }
      else {
        console.log("Error")
      }
   }
   saveCollention(){
   
  
     let reportname;
     if (this.buttonname != "Update") {
       reportname = "Waste_Mng_Master_Collection_Details_Create"
     } 
     else {
       reportname = "Waste_Mng_Master_Collection_Details_Update"
     }
     const obj = {
       "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
       "Report_Name": reportname
     }
     this.apicall.PostData(obj,JSON.stringify(this.tempArr)).subscribe((data:any)=>{
       console.log('createstatus ===', data[0].Column1)
       if (data[0].Column1) {
           this.compacctToast.clear();
           this.compacctToast.add({
             key: "compacct-toast",
             severity: "success",
             summary: "",
             detail: this.ObjCollectionDetails.Unique_ID ? "Succesfully Updated" : "Succesfully Created"
           });
           this.clearData();
           this.GetBrowseData();
           this.CollectionDetailsFormSubmitted = false;
           this.items = ["BROWSE", "Create"];
           this.buttonname = "Create";
       } else {
         this.compacctToast.clear();
         this.compacctToast.add({
           key: "compacct-toast",
           severity: "error",
           summary: "Warn Message",
           detail: "Error Occured "
         });
       }
     });
   }
   GetBrowseData(){
    this.CollDetailSearchlist = []
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Waste_Mng_Master_Collection_Details_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
       this.CollDetailSearchlist = data;
       console.log('CollDetailSearchlist=====',this.CollDetailSearchlist)
       //this.seachSpinner = false;
     })
   }
   EditProduct(edit:any){
    this.EditList = [];
    this.productaddSubmit = [];
    this.ObjCollectionDetails.Unique_ID = undefined;
    this.nonCollectionFlg = true;
    this.collectionBTN = "Collected"
    this.clearData();
     if (edit.Doc_No) {
       console.log("edit.Unique_ID ===", edit.Doc_No )
       this.ObjCollectionDetails.Doc_No = edit.Doc_No;
       this.tabIndexToView = 1;
       this.items = ["BROWSE", "UPDATE"];
       this.buttonname = "Update";
     const obj = {
       "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
       "Report_Name": "Get_Waste_Mng_Master_Collection_Details_Edit_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Doc_No: this.ObjCollectionDetails.Doc_No})).subscribe((data:any)=>{
       this.EditList = data;
       console.log('EditList =====',this.EditList)
       this.ObjCollectionDetails.Client_ID = data[0].Client_ID;
       this.ObjCollectionDetails.Remarks = data[0].Remarks;
       this.GetClientData();
       this.ObjCollectionDetails.Sub_Client_ID = data[0].Sub_Client_ID;
       this.GetSubClientData();
       this.Payment_In_Cash = data[0].Payment_In_Cash ? true : false ;
      if(data[0].Status === "COLLECTED"){
          this.nonCollectionFlg = true;
          this.collectionBTN = "Non Collection"
          this.GetProductData();
          data.forEach((element:any) => {
            const  productObj = {
                Product_ID : element.Product_ID,
                Product_Name : element.Product_Name,
                Price : Number(element.Price),
                Qty : Number(element.Qty),
                Amount : Number(element.Price) * Number(element.Qty)
              };
        
              this.productaddSubmit.push(productObj);
            });
           this.ObjCollectionDetails.Grand_Total = data[0].Grand_Total;
           if(data[0].Bonus){
            this.ObjCollectionDetails.Price_Type = data[0].Bonus ? "Bonus" : "Penalty";
           }
          else{
            this.ObjCollectionDetails.Price_Type = undefined;
          }
           this.ObjCollectionDetails.Amount = this.ObjCollectionDetails.Price_Type === "Bonus" ? data[0].Bonus : data[0].Penalty
        }
        else {
          this.nonCollectionFlg = false;
          this.collectionBTN = "Collected"
          this.ObjCollectionDetails.Non_Collection_Reason_ID = data[0].Non_Collection_Reason.toString()
        }
     
      })
     }
   }
  onConfirm(){}
  onReject(){}
   clearData(){
    this.CollectionDetailsFormSubmitted = false;
    this.Spinner = false;
    this.ObjCollectionDetails = new CollectionDetails();
    this.productaddSubmit = [];
    this.clientdisabled = false;
    this.Payment_In_Cash = false;
    //this.GetProductData();
   }
   getTotalValue(){
    let val = 0;
    this.productaddSubmit.forEach((item:any)=>{
      val += item.Amount
    });
  
    return val ? val : '-';
  }
  ChangePrice(){
    this.ObjCollectionDetails.Total_Amount = this.getTotalValue();
    if(this.ObjCollectionDetails.Price_Type) {
     
      const bonusamt = Number(this.ObjCollectionDetails.Amount || 0) +  Number(this.ObjCollectionDetails.Total_Amount);
      const penaltyamt =  Number(this.ObjCollectionDetails.Total_Amount) -  Number(this.ObjCollectionDetails.Amount  || 0);
      this.ObjCollectionDetails.Grand_Total = this.ObjCollectionDetails.Price_Type === 'Bonus' ? bonusamt : penaltyamt;
    } else {
      this.ObjCollectionDetails.Total_Amount = this.getTotalValue();
      this.ObjCollectionDetails.Grand_Total = this.ObjCollectionDetails.Total_Amount;
    }
  }
  NonCollection(){
    if(this.ObjCollectionDetails.Sub_Client_ID && this.ObjCollectionDetails.Client_ID){
      let subClient = this.ObjCollectionDetails.Sub_Client_ID;
      let ClientID = this.ObjCollectionDetails.Client_ID;
      let ReasonID = this.ObjCollectionDetails.Non_Collection_Reason_ID;
      if(this.nonCollectionFlg){
        this.nonCollectionFlg = false;
        this.collectionBTN = "Collected"
        this.ObjCollectionDetails = new CollectionDetails();
        this.ObjCollectionDetails.Sub_Client_ID = subClient;
        this.ObjCollectionDetails.Client_ID = ClientID;
        this.productaddSubmit = [];
      }
      else{
        this.nonCollectionFlg = true;
        this.collectionBTN = "Non Collection"
        this.ObjCollectionDetails = new CollectionDetails();
        this.ObjCollectionDetails.Sub_Client_ID = subClient;
        this.ObjCollectionDetails.Client_ID = ClientID;
        this.ObjCollectionDetails.Non_Collection_Reason_ID =  ReasonID;
        this.productaddSubmit = [];
      }
    }
    else{
      this.compacctToast.clear();
      this.compacctToast.add({
        key: "compacct-toast",
        severity: "error",
        summary: "Warn Message",
        detail: "Client / Sub Client Not Select"
      });
    }
  }
  GetNonColl(){
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Browse_Non_Collection_Reason"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.collectionList = data;
       console.log('collectionList=====',this.collectionList)
       //this.seachSpinner = false;
     })
  }

}
class CollectionDetails {
  Unique_ID! : any;
  Client_ID! : any;
  Sub_Client_ID! : any;
  Product_ID!: any;
  Product_Name!: string;
  Price!: any;
  Qty!: any;
  Grand_Total!:any;
  Price_Type:any;
  Total_Amount!:any;
  Amount!:any;
  Remarks!:any;
  Non_Collection_Reason_ID!:any;
  Doc_No!:any
}
