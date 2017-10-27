import { Component, OnInit, Input} from '@angular/core';
import {Application} from './../../server/application';
import { Client } from './../../server/client';
import {Router, ActivatedRoute} from '@angular/router';
import {msg} from './../../common/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    appname="";
    appid = "";
    bundleid = "";
    constructor(private server: Application, private clientServer: Client, private router: Router, private route: ActivatedRoute) {
      
    }

    ngOnInit() {}
    save() {

        this.appname = this.appname.trim();
        if (this.appname == "") {
            msg.warn(`应用名称不能为空`);
            return;
        }

        this.appid=this.appid.trim();
        if (this.appid == "") {
            msg.warn(`appid不能为空`);
            return;
        }

        this.bundleid = this.bundleid.trim();
        if (this.bundleid == "") {
            msg.warn(`bundleid 不能为空`);
            return;
        }

        this.server.save({ name: this.appname, appid: this.appid, bundleid: this.bundleid }).subscribe((re: any) => {
            if (re.isSucc) {
                this.appname = '';
                msg.succ(`${this.appname} 添加成功`);
            } else {
                msg.error(re.error_msg);
            }
        })
    }

}
