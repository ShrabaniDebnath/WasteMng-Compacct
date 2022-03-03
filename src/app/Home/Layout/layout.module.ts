import { NgModule } from '@angular/core';

import { layoutRoutingModule } from './layout-routing.module';
import { layoutComponent } from './layout.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { MasterClientComponent } from '../Views/Waste/Master/master-client/master-client.component';
import { MasterSubClientComponent } from '../Views/Waste/Master/master-sub-client/master-sub-client.component';
import { MasterProductComponent } from '../Views/Waste/Master/master-product/master-product.component';
import { MasterProductPricingPlanComponent } from '../Views/Waste/Master/master-product-pricing-plan/master-product-pricing-plan.component';
import { CollectionDetailsComponent } from '../Views/Waste/Master/collection-details/collection-details.component';






import { DateTimeConvertService } from 'src/app/Service/dateTime.service';
import { CompacctHeader } from 'src/app/Service/common.header.service';
import { TabViewModule } from 'primeng/tabview';
import {ProgressBarModule} from 'primeng/progressbar';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';

import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CheckboxModule} from 'primeng/checkbox';
// DateRange
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { CompacctDaterangepickerComponent } from '../Component/compacct-daterangepicker/compacct-daterangepicker.component';
import { CommonModule } from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import {CompacctDigitonlyDirective} from 'src/app/compacct.directives/compacct.digitonly.directive';
import {SafeHtmlPipe} from 'src/app/compacct.pipes/compacct.safeHtml/safe-html.pipe';
import { DashboardComponent } from '../Views/Dashboard/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    layoutComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    MasterClientComponent,
    MasterSubClientComponent,
    CompacctDaterangepickerComponent,
    MasterProductComponent,
    MasterProductPricingPlanComponent,
    CollectionDetailsComponent,
    DashboardComponent,
    CompacctDigitonlyDirective,
    SafeHtmlPipe
    
  ],
  imports: [
    CommonModule,
    layoutRoutingModule,
    TabViewModule,
    TableModule,
    RouterModule,
    ProgressBarModule,
    PaginatorModule,
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
    InputSwitchModule,
    CheckboxModule,
    DatePickerModule,
    TimePickerModule,
    DateRangePickerModule ,
    DateTimePickerModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule
  ],
  providers: [CompacctHeader,DateTimeConvertService],
  bootstrap: [layoutComponent]
})
export class AppModule { }
