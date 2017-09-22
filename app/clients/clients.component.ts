import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Client } from './../server/client';
import { msg } from './../common/common';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    items = [];
    total = 0;
    offset = 0;
    limit = 2000;
    account_types: any[];
    account_counts: any[];
    client_caches: any[];

    curr_url = '/clients';
    navs = [];
    consoleHeight = 0;

    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

    ngOnInit() {
        this.navs = [
            { label: '客户端列表', value: '/clients' },
            { label: '添加客户端', value: '/clients/adds'},
        ];
    }

    constructor(private server: Client, private router: Router) {
        this.listing();
    }

    chanageRouter(e) {
        if (this.curr_url != '/clients' ) {
            this.consoleHeight = 40;
        } else {
            this.consoleHeight = 0;
        }
        this.router.navigateByUrl(this.curr_url);
    }

    listing() {
      let param = { offset: this.offset, limit: this.limit }
      this.server.listing(param).subscribe((re:any) => {
          if (re.isSucc) {
              this.items = re.items;
              this.total = re.total;
              this.account_types = re.account_types;
              this.account_counts = re.account_counts;
              this.client_caches = re.client_caches;
          }
          this.items.forEach((r) => {
              r['account_counts'] = this.account_counts[r.id];
              let cach = this.client_caches[r.id];
              if (cach['last_time']) {
                  r['last_date'] = cach['last_date'];
                  r['last_time'] = cach['last_time'];
                  r['status_txt'] = cach['status_txt'];
              } else {
                  r['last_date']='';
                  r['last_time'] = 0;
                  r['status_txt'] = '';
              }
          })

      })
    } 

    enabled(cli?: any) {
        let ids = [];
        if (cli == undefined) {
            this.items.forEach(c => ids.push(c.id))
            this.server.enabled(...ids).subscribe(re => {
                this.items.forEach(c => c.disabled = false);
                msg.succ(`全部已开启`);
            });
        } else {
            this.server.enabled(cli.id).subscribe(re => { cli.disabled = false; msg.succ(`${cli.name} 已开启`);  });
        }
    }

    disabled(cli?: any) {
        let ids = [];
        if (cli == undefined) {
            this.items.forEach(c => ids.push(c.id))
            this.server.disabled(...ids).subscribe(re => {
                this.items.forEach(c => c.disabled = true);
                msg.succ(`全部已禁用`);
            });
        } else {
          
            this.server.disabled(cli.id).subscribe(re => { cli.disabled = true; msg.succ(`${cli.name} 已禁用`); });
        }
    }

    del(index: number, cli: any) {
        this.server.del(cli.id).subscribe(re => { this.items.splice(index, 1); msg.succ(`${cli.name} 删除成功`); });
    }

}
