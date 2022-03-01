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
    ]
  },
  
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class layoutRoutingModule { }
