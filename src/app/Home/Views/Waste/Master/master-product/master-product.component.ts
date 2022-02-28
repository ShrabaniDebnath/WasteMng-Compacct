import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/Service/API/api.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class MasterProductComponent implements OnInit {
  tabIndexToView = 0;
  items:any = [];
  buttonname = "Create";
  ObjProduct = new Product();
  ProductFormSubmitted = false;
  Spinner = false;
  Searchlist = [];
  EditList = [];
  can_popup = false;
  act_popup = false;
  productid = undefined;
  loading = false;

  constructor(
    private apicall : ApiService,
    private $http: HttpClient,
    private Header: CompacctHeader,
    private compacctToast: MessageService
  ) { }

  ngOnInit(): void {
    this.Header.pushHeader({
      Header: "Master Product",
      Link: " Master Product"
    });
    this.items = ["BROWSE", "CREATE"];
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
   createMasterProduct(valid:any){
    this.ProductFormSubmitted = true;
    if (valid) {
      this.Spinner = true;
      //const obj = { Product_String: JSON.stringify([this.ObjProduct]) };
      let reportname;
      if (this.buttonname != "Update") {
        reportname = "Waste_Mng_Master_Product_Create"
      } 
      else {
        reportname = "Waste_Mng_Master_Product_Update"
      }
      this.ObjProduct.Product_ID = this.ObjProduct.Product_ID ? this.ObjProduct.Product_ID : 0
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": reportname
      }
      this.apicall.PostData(obj,JSON.stringify([this.ObjProduct])).subscribe((data:any)=>{
        console.log('createstatus ===', data[0].Column1)
        if (data[0].Column1) {
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product Added",
              detail: this.ObjProduct.Product_ID ? "Succesfully Updated" : "Succesfully Created"
            });
            //if (this.buttonname != "Update") {
            this.clearData();
            this.GetBrowseData();
            this.tabIndexToView = 0;
            this.items = ["BROWSE", "Create"];
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
      });
    }
   }
   GetBrowseData(){
    //this.Searchlist = []
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Waste_Mng_Master_Product_Browse"
     }
     this.apicall.GetData(obj).subscribe((data:any)=>{
      this.Searchlist = data;
       console.log('Searchlist=====',this.Searchlist)
       //this.seachSpinner = false;
     })
  }
    EditProduct(edit:any){
   this.ObjProduct.Product_ID = undefined;
   this.clearData();
    if (edit.Product_ID) {
      console.log("edit.Product_ID ===", edit.Product_ID )
      this.ObjProduct.Product_ID = edit.Product_ID;
      this.tabIndexToView = 1;
      this.items = ["BROWSE", "UPDATE"];
      this.buttonname = "Update";
    const obj = {
      "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
      "Report_Name": "Get_Waste_Mng_Master_Product_Edit_Data"
     }
     this.apicall.PostData(obj, JSON.stringify({Product_ID: this.ObjProduct.Product_ID})).subscribe((data:any)=>{
      this.EditList = data;
      this.ObjProduct.Product_Name = data[0].Product_Name;
      this.ObjProduct.HSN_Code = data[0].HSN_Code;
      this.ObjProduct.Price = data[0].Price;
       console.log('EditList =====',this.EditList)
       //this.seachSpinner = false;
     })
    }
  }
  Active(row:any){
    this.can_popup = false;
    this.productid = undefined ;
    if(row.Product_ID){
      this.act_popup = true;
      this.productid = row.Product_ID ;
      console.log("active Row ===", this.productid);
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
  onConfirm(){
    if(this.productid){
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Active_Waste_Mng_Master_Product"
      }
      this.apicall.PostData(obj, JSON.stringify({Product_ID: this.productid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.act_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.productid,
              detail: "Succesfully Active"
            });
        }
  
      })
    }
  }
  Inactive(col:any){
    this.act_popup = false;
    this.productid = undefined ;
    if(col.Product_ID){
      this.can_popup = true;
      this.productid = col.Product_ID ;
      console.log("deactive Row ===", this.productid);
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
  onConfirm2(){
    if(this.productid){
      const obj = {
        "Sp_Name": "SP_Waste_Mng_Master_Client_SubClient",
        "Report_Name": "Deactive_Waste_Mng_Master_Product"
      }
      this.apicall.PostData(obj, JSON.stringify({Product_ID: this.productid})).subscribe((data:any)=>{
        if (data[0].Column1 === "Done"){
          this.can_popup = false;
          this.onReject();
           this.GetBrowseData();
            this.compacctToast.clear();
            this.compacctToast.add({
              key: "compacct-toast",
              severity: "success",
              summary: "Product ID: " + this.productid,
              detail: "Succesfully Deactive"
            });
        }
  
      })
    }
  }
  onReject(){
    this.compacctToast.clear("c");
  }
   clearData(){
    this.ProductFormSubmitted = false;
    this.Spinner = false;
    this.ObjProduct = new Product();
    this.ObjProduct.Product_ID = undefined;
    // if (this.buttonname != "create") {
    // this.GetBrowseData();
    // this.tabIndexToView = 0;
    // this.items = ["BROWSE", "Create"];
    // this.buttonname = "Create";
    // }
   }

}
class Product {
  Product_ID! : any;
  Product_Name!: string;
  HSN_Code!: string;
  Price!: number;
}

