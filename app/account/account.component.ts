import { Component, OnInit } from '@angular/core';
import {Account} from './../server/account';
import {Client} from './../server/client';
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
    limit = 10;
    total = 0;
    items = [];
    page = 1;
    bind_client_name: string;

    checked: boolean;

    consoleHeight = 40;

    filter = {
        status: 2, account_type: -1,
        client_name: '',
        account_name: '',
        is_bind_device:0,
        is_bind_client:0,
    }
    statuss = { 2: '正常', 4: '已锁定', 5: '密码错误' };

    bind_statuss = [{ id: 0,title: '所有' }, { id: 1, title: '已绑定' }, { id: 2, title: '未绑定' }];

    types = [];
    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

    clients = [];
    constructor(private router: Router, private server: Account, private clientServer: Client) { }

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

     this.clientServer.all().subscribe((re: any) => {
         if (re.isSucc) {
             this.clients = re.items;
         }
     });
    }

 client_acctions(c:any) {
     this.filter['client_id'] = c.id
     this.filter.client_name = c.name;
     this.page = 1;
     this.listing();
 }

 chanageRouter(e) {
     if (this.consoleHeight <= 5) {
         this.consoleHeight = 40;
     }
     this.router.navigateByUrl(this.curr_url);
 }
//全选
 selectAll(e: any) {
    
        this.items.forEach(t => {
            t.checked = !this.checked;
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

 bindDevice(){
     let selecteds = [];
     this.items.forEach(t => {
         if (t.checked) {
             selecteds.push(t.account.account_id);
         }
     })

     if (selecteds.length == 0) {
         return msg.warn("请至少选择一个帐号");
     }

     if (this.consoleHeight <= 5) {
         this.consoleHeight =60;
     }

     this.router.navigate(["/account/device.listing", selecteds.join(",")]);
 }

 listing(page?: Page){
     if (page != undefined) {
         this.offset = page.offset;
         this.limit = page.rowcount;
         this.page = page.page;
     }
     let param = { offset: this.offset, limit: this.limit, filter: this.filter, sort: 'account_id'}

    this.server.listing(param).subscribe((re: any) => {
        if (re.isSucc) {
            this.items = re.items;
            this.total = re.total;
        } else {
            msg.error(re.error_msg);
        }
     })
 }

 unbindclient() {
     let selecteds = [];
     this.items.forEach(t => {
         if (t.checked) {
             selecteds.push(t.account.account_id);
         }
     })

     if (selecteds.length == 0) {
         return msg.warn("请至少选择一个帐号");
     }

     if (false == confirm("确定要解绑客户端？")) {
         return;
     }

     this.server.unBindClient(selecteds).subscribe(r => {
         msg.succ("操作成功");
         this.listing();
     });
 }

 unbinddevice() {
     let selecteds = [];
     this.items.forEach(t => {
         if (t.checked) {
             selecteds.push(t.account.account_id);
         }
     })

     if (selecteds.length == 0) {
         return msg.warn("请至少选择一个帐号");
     }

     if (false == confirm("确定要解绑设备信息？")) {
         return;
     }

     this.server.unBindDevice(selecteds).subscribe(r => {
         msg.succ("操作成功");
         this.listing();
     });
 }
}