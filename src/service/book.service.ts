import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url= "http://localhost:8080/api/v1/";
  constructor(private http:HttpClient) { }

   getAllBooks(){
     const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': 'Basic ' +btoa("library:library123")
       })
     };
     return this.http.get("http://localhost:8080/api/v1/items",httpOptions);
  }

  saveItem(item){
  const header = new HttpHeaders({ 'Content-Type': 'application/xml' ,  'Authorization': 'Basic ' +btoa("library:library123")});

    return this.http.post(this.url+"/items",item,{
      headers:header
    });
  }

  findById(ID){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"items/"+ID,httpOptions);
  }

  updateItem(itemCode,item){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    // console.log(itemCode)
    return this.http.put(this.url+"/items/"+itemCode,item,httpOptions);
  }

  deleteItem(itemCode){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.delete(this.url+"/items/"+itemCode,httpOptions);
  }

  ByItemCategory(itemCategory){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"items/byItemCategory/"+itemCategory,httpOptions)
  }

  byCategory(category){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"items/byCategory/"+category,httpOptions)
  }

  byCategoryandItemCategory(category,itemCategory){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.get(this.url+"items/byCategory&itemCategory/"+category+"/"+itemCategory,httpOptions)
  }

  changeCategory(itemCode,category){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' +btoa("library:library123")
      })
    };
    return this.http.put(this.url+"items/changeCategory/"+itemCode+"/"+category,null,httpOptions);
  }
}
