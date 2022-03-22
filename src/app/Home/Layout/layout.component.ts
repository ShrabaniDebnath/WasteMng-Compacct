import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CompacctHeader } from 'src/app/Service/common.header.service';
declare var $: any;

@Component({
  selector: 'layout-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class layoutComponent  implements AfterContentChecked  {
  CompacctHeaderTemplate: any = undefined;
  constructor(
    private Header: CompacctHeader,
    private cdr: ChangeDetectorRef
    ) {}
    ngOnInit() {
      $("body").addClass("skin-blue  sidebar-mini");
     console.log('Compacct V2')
     this.Header.cast.subscribe((value) => {
       this.CompacctHeaderTemplate = value;
     });
    }
    ngAfterContentChecked() {
      this.cdr.detectChanges();
    }
}
