import { Component, OnInit} from '@angular/core';
import { msg, WsConn, storage } from './common/common';
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

    //显示运行情况
    isOpenConsole = false;

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
            //{title: "首页", selected: false, url: '/' },
            {title: "应用", selected: false, url: '/app' },
            {title: "帐号管理", selected: false, url:'/account'},
            { title: "客户端管理", selected: false, url: '/clients' },
            { title: "客户端脚本", selected: false, url: '/setting/script' },
            { title: "设置", selected: false, url: '/setting/setting' }
        ];
        let curr_module = storage.get("curr_module");

        if (curr_module != "") {
            this.menus.forEach(v => {
                if (v.url == curr_module) {
                    v.selected = true;
                }
            })
        }
    }

    onMenu(menu) {
        storage.set("curr_module",menu.url);
        this.menus.forEach(m => m.selected = false);
        menu.selected = true;
    }

    openConsole() {
        this.isOpenConsole = !this.isOpenConsole;
        
    }
}