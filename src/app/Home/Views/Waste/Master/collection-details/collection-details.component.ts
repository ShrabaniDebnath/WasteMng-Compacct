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
  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Collection Details",
      Link: " Collection Details"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetClientData();
    //this.GetProductData();
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
     const tempobj = {
      Client_ID: this.ObjCollectionDetails.Client_ID,
      Sub_Client_ID : this.ObjCollectionDetails.Sub_Client_ID
     }
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Get_Master_Product_Price_Plan"
     }
     this.apicall.PostData(obj, JSON.stringify(tempobj)).subscribe((data:any)=>{
      if(data.length) {
        data.forEach((element:any) => {
            element['label'] = element.Product_Name,
            element['value'] = element.Product_ID
          });
          this.Productlist = data;
        } else {
          this.Productlist = [];
  
        }
       console.log('Productlist=====',this.Productlist)
     })
   }
   ProductdetailsChange() {
    this.ObjCollectionDetails.Price =  undefined;
  if(this.ObjCollectionDetails.Product_ID) {
    const ctrl = this;
    const productObj = $.grep(ctrl.Productlist,function(item:any) {return item.value == ctrl.ObjCollectionDetails.Product_ID})[0];
    console.log(productObj);
    this.ObjCollectionDetails.Product_Name =  productObj  && productObj.Product_Name ? productObj.Product_Name : undefined;
    this.ObjCollectionDetails.Price =  productObj  && productObj.Price ? productObj.Price : undefined;
  
  }
   }
   add(valid:any){
    this.CollectionDetailsFormSubmitted = true;
    this.clientdisabled = true;
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
    this.productaddSubmit.splice(index,1)
  
  }
   createMasterProductPlan(){
    //this.ProductPlanFormSubmitted = true;
    // if (valid) {
      this.Spinner = true;
      //const obj = { Product_String: JSON.stringify([this.ObjProduct]) };
      if(this.productaddSubmit.length) {
        let tempArr:any =[]
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
          Payment_In_Cash : this.Payment_In_Cash ? 1 : 0
    
        }
        tempArr.push({...obj,...TempObj})
      });
     // console.log("save bill =" , tempArr)
      //return JSON.stringify(tempArr);
     // }
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
      this.apicall.PostData(obj,JSON.stringify(tempArr)).subscribe((data:any)=>{
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
            this.tabIndexToView = 0;
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
    this.clearData();
     if (edit.Unique_ID) {
       console.log("edit.Unique_ID ===", edit.Unique_ID )
       this.ObjCollectionDetails.Unique_ID = edit.Unique_ID;
       this.tabIndexToView = 1;
       this.items = ["BROWSE", "UPDATE"];
       this.buttonname = "Update";
     const obj = {
       "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
       "Report_Name": "Get_Waste_Mng_Master_Collection_Details_Edit_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Unique_ID: this.ObjCollectionDetails.Unique_ID})).subscribe((data:any)=>{
       this.EditList = data;
       this.ObjCollectionDetails.Client_ID = data[0].Client_ID;
       this.GetClientData();
       this.ObjCollectionDetails.Sub_Client_ID = data[0].Sub_Client_ID;
       this.GetSubClientData();
       this.Payment_In_Cash = data[0].Payment_In_Cash === "true" ? this.Payment_In_Cash : !this.Payment_In_Cash ;
      //  this.ObjProductPlan.Product_ID = data[0].Product_ID;
        this.GetProductData();
      //  this.ObjProductPlan.Price = data[0].Price;
        console.log('EditList =====',this.EditList)
        //this.seachSpinner = false;
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
      })
     }
   }
  onConfirm(){}
  onReject(){}
   clearData(){
    this.CollectionDetailsFormSubmitted = false;
    this.Spinner = false;
    this.ObjCollectionDetails = new CollectionDetails();
    this.Productlist = [];
    this.productaddSubmit = [];
    this.clientdisabled = false;
    this.Payment_In_Cash = false;
    //this.GetProductData();
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
}
