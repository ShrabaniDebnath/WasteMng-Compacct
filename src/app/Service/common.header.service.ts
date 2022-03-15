import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { AppModule } from "../app.module";

@Injectable({
  providedIn: AppModule,
})
export class CompacctHeader {
  Header = new BehaviorSubject<{} | undefined>(undefined);
  cast = this.Header.asObservable();

  constructor() {}

  pushHeader(newHeaderObj:any) {
    console.log(newHeaderObj)
     this.Header = new BehaviorSubject<{} | undefined>(undefined);
    if(newHeaderObj.Header) {
      const HeaderTemplate = `<h1>${newHeaderObj.Header} <small></small> </h1>
        <ol class="breadcrumb">
          <li class="active"><a><i class="fa fa-dashboard"></i> ${newHeaderObj.Link}</a></li>
        </ol>`;
      this.Header.next(HeaderTemplate);
    }
  }
}
