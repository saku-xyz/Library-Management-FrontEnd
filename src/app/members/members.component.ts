import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../service/member.service";
import {NgxXml2jsonService} from "ngx-xml2json";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private memberS: MemberService, private xmltoJSON: NgxXml2jsonService) {
  }

  private foreignRequests: any;

  private foreReq = true;
  private allLocalMemebrs = false;
  private allForeignMemebrs = false;


  private nic;
  private fullname;
  private telephone;
  private gender;
  private dob;
  private email;
  private address;
  private country;
  private memberrCategory;
  private localtbl = true;
  private foreigntbl = false;

  private localmemebrs: any;
  private foreignMemebrs: any;

  private memberXML: any;
  private parser;

  ngOnInit() {

    this.memberrCategory = "Local Members";

    this.getRequests();
    this.getLocalmemebrs();
    this.getForeignMemebrs();

    this.parser = new DOMParser();
  }


  getRequests() {
    this.memberS.getRequests().subscribe(result => {
      this.foreignRequests = result;
    })
  }

  approveMemebr(NIC) {

    this.memberS.approveMemebr(NIC).subscribe(result => {
      if (result) {
        this.getRequests();
        alert("Approved ")
      }
    })
  }

  allLocalMemebrsClick() {
    this.allLocalMemebrs = true;
    this.foreReq = false;
    this.allForeignMemebrs = false;
  }

  foreReqClick() {
    this.allLocalMemebrs = false;
    this.foreReq = true;
    this.allForeignMemebrs = false;
  }

  getMemberByID() {
    this.memberS.getLocalMemberByID(this.nic).subscribe(result => {

      if (result == "") {
        this.memberS.getForeignMemberByID(this.nic).subscribe(result2 => {

          if (result2 == "") {
            alert("No Member Found ! ");
          }


          this.memberXML = result2;
          const xml = this.parser.parseFromString(this.memberXML, 'text/xml')
          const json = this.xmltoJSON.xmlToJson(xml);
          var member = json["ForeignMemberDTO"];

          this.fullname=member["fullname"];
          this.telephone=member["telphone"];
          this.gender=member["gender"];
          this.dob=member["dob"];
          this.email=member["email"];
          this.address=member["address"];
          this.country=member["country"];
          return;
        })

      }else{
        this.memberXML = result;
        const xml = this.parser.parseFromString(this.memberXML, 'text/xml')
        const json = this.xmltoJSON.xmlToJson(xml);
        var member = json["LocalMemberDTO"];

        this.fullname = member["fullname"];
        this.telephone = member["telephone"];
        this.gender = member["gender"];
        this.dob = member["dob"];
        this.email = member["email"];
        this.address = member["address"];
        this.country = "Sri Lanka";
      }


    })
  }

  selectChange() {
    if (this.memberrCategory == "Local Members") {
      this.localtbl = true;
      this.foreigntbl = false;
    } else {
      this.localtbl = false;
      this.foreigntbl = true;
    }
  }

  getLocalmemebrs() {
    this.memberS.getAllLocalMemebrs().subscribe(result => {
      this.localmemebrs = result;
    })
  }

  getForeignMemebrs() {
    this.memberS.getAllForeignMemebrs().subscribe(result => {

      this.foreignMemebrs = result;
    })
  }
}
