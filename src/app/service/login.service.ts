import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {user} from '../models/user';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user : user[];
  backendServerBaseUrl = 'http://localhost:8081/v1/';
  constructor(private http : HttpClient) { }



  getUsers():Observable<user[]> {
      
     
     return this.http.get(this.backendServerBaseUrl + 'getUsers')
     .pipe(map((resp)=>{
         
         return this.handleResponse(resp);
         
         
     }),catchError((error)=>{
             
         return Observable.throw("Server Communication Failed");
     }))
     
 }



  postUsers(user: user):Observable<user>{

    console.log(JSON.stringify(user));

    return this.http.post(this.backendServerBaseUrl + 'registerUser', user)
    .pipe(map((resp)=>{
        
        return this.handleResponse(resp);
        
        
    }),catchError((error)=>{
            
        return Observable.throw("Server Communication Failed");
    }))
  }


  userLogin(user: user):Observable<Boolean>{

    console.log(JSON.stringify(user));

    return this.http.post(this.backendServerBaseUrl + 'userLogin', user)
    .pipe(map((resp)=>{
        
        return this.handleResponse(resp);
        
        
    }),catchError((error)=>{
            
        return Observable.throw("Server Communication Failed");
    }))
  }

 handleResponse(resp:any) {
      
  if(resp instanceof Response){
      
      if(resp.ok==true){
          
           return resp.json();
        }
          return resp;           
  }else{
      return resp;
  }
  
}
}
