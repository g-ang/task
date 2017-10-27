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

    add_tomorrow_runtime:string;
    todays: string[];
    tomorrows: string[];
    keywords = [];
    account_type = 0;
    task_name = "";
    sort = 100;

    //禁用保存按钮
    onSaveDisabled = false;

    isAllClient = true;

    //客户端分组
    client_groups = [];
    selected_client_groups = [];


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
       
        if (e.keyCode == 13) {
            if (flag == "today") {
                this.addruntime = this.addruntime.replace(".", ":").trim();
                this.todays.push(this.addruntime);
                if (this.addruntime.length == 0) {
                    return;
                }
            } else {
                this.add_tomorrow_runtime = this.add_tomorrow_runtime.replace(".", ":").trim();
                if (this.add_tomorrow_runtime.length == 0) {
                    return;
                }
                this.tomorrows.push(this.add_tomorrow_runtime);
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
        if (this.isAllClient == false && this.client_groups.length == 0) {
            this.clientServer.groups().subscribe((re: any) => {
                if (re.isSucc) {
                    this.client_groups = re.items;
                 }
            })
           
        }
    }

    addClient(index: any) {
        let row = this.client_groups[index];
        if (row != undefined) {
            this.client_groups.splice(index, 1);
            this.selected_client_groups.push(row);
        }
    }

    cancelClient(index: any) {
        let row = this.selected_client_groups[index];
        if (row != undefined) {
            this.selected_client_groups.splice(index, 1);
            this.client_groups.push(row);
        }
    }

    save() {
        if (this.task_name == undefined || this.task_name.length == 0) {
            msg.warn("任务名称不能为空");
        }

        if (this.keywords.length == 0) {
            msg.warn("请至少设置一个关键字");
            return;
        }

        if (this.account_type == undefined || this.account_type <= 0) {
            msg.warn("请选择账号类型");
            return;
        }

        this.task_name = this.task_name.trim();
      

        this.onSaveDisabled = true;

        let keywords = {};

        this.keywords.forEach(k => {
            keywords[k.id] = k.quant;
        });

        let client_group_ids = [];

        if (this.isAllClient == false) {
            this.selected_client_groups.forEach(c => client_group_ids.push(c.id));
        }

        let param = {
            appinfo_id: Number(this.appinfo_id),
            task_name: this.task_name,
            tomorrows:this.tomorrows,
            todays:this.todays,
            keywords:keywords,
            account_type:this.account_type,
            sort: this.sort,
            client_group_ids: client_group_ids,
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
