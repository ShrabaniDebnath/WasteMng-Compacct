import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../Views/Dashboard/dashboard/dashboard.component';
import { CollectionDetailsComponent } from '../Views/Waste/Master/collection-details/collection-details.component';
import { MasterClientComponent } from '../Views/Waste/Master/master-client/master-client.component';
import { MasterProductPricingPlanComponent } from '../Views/Waste/Master/master-product-pricing-plan/master-product-pricing-plan.component';
import { MasterProductComponent } from '../Views/Waste/Master/master-product/master-product.component';
import { MasterSubClientComponent } from '../Views/Waste/Master/master-sub-client/master-sub-client.component';
import { layoutComponent } from './layout.component';

import { MasterDocumentComponent } from '../Views/Hytone/Master/master-document/master-document.component';
import { MasterBankComponent } from '../Views/Hytone/Master/master-bank/master-bank.component';
import { MasterIfscComponent } from '../Views/Hytone/Master/master-ifsc/master-ifsc.component';
import { MasterCustomerTypeComponent } from '../Views/Hytone/Master/master-customer-type/master-customer-type.component';
import { MasterPoliceStationComponent } from '../Views/Hytone/Master/master-police-station/master-police-station.component';
import { MasterPostOfficeComponent } from '../Views/Hytone/Master/master-post-office/master-post-office.component';
import { MasterPincodeComponent } from '../Views/Hytone/Master/master-pincode/master-pincode.component';
import { MasterOccupationComponent } from '../Views/Hytone/Master/master-occupation/master-occupation.component';
import { MasterRelationComponent } from '../Views/Hytone/Master/master-relation/master-relation.component';
import { MasterAgencyComponent } from '../Views/Hytone/Master/master-agency/master-agency.component';
import { MasterAssetComponent } from '../Views/Hytone/Master/master-asset/master-asset.component';
import { RequestDetalisComponent } from '../Views/App-Admin/request-detalis/request-detalis.component';
import { NonCollectionReasonComponent } from '../Views/Waste/Master/non-collection-reason/non-collection-reason.component';
import { UserMasterComponent } from '../Views/Hytone/Master/user-master/user-master.component';
import { CustomerCreationIndividualComponent } from '../Views/Hytone/Master/customer-creation-individual/customer-creation-individual.component';
const routes: Routes = [
  {
    path: "",
    component: layoutComponent,
    children: [
      { path: 'Dashboard',
        component : DashboardComponent,
        data: { title: "Dashboard" }
    },
      {
        path: "MasterClient",
    component: MasterClientComponent,
    data: { title: "Master Client" }
      },
      {
        path: "MasterSubClient",
    component: MasterSubClientComponent,
    data: { title: "Master Sub Client" }
      },
      {
        path: "MasterProduct",
    component: MasterProductComponent,
    data: { title: "Master Product" }
      },
      {
        path: "MasterProductPricingPlan",
    component: MasterProductPricingPlanComponent,
    data: { title: "Master Product Pricing Plan" }
      },
      {
        path: "CollectionDetails",
    component: CollectionDetailsComponent,
    data: { title: "Collection Details" }
      },
      {
        path: "MasterDocument",
    component: MasterDocumentComponent,
    data: { title: "Master Document" }
      },
      {
        path: "MasterBank",
    component: MasterBankComponent,
    data: { title: "Master Bank" }
      },
      {
        path: "MasterIfsc",
    component: MasterIfscComponent,
    data: { title: "Master Ifsc" }
      },
      {
        path: "MasterCustomerType",
    component: MasterCustomerTypeComponent,
    data: { title: "Master Customer" }
      },
      {
        path: "Masterpolicestation",
    component: MasterPoliceStationComponent,
    data: { title: "Master Police Station" }
      },
      {
        path: "MasterPostOffice",
    component: MasterPostOfficeComponent,
    data: { title: "Master Post Office" }
      },
      {
        path: "MasterPincode",
    component: MasterPincodeComponent,
    data: { title: "Master Pincode" }
      },
      {
        path: "MasterOccupation",
    component: MasterOccupationComponent,
    data: { title: "Master Occupation" }
      },
      {
        path: "MasterRelation",
    component: MasterRelationComponent,
    data: { title: "Master Relation" }
      },
      {
        path: "MasterAgency",
    component: MasterAgencyComponent,
    data: { title: "Master Agency" }
      },
      {
        path: "MasterAsset",
    component: MasterAssetComponent,
    data: { title: "Master Asset" }
      },
      {
        path: "RequestDetalis",
    component: RequestDetalisComponent,
    data: { title: "Request Detalis" }
      },
      {
        path: "NonCollectionReason",
    component: NonCollectionReasonComponent, 
    data: { title: "Non Collection Reason" }
      },
      {
        path: "UserMaster",
    component: UserMasterComponent, 
    data: { title: "User Master" }
      },
      {
        path: "CustomerCreationIndividual",
    component: CustomerCreationIndividualComponent, 
    data: { title: "Customer Creation (Individual)" }
      },
    ]
  },
  
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class layoutRoutingModule { }
