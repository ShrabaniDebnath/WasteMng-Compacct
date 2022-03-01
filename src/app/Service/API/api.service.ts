import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../../environments/environment'
import { map, catchError } from 'rxjs/operators';
import { AppModule } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }
  PostData(ParamObj:Query,PostObj:any) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(api.TutopiacallDataBaseUrl + QueryStringobj,PostObj ,httpOptions).pipe(map((data:any) => data ? JSON.parse(data.message) : []));
  }
  GetData(ParamObj:Query) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get(api.TutopiacallDataBaseUrl + QueryStringobj,httpOptions).pipe(map((data:any) => data ? JSON.parse(data.message) : []));
  }
  GetDataWithParamObj(ParamObj:Query,PostObj:any) {
    const QueryStringobj =`&Report_Name=${ParamObj.Report_Name}&Sp_Name=${ParamObj.Sp_Name}`;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(api.TutopiacallDataBaseUrl + QueryStringobj,PostObj ,httpOptions).pipe(map((data:any) => data ? JSON.parse(data.message) : []));
  }
}

interface Query{
  Report_Name:String;
  Sp_Name:String;
}