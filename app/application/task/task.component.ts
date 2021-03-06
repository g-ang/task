﻿import { Component, OnInit, Input} from '@angular/core';
import {Application} from './../../server/application';
import { Client } from './../../server/client';
import { Account } from './../../server/account';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {msg} from './../../common/common';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    appinfo_id: number;
    offset = 0;
    limit = 20;
    items = [];
    useCount:any[];
    types: any[];
    accountTypeOption:any;
    keywords: any[];
    curr_task: any;
    constructor(private server: Application,
        private clientServer: Client,
        private accountServer: Account,
        private router: Router,
        private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (param['appid'] != undefined) {
                this.appinfo_id = Number(param['appid']);

                this.listing();
                this.getUseCount();
            }
        })
    }

    listing() {
        let param = { offset: this.offset, limit: this.limit, filter: { appinfo_id: this.appinfo_id } }
        this.server.taskList(param).subscribe((re: any) => {
            if (re.isSucc) {
                this.items = re.items;
                
            }
        });
    }

    getUseCount() {
        this.accountServer.getTypes().subscribe((re:any) => {
            if (re.isSucc) {
                this.types = re.data;
                this.accountTypeOption = [];
                this.types.forEach(v => { this.accountTypeOption[v.id] = v.title; });
            }
        });

        this.accountServer.useCount(this.appinfo_id).subscribe((re: any) => {
            if (re.isSucc) {
                this.useCount = re.data;
            }
        });
    }

    getKeywords(task: any) { 
        this.curr_task = task;
        let param = { offset: this.offset, limit: 200, filter: { task_id: task.task_id } }
        this.server.taskKeywords(param).subscribe((re: any) => {
            if (re.isSucc) {
                this.keywords = re.items;
            }
        });
    }

    startRun(t: any) {
        this.server.startRunTask(t.task_id).subscribe(re => { t.status = 1; msg.succ(`${t.name} 已开启`) });
    }
     
    endRun(t: any){
        this.server.endRunTask(t.task_id).subscribe(re => { t.status = 0; msg.succ(`${t.name} 已暂停`) });
    }

    updateKeywordQuant(e: any) {
        let id = this.keywords[e.id].id;
        e.value = parseInt(e.value);
        if (e.value <= 0) {
            msg.warn("请输入一个大于等于0的数字");
            return;
        }

        this.server.setKeywordQuant(id, e.value).subscribe((res: any) => {
            if (res.isSucc) {
                msg.succ("修改成功");
            } else {
                msg.error(res.error_msg);
                e.rollback();
            }
        });
    }

    updateKeywordSort(e: any){
        let id = this.keywords[e.id].id;
        e.value = parseInt(e.value);
        if (e.value <= 0) {
            msg.warn("请输入一个大于等于0的数字");
            return;
        }
        this.server.setKeywordSort(id, e.value).subscribe((res: any) =>{
            if (res.isSucc) {
                msg.succ("修改成功");
            } else {
                msg.error(res.error_msg);
                e.rollback();
            }
        });
    }
}
