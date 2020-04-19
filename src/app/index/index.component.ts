import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  private uname;
  private password;

  constructor(private route:Router) { }

  ngOnInit() {
  }


  login(){

    if(this.uname=="admin" && this.password=="admin"){
      this.route.navigate(["/dashBoard"])
      localStorage.setItem("logged","true");
      return;
    }
    alert("User Name or Password Invalid !");
  }
}
