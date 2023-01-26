import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor( private http: HttpClient ) { }
  getproblemdetails(pagination:any,keyword:string){
    return this.http.get(environment.apiUrl+'/problemrecords?page='+pagination.page+'&limit='+pagination.limit + '&keyword='+keyword)
  }

  update() {
    return
  }
  getStatus() {
    return this.http.get(`${environment.apiUrl}/`)
  }

  updatproblemrecords(id:string,data: any){
    return this.http.patch(`${environment.apiUrl}/problemrecord/${id}`,data)
  }
  getproblemrecords(id:string){
    return this.http.get(`${environment.apiUrl}/problemrecord/${id}`)
  }
  getListoperators() {
    return this.http.get(`${environment.apiUrl}/users`)
  }
  getListUser() {
    return this.http.get(`${environment.apiUrl}/users`)
  }

  updateproblemupdate(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('operator',form.operator);
    return this.http.patch(`${environment.apiUrl}/problemupdate/${id}`,data)
  }
  finishproblemupdate(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('casuseproblem',form.casuseproblem);
    data.append('solution',form.solution);
    data.append('suggestion',form.suggestion);
    return this.http.patch(`${environment.apiUrl}/problemcompleted/${id}`,data)
  }
  // actualizarproblemdetails(id: string, data:any): Promise<any> {
  //   return this.firestore.collection('empleados').doc(id).update(data);
  // }
  // getproblemdetailsbyid(id: string, data:any):Observable<any> {
  //   return this.http.patch(`${environment.apiUrl}/problemrecords/${id}`,data)
  // }
}
