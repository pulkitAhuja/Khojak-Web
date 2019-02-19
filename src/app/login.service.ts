import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }
  loginDone=true;
  getUser(): Observable<any>{
    // console.log(localStorage.getItem('access'));
    //  return this._http.get('http://192.168.43.142:8000/journey/details/',{headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('access'))});
     return this._http.get('./assets/demo.json');
    // return this._http.get('http://localhost:4100/api/v1/todos');
   }

  loginUser(reg): Observable<any>{
    this.loginDone=false;
   return this._http.post('http://192.168.43.142:8000/api/token/', reg)
   // return this._http.get('http://192.168.43.142:5000/api/v1/details?format=json');
  }

  regUser(reg):Observable<any>{
    this.loginDone=false;
    console.log("1");

    return this._http.post('http://192.168.43.142:8000/users/register/', reg ,{headers: new HttpHeaders().set('Content-Type','application/json')});
    console.log("2");
    
  }

  postVehicle(reg):Observable<any>{
    return this._http.post('http://192.168.43.142:8000/journey/vehicle/', reg ,{headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('access'),)});
  }

  vehicleList():Observable<any>{
    return this._http.get('http://192.168.43.142:8000/journey/vehicle/',{headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('access'))});
  }


}
