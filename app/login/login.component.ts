import { Component, OnInit } from '@angular/core';
import {Common as CommonServer} from '../server/common';
import {Router} from '@angular/router';
import { msg, WsConn } from '../common/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = "";
  password = "";
 
  constructor(private server: CommonServer, private r: Router) { }

  login() {
      this.server.post("/login", { user: this.user, password: this.password }).subscribe((re:any) => {
          if (re.isSucc) {
              this.r.navigateByUrl("/");
          } else {
              msg.error(re.error_msg);
          }
      })
  }

  ngOnInit(){}

}
