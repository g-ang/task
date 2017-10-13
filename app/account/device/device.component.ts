import { Component, OnInit} from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg, Page} from './../../common/common';

import {Router, Params, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
    offset = 0;
    limit = 20;
    total = 0;
    items = [];
    account_ids = [];
    filter = { offset: 0, type_id:-1 };
    types = [];

    constructor(private account: Account, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(param =>{
            if (param['account_ids'] != undefined){
                param["account_ids"].split(",").forEach(n => this.account_ids.push(Number(n)));
            }
        })

        this.account.getDeviceTypes().subscribe((re: any) => {
            if (re.isSucc) {
                this.types = <Type[]>re.data;
            }
        });

    }

    listing(page?: Page) {

        if (page != undefined) {
            this.offset = page.offset;
            this.limit = page.rowcount;
        }

        let param = { offset: this.offset, limit: this.limit, filter: this.filter }
        this.account.deviceListing(param).subscribe((re: any) => {
            this.items = re.items;
            this.total = re.total;
        });
    }

    ngOnInit() {
        this.listing();
    }

    bind() {

        if (this.account_ids.length == 0) {
            msg.warn("请至少选择一个帐号");
        }
        this.account.bindDevice({ filter: this.filter, account_ids: this.account_ids }).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("绑定成功");
            } else {
                msg.warn(re.error_msg);
            }
        });
    }

}
