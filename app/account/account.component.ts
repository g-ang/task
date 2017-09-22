import { Component, OnInit } from '@angular/core';
import {Account} from './../server/account';
import {Router} from '@angular/router';
import { ServerModule } from './../server/server.module';
import { Page, msg} from './../common/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
    navs = [];
    curr_url = '/account';
    offset = 0;
    limit = 20;
    total = 0;
    items = [];
    bind_client_name: string;

    consoleHeight = 40;

    filter = { status: 2, account_type: -1, client_name: '',account_name:''}
    statuss = { 2: '正常', 4: '已锁定', 5: '密码错误' }
    types = [];
    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

    constructor(private router: Router, private server: Account) { }

 ngOnInit() {
     this.navs = [
         { label: '帐号类型', value: '/account' },
         { label: '导入账号', value: '/account/import' },
         { label: '导入设备信息', value: '/account/device.import' },
         { label: '导入/导出文件列表', value: '/account/import.listing' },
     ];

     this.listing();
     this.server.getTypes().subscribe((re: any) => {
         if (re.isSucc) {
             this.types = re.data;
         }
     })
 }


 chanageRouter(e) {
     this.router.navigateByUrl(this.curr_url);
 }
//全选
 selectAll() {
     this.items.forEach(t => {
         t.checked = true;
     })
 }

//绑定客户端
 saveBind() {
     if (this.bind_client_name == undefined || this.bind_client_name == "") {
         msg.warn("请输入客户端编号");
         return 
     }
     let selecteds = [];
     let isErr = false;
     this.items.forEach(t => {
         if (t.checked) {
             selecteds.push(t.account.account_id);
         }
     })

     if (selecteds.length == 0) {
         msg.warn("请至少选择一个帐号");
         return 
     }

     this.server.saveBindClient(this.bind_client_name, selecteds).subscribe((re: any) => {
         if (re.isSucc) {
             msg.succ("绑定成功");
             this.items.forEach(t => { if (t.checked){ t.account.client_name = this.bind_client_name } });
         } else {
             msg.error(re.error_msg);
         }
     });
 }

 listing(page?: Page){
     if (page != undefined) {
         this.offset = page.offset;
         this.limit = page.rowcount;
     }
     let param = { offset: this.offset, limit: this.limit, filter: this.filter, sort: 'account_id'}

    this.server.listing(param).subscribe((re: any) => {
         if (re.isSucc) {
             this.items = re.items;
             this.total = re.total;
             console.log(this.total);
         }
     })

 }
}