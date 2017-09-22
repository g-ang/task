import { Component, OnInit, Input,OnChanges} from '@angular/core';
import {Application} from './../../server/application';
import { Client } from './../../server/client';
import {Router, ActivatedRoute} from '@angular/router';
import {msg} from './../../common/common';
@Component({
    selector: 'app-addtask',
    templateUrl: './addtask.component.html',
    styleUrls:['./addtask.component.css']
})
export class AddtaskComponent implements OnInit, OnChanges {

    appinfo_id: number;

    addruntime: string;

    todays: string[];
    tomorrows: string[];
    keywords = [];
    account_type = 0;
    task_name = "";
    sort = 100;

    //禁用保存按钮
    onSaveDisabled = false;

    isAllClient = true;

    clients = [];
    selectedClients = [];

    dates = [{ label: '今天', value: 'today' }, { label: '明天', value: 'tomorrow' }];
    date = 'today';

    constructor(private server: Application, private clientServer: Client, private router: Router, private route: ActivatedRoute) {
        this.todays = [];
        this.tomorrows = [];
    }

    ngOnChanges(e) {
        this.appinfo_id = e;
    }
   
    ngOnInit() {
         this.route.params.subscribe(param => {
             if (param['appinfo_id'] != undefined) {
                 this.appinfo_id = 0;
                 setTimeout(() => { this.appinfo_id=param['appinfo_id'] }, 500);
            }
        })
    }

    addRunTime(e,flag) {
        this.addruntime = this.addruntime.replace(".", ":");
        if (e.keyCode == 13) {
            if (flag== "today") {
                this.todays.push(this.addruntime);
            } else {
                this.tomorrows.push(this.addruntime);
            }
        }
    }

    delTomrrow(index: any) {
        this.tomorrows.splice(index, 1);
    }

    delToday(index: any) {
        this.todays.splice(index, 1);
    }

    setkeywords(keywords: any[]) {
        keywords.forEach(v => {
            this.keywords[v.id] = v.quant;
        });
    }

    changeClientSw() {
        if (this.isAllClient == false && this.clients.length ==0) {
            this.clientServer.listing({ offset: 0, limit: 5000 }).subscribe((re: any) => {
                if (re.isSucc) {
                    this.clients = re.items;
                  
                 }
            })
           
        }
    }

    addClient(index: any) {
        let row = this.clients[index];
        if (row != undefined) {
            this.clients.splice(index, 1);
            this.selectedClients.push(row);
        }
    }

    cancelClient(index: any) {
        let row = this.selectedClients[index];
        if (row != undefined) {
            this.selectedClients.splice(index, 1);
            this.clients.push(row);
        }
    }

    save() {
        if (this.keywords.length == 0) {
            msg.warn("请至少设置一个关键字");
            return;
        }
        this.onSaveDisabled = true;

        let keywords = {};

        this.keywords.forEach(k => {
            keywords[k.id] = k.quant;
        });

        let clients = [];

        if (this.isAllClient == false) {
            this.selectedClients.forEach(c => clients.push(c.name) )
        }

        let param = {
            appinfo_id: Number(this.appinfo_id),
            task_name: this.task_name,
            tomorrows:this.tomorrows,
            todays:this.todays,
            keywords:keywords,
            account_type:this.account_type,
            sort: this.sort,
            clients: clients,
        }

        this.server.saveTask(param).subscribe((re: any) => {
            this.onSaveDisabled = false;
            if (re.isSucc) {
                msg.succ("添加成功");
            } else {
                msg.error(re.error_msg);
            }
        });

    }

}
