﻿import { Component, OnInit} from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg} from './../../common/common';
import { Router} from '@angular/router';
@Component({
  selector: 'account-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})

export class ImportComponent implements OnInit{
    types: Type[];
    device_types: Type[];
    account_type=-1;
    account_status =-1;
    filepath: string;
    filename: string;
    disabledUpload = false;
    disabledSave = true;
    //分隔符
    sep: string;

    //绑定的设备信息
    device_config={
        type_id: -1,
        start:0,
        end: 0,
        isBind:false,  //是否绑定设备
    };
    fields: any[];
    selectedFields: any[];

    upload_dir = `${api_addr}/account/import.upload`;
    items = [];

    //上传进度
    progress: number;
    //导入帐号方式
    importStatus = getImportStatus();

   

    constructor(private account: Account, private router: Router) {
        this.fields = [
            { label: '帐号', value: 'account_name' },
            { label: '密码', value: 'password' },
        ];

       
    }

    ngOnInit() {
        this.account.getTypes().subscribe((re:any) => {
            if (re.isSucc) {
                this.types =<Type[]>re.data;
            }
        });

        this.account.getDeviceTypes().subscribe((re: any) => {
            if (re.isSucc) {
                this.device_types = <Type[]>re.data;
            }
        });
    }

    onUpload(e) {
      let res = JSON.parse(e.xhr.responseText);
      if (res.isSucc) {
          this.disabledSave =false;
          msg.succ("上传成功");
          this.filename = res.filename;
          this.filepath = res.filepath;
          this.disabledUpload = false;
      }
    }
    onProgress(e) {
        this.progress = e.progress;
        if (e.progress < 100) {
            this.disabledUpload = true;
        }
    }
    
    save() {
        let data = {
            account_type: Number(this.account_type),
            account_status: Number(this.account_status),
            filepath: this.filepath,
            filename: this.filename,
            fields: this.selectedFields,
            sep: '----',
            device_config: this.device_config,
        }


        if (data.fields == undefined || data.fields.length ==0) {
            msg.warn("请选择导入的字段");
            return;
        }

        if (data.account_type == -1) {
            msg.warn("请选择账号类型");
            return;
        }

        if (data.account_status == -1) {
            msg.warn("请选择账号状态");
            return;
        }

        

        if (data.filename == undefined || data.filename == "") {
            msg.warn("请选择上传的文件");
            return;
        }

       

      //绑定设备信息
      this.account.saveImport(data).subscribe((re: any) => {
          if (re.isSucc) {
              msg.succ("保存成功");
              this.router.navigateByUrl(    '/account/import.listing');
          } else {
              msg.succ(re.error_msg);
          }
      });
    }

   
}