import { Component, OnInit } from '@angular/core';
import {Application} from './../server/application';
import {Router} from '@angular/router';
import {msg} from './../common/common';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

    offset = 0;
    limit = 20;
    items = [];
    total = 0;
    curr_url = '/app';
    navs = [];
    sort = 'ishot DESC ,id DESC';

    curr_app: any;

    consoleHeight = 40;

    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

    constructor(private server: Application,private router: Router) {}
    ngOnInit() {
        this.navs = [
            { label: '应用列表', value: '/app'},
            { label: '添加应用', value: '/app/add' },
        ];

        this.listing();
    }


    listing() {
        let param = { offset: this.offset, limit: this.limit, sort: this.sort, filter: {} }
        this.server.listing(param).subscribe((re: any) => {
            if (re.isSucc) {
                this.items = re.items;
                this.total = re.total;
            } else{
                msg.error(re.error_nsg);
            }
        })
    }

    addtask(app: any) {
        if (this.consoleHeight < 5) {
            this.setConsoleHeight(60);
        }
        this.curr_app = app;
        this.router.navigate(['app/addtask', app.id]);
    }

    task(app: any) {
        this.curr_app = app;
        this.router.navigate(['app/task', app.id]);
    }

    cancelHot(app: any) {
        this.server.cancelHot(app.id).subscribe(re => {
            msg.succ(`${app.appname} 取消置顶`);
            app.ishot = false;
        });
    }

    setHot(app: any) {
        this.server.setHot(app.id).subscribe(re => {
            msg.succ(`${app.appname} 设置置顶`)
            app.ishot = true;
        });
    }

    chanageRouter(e) {
        if (this.curr_url == '/app') {
            this.consoleHeight = 5;
        } else {
            this.consoleHeight = 60; 
        }

        if (this.curr_url == '/app/add') {
            this.curr_app = undefined;
        }
        
        this.router.navigateByUrl(this.curr_url);
    }

 
}
