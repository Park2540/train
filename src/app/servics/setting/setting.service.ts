import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,Subject, retry,tap} from 'rxjs'
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/modules/widgets-examples/lists/Model/Employee';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }
  constructor( private http: HttpClient ) { }
  // ส่วนของการเพิ่มผู้รับผิดชอบ
  createNewUserlis(form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    data.append('nickname',form.nickname);
    data.append('systems',form.systems);
    return this.http.post(environment.apiUrl+'/user',form)
  }
  updateUserlis(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    data.append('nickname',form.nickname);
    data.append('systems',form.systems);
    return this.http.patch(`${environment.apiUrl}/users/${id}`,data)
  }
  deleteUserlis(id:number){
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
  }
  getListUser() {
    return this.http.get(`${environment.apiUrl}/users`)
  }
  getUserLis(id: any){
    return this.http.get(environment.apiUrl+'/users')
  }

////////////////////////////////
createNewSystem(form:any):Observable<any>{
  var data = new FormData();
  data.append('name',form.name);
  return this.http.post(environment.apiUrl+'/system',form)
}
updateSystem(id:number,form:any):Observable<any>{
  var data = new FormData();
  data.append('name',form.name);
  return this.http.patch(`${environment.apiUrl}/system/${id}`,data)
}
deleteSystem(id:number){
  return this.http.delete(`${environment.apiUrl}/system/${id}`)
}
getListSystem() {
  return this.http.get(`${environment.apiUrl}/systems`)
}
getSystem(id: any){
  return this.http.get(environment.apiUrl+'/systems')
}

///////////////////////////////////////////////////////////
createNewproblem(form:any):Observable<any>{
  var data = new FormData();
  data.append('name',form.name);
  return this.http.post(environment.apiUrl+'/problem',form)
}
updateproblem(id:number,form:any):Observable<any>{
  var data = new FormData();
  data.append('name',form.name);
  return this.http.patch(`${environment.apiUrl}/problem/${id}`,data)
}
deleteproblem(id:number){
  return this.http.delete(`${environment.apiUrl}/problem/${id}`)
}
getListproblem() {
  return this.http.get(`${environment.apiUrl}/problems`)
}
getproblem(id: any){
  return this.http.get(environment.apiUrl+'/problems')
}

  //////////////////////


  createNewlevel(form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    data.append('name',form.time);
    return this.http.post(environment.apiUrl+'/level',form)
  }
  updatelevel(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    return this.http.patch(`${environment.apiUrl}/level/${id}`,data)
  }
  deletelevel(id:number){
    return this.http.delete(`${environment.apiUrl}/level/${id}`)
  }
  getListlevel() {
    return this.http.get(`${environment.apiUrl}/levels`)
  }
  getlevel(id: any){
    return this.http.get(environment.apiUrl+'/levels')
  }
  
  //////////////////////
  createNewagencys(form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    return this.http.post(environment.apiUrl+'/agency',form)
  }
  updateagencys(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    return this.http.patch(`${environment.apiUrl}/agency/${id}`,data)
  }
  deleteagencys(id:number){
    return this.http.delete(`${environment.apiUrl}/agency/${id}`)
  }
  getListagencys() {
    return this.http.get(`${environment.apiUrl}/agencys`)
  }
  getagencys(id: any){
    return this.http.get(environment.apiUrl+'/agencys')
  }
  
  //////////////////////
  createNewcontact(form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    return this.http.post(environment.apiUrl+'/contact',form)
  }
  updatecontact(id:number,form:any):Observable<any>{
    var data = new FormData();
    data.append('name',form.name);
    return this.http.patch(`${environment.apiUrl}/contact/${id}`,data)
  }
  deletecontact(id:number){
    return this.http.delete(`${environment.apiUrl}/contact/${id}`)
  }
  getListcontact() {
    return this.http.get(`${environment.apiUrl}/contacts`)
  }
  getcontact(id: any){
    return this.http.get(environment.apiUrl+'/contacts')
  }

  
  //////////////////////

  update() {
    return
  }
}
