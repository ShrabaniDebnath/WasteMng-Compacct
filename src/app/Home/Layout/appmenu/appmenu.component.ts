import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/API/api.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit ,AfterViewChecked {

  navItems: any;
  constructor(
    private apicall : ApiService,
    private router: Router,
    private sanitizer:DomSanitizer,
    private changeDetector : ChangeDetectorRef
  ) { 
    
  }
  ngOnInit(): void {
    this.getmenuList();
  }
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
  getRoute(event:any){
    const goRoute = event.target.getAttribute("routerLink");
    
    if (goRoute) {
      if (goRoute.indexOf("?") !== -1) {
        const path = goRoute.slice(0, goRoute.indexOf("?"));
        const query = goRoute.split("?").pop();
        const queryParam = query
          .split("&")
          .reduce(function(prev:any, curr:any, i:any, arr:any) {
            const p = curr.split("=");
            prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
            return prev;
          }, {});
        this.router.navigate([path], {
          queryParams: queryParam
        });
      } else {
        this.router.navigate([goRoute]);
      }
    }
  }
  getmenuList(){
    const obj = {
      "Sp_Name":"SP_MenuDetails_TypeScript",
      "Report_Name":"Get_Menu_Details"
     }
     this.apicall.GetData(obj).subscribe((res:any)=>{

       localStorage.setItem("systemmenu_v2", res[0].Column1);
       
        const tempNav:any = localStorage.getItem("systemmenu_v2");
        this.navItems = this.sanitizer.bypassSecurityTrustHtml(tempNav);
        
       })
  }
}
