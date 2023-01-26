import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewLisService {

  constructor( private http: HttpClient ) { }
  //get virw problem
  getre(id: number){
    environment.apiUrl
    return this.http.get('/api/viewlitereport')
  }

  update() {
    return
  }
}
