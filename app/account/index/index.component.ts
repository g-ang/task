import { Component, OnInit } from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg, WsConn} from './../../common/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    types: Type[];
    counts: any;
    ws = WsConn();
    logs=[];

    constructor(private account: Account) {
        
    }

    ngOnInit() {
        this.account.getTypes().subscribe((re: any) => {
            if (re.isSucc) {
                this.types = <Type[]>re.data;
            }
        });

        this.account.countAccount().subscribe((re: any)=>{
            if(re.isSucc) {
                this.counts = <Type[]>re.data;
            }
        });
    }

    upCache(account_type: number) {
        this.logs = [];
        this.ws.send("account.generateCache", { account_type: account_type }, re=>this.logs.push(re) );
    }

    delAccount(account_type: number) {
        if (confirm("确定要删除该分类下面的所有帐号?")){
            this.account.removeAccountByType(account_type).subscribe((re: any) => {
                if (re.isSucc) {
                    msg.succ("删除成功");
                }
            });
        }
    }
}
