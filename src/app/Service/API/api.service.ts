import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AppModule } from 'src/app/app.module';
declare const window: any;
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api!:any;
  constructor(private http: HttpClient) {
    this.api = window.api;
   }
  PostData(ParamObj:Query,PostObj:any) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.api.TutopiacallDataBaseUrl + QueryStringobj,PostObj ,httpOptions).pipe(map((data:any) => data.message ? JSON.parse(data.message) : []));
  }
  GetData(ParamObj:Query) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(this.api.TutopiacallDataBaseUrl + QueryStringobj,httpOptions).pipe(map((data:any) => data.message ? JSON.parse(data.message) : []));
  }
  GetDataWithParamObj(ParamObj:Query,PostObj:any) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.api.TutopiacallDataBaseUrl + QueryStringobj,PostObj ,httpOptions).pipe(map((data:any) => data.message ? JSON.parse(data.message) : []));
  }
}

interface Query{
  Report_Name:String;
  Sp_Name:String;
}