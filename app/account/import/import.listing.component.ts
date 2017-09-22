import { Component, OnInit} from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg, WsConn } from './../../common/common';

@Component({
  templateUrl: './import.listing.component.html',
  styleUrls: ['./import.listing.component.css']
})

export class ImportListingComponent implements OnInit {
    types: Type[];
    device_types: Type[];

    fields: any[];
    selectedFields: any[];

    items = [];
    logs = [];
    //导入帐号方式
    importStatus = getImportStatus();
    ws = WsConn();
    navs = [];
    act = 'INSERT';
    offset = 0;
    limit = 20;

    //隐藏日志框
    logsHidden = true;

    status_txt = { 0: '未处理', 1: '已处理', 2: '处理失败',3: ' 正在处理'}
    constructor(private account: Account) {
        this.navs = [
            { label: '导入的账号', value: 'INSERT' },
            { label: '导出的账号', value: 'EXPORT' },
            { label: '解锁&更新密码的账号', value: 'UPDATE' },
            { label: '导入设备信息', value: 'INSERT_DEVICE' },

            
        ];
    }

    chanageAct(e) {
        this.listing();
    }
  ngOnInit() {

      this.account.getTypes().subscribe((re: any) => {
          if (re.isSucc) {
              this.types = <Type[]>re.data;
          }

      });

      this.account.getDeviceTypes().subscribe((re: any) => {
          if (re.isSucc) {
              this.device_types = <Type[]>re.data;
          }
      });
      this.listing();
    }


  listing() {
      let param = { filter: { act: this.act }, offset: this.offset, limit: this.limit };

      this.account.importListing(param).subscribe((re: any) => {
          if (re.isSucc == false) {
              return msg.error(re.error_msg);
          }
          this.items = re.items;
      });
  }

  //执行导入操作
  import(file:any) {
      this.logs = [];
      file.status = 3;
      this.logsHidden = false;
      this.ws.send("account.import",{ file_id: file.fileid },(res) => this.logs.push(res) );
  }
}
