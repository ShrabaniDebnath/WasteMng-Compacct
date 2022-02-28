import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";
declare var $:any;

@Component({
  selector: 'app-master-product-pricing-plan',
  templateUrl: './master-product-pricing-plan.component.html',
  styleUrls: ['./master-product-pricing-plan.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class MasterProductPricingPlanComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjProductPlan = new ProductPlan();
  ProductPlanFormSubmitted = false;
  Spinner = false;
  PricingPlanSearchlist = [];
  Clientlist = [];
  SubClientlist = [];
  Productlist = [];
  productSubmit:any = [];
  EditList = [];
  clientdisabled = false;
  loading = false;


  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Product Pricing Plan",
      Link: " Master Product Pricing Plan"
    });
    this.items = ["BROWSE", "CREATE"];
    this.GetClientData();
    this.GetProductData();
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
     if(this.ObjProductPlan.Client_ID) {
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Get_Master_SubClient"
       }
       this.apicall.PostData(obj, JSON.stringify({Client_ID: this.ObjProductPlan.Client_ID})).subscribe((data:any)=>{
       
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
      "Report_Name": "Get_Waste_Mng_Master_Product"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
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
    this.ObjProductPlan.Price =  undefined;
  if(this.ObjProductPlan.Product_ID) {
    const ctrl = this;
    const productObj = $.grep(ctrl.Productlist,function(item:any) {return item.value == ctrl.ObjProductPlan.Product_ID})[0];
    console.log(productObj);
    this.ObjProductPlan.Product_Name =  productObj  && productObj.Product_Name ? productObj.Product_Name : undefined;
    this.ObjProductPlan.Price =  productObj  && productObj.Price ? productObj.Price : undefined;
  
  }
   }
   add(valid:any){
    this.ProductPlanFormSubmitted = true;
    this.clientdisabled = true;
     if(valid && this.Getsameproduct()){
       var productObj = {
       Product_ID : this.ObjProductPlan.Product_ID,
       Product_Name : this.ObjProductPlan.Product_Name,
       Price : this.ObjProductPlan.Price
     };
     this.productSubmit.push(productObj);
     //console.log("Product Submit",this.productaddSubmit);
     this.ProductPlanFormSubmitted = false;
     this.ObjProductPlan.Product_ID = undefined;
     this.ObjProductPlan.Price = undefined;
     //this.ObjProductPlan = new ProductPlan();
    }
   }
   Getsameproduct () {
    const sameproduct = this.productSubmit.filter((item:any)=> Number(item.Product_ID) === Number(this.ObjProductPlan.Product_ID) );
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
    this.productSubmit.splice(index,1)
  
  }
   createMasterProductPlan(){
    //this.ProductPlanFormSubmitted = true;
    // if (valid) {
      this.Spinner = true;
      //const obj = { Product_String: JSON.stringify([this.ObjProduct]) };
      if(this.productSubmit.length) {
        let tempArr:any =[]
        this.productSubmit.forEach((item:any) => {
          const obj = {
              Product_ID : item.Product_ID,
              Product_Name : item.Product_Name,
              Price : Number(item.Price),
          }
    
        const TempObj = {
          Unique_ID : this.ObjProductPlan.Unique_ID ? this.ObjProductPlan.Unique_ID : 0,
          Client_ID : this.ObjProductPlan.Client_ID,
          Sub_Client_ID : this.ObjProductPlan.Sub_Client_ID,
    
        }
        tempArr.push({...obj,...TempObj})
      });
     // console.log("save bill =" , tempArr)
      //return JSON.stringify(tempArr);
     // }
      let reportname;
      if (this.buttonname != "Update") {
        reportname = "Waste_Mng_Master_Product_Price_Plan_Create"
      } 
      else {
        reportname = "Waste_Mng_Master_Product_Price_Plan_Update"
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
              detail: this.ObjProductPlan.Unique_ID ? "Succesfully Updated" : "Succesfully Created"
            });
            // this.clientdisabled = false;
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
    this.PricingPlanSearchlist = []
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Waste_Mng_Master_Product_Price_Plan_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
       this.PricingPlanSearchlist = data;
       console.log('PricingPlanSearchlist=====',this.PricingPlanSearchlist)
       //this.seachSpinner = false;
     })
   }
   EditProduct(edit:any){
    this.EditList = [];
    this.productSubmit = [];
    this.ObjProductPlan.Unique_ID = undefined;
    this.clearData();
     if (edit.Unique_ID) {
       console.log("edit.Unique_ID ===", edit.Unique_ID )
       this.ObjProductPlan.Unique_ID = edit.Unique_ID;
       this.tabIndexToView = 1;
       this.items = ["BROWSE", "UPDATE"];
       this.buttonname = "Update";
     const obj = {
       "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
       "Report_Name": "Get_Waste_Mng_Master_Product_Price_Plan_Edit_Data"
      }
      this.apicall.PostData(obj, JSON.stringify({Unique_ID: this.ObjProductPlan.Unique_ID})).subscribe((data:any)=>{
       this.EditList = data;
       this.ObjProductPlan.Client_ID = data[0].Client_ID;
       this.GetClientData();
       this.ObjProductPlan.Sub_Client_ID = data[0].Sub_Client_ID;
       this.GetSubClientData();
      //  this.ObjProductPlan.Product_ID = data[0].Product_ID;
      //  this.GetProductData();
      //  this.ObjProductPlan.Price = data[0].Price;
        console.log('EditList =====',this.EditList)
        //this.seachSpinner = false;
        data.forEach((element:any) => {
          const  productObj = {
              Product_ID : element.Product_ID,
              Product_Name : element.Product_Name,
              Price : Number(element.Price)
            };
      
            this.productSubmit.push(productObj);
          });
      })
     }
   }
  onConfirm(){}
  onReject(){}
   clearData(){
    this.ProductPlanFormSubmitted = false;
    this.Spinner = false;
    this.ObjProductPlan = new ProductPlan();
    this.productSubmit = [];
    this.GetProductData();
    this.clientdisabled = false;
   }

}
class ProductPlan {
  Unique_ID! : any;
  Client_ID! : any;
  Sub_Client_ID! : any;
  Product_ID!: any;
  Product_Name!: string;
  Price!: any;
}

