import { Component } from '@angular/core';
import { msg, WsConn } from './common/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    msg = msg;
    ws = WsConn();
    data = [];
    account_menu = 'none';
    menus:any[];

    constructor(private router: Router) {
       this.initMenu();
       this.ws.watch("api.task.get", (res) => {
             this.data.push(JSON.stringify(res));
       });

       this.ws.watch("fail", (res) => {
           this.data.push(JSON.stringify(res));
       });

     }

    initMenu() {
        this.menus = [
            { title: "应用", selected: false, url: '/app' },
            {title: "帐号管理", selected: false, url:'/account'},
            { title: "客户端管理", selected: false, url: '/clients'}
        ];
    }

    onMenu(menu) {
        this.menus.forEach(m => m.selected = false);
        menu.selected = true;
    }


}