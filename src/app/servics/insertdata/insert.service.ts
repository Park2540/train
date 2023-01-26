import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInsertService {

  constructor( private http: HttpClient ) { }
  //get virw problem


  getcr():Observable<any> {
    return this.http.get('/problemrecord')
  }
  
  getListSystem() {
    return this.http.get(`${environment.apiUrl}/systems`)
  }
  getListUser() {
    return this.http.get(`${environment.apiUrl}/users`)
  }
  getListProblem() {
    return this.http.get(`${environment.apiUrl}/problems`)
  }
  getListLevels() {
    return this.http.get(`${environment.apiUrl}/levels`)
  }
  getListAgencys() {
    return this.http.get(`${environment.apiUrl}/agencys`)
  }
  getListContacts() {
    return this.http.get(`${environment.apiUrl}/contacts`)
  }
  

  createNewInsertproblem(form:any,file:File):Observable<any>{
    var data = new FormData();
    data.append('agency',form.agency);
    data.append('contact',form.contact);
    data.append('informer',form.informer);
    data.append('informermessage',form.informermessage);
    data.append('system',form.system);
    data.append('problemtype',form.problemtype);
    data.append('level',form.level);
    data.append('problem',form.problem);
    data.append('problem_records',file);
    return this.http.post(environment.apiUrl+'/problemrecord',data)
  }
  update() {
    return
  }
}
