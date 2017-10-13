import { Component, OnInit} from '@angular/core';
import { msg, WsConn } from './common/common';
import {Router} from '@angular/router';
import { Common as CommonServer} from './server/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    msg = msg;
    ws = WsConn();
    data = [];
    account_menu = 'none';
    menus: any[];

    constructor(private router: Router, private server: CommonServer) {
       
    }

    ngOnInit() {
        this.server.get("/islogin").subscribe((re:any) => {
            if (re.isSucc == false) {
                this.router.navigateByUrl("/login");
            } else {
                this.initMenu();
            }
        });
    }

    initMenu(){
        this.menus = [
            {title: "首页", selected: false, url: '/' },
            {title: "应用", selected: false, url: '/app' },
            {title: "帐号管理", selected: false, url:'/account'},
            {title: "客户端管理", selected: false, url: '/clients'}
        ];
    }

    onMenu(menu) {
        this.menus.forEach(m => m.selected = false);
        menu.selected = true;
    }
}