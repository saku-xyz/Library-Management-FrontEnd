import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url= "http://localhost:8080/api/v1/";
  constructor(private http:HttpClient) { }


  getRequests(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"foreignmembers/requests",httpOptions)
  }

  approveMemebr(NIC){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.put(this.url+"foreignmembers/approveMember/"+NIC,null,httpOptions);
  }

  getLocalMemberByID(NIC){

    const httpOptions = {
      'responseType'  : 'xml' as 'json',
      headers: new HttpHeaders({

        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    // const httpOptions = {
    //
    //
    // };
    return this.http.get(this.url+"localmemebrs/"+NIC,httpOptions);
  }

  getForeignMemberByID(NIC){
    const httpOptions = {
      'responseType'  : 'xml' as 'json',
      headers: new HttpHeaders({

        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"foreignmembers/"+NIC,httpOptions);
  }


  getAllLocalMemebrs(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get((this.url+"localmemebrs"),httpOptions)
  }

  getAllForeignMemebrs(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"foreignmembers",httpOptions)
  }
}
