import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Client } from './../server/client';
import { msg, Page} from './../common/common';

class Filter {
    name = '';
    group_id = 0; 
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
    items = [];
    total = 0;
    offset = 0;
    limit = 20;
    account_types: any[];
    account_counts: any[];
    client_caches: any[];

    curr_url = '/clients';
    navs = [];
    consoleHeight = 0;

    groups=[];

    filter = new Filter();

    checked: boolean;
    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

    ngOnInit() {
        this.navs = [
            { label: '客户端列表', value: '/clients'},
            { label: '添加客户端', value: '/clients/adds'},
            { label: '添加新分组', value: '/clients/group_add'},
        ];
    }

    constructor(private server: Client, private router: Router) {
        this.listing();
        this.getGroups();
    }

    getGroups() {
        this.server.groups().subscribe((re:any) => {
            if (re.isSucc) {
                this.groups = re.items;
            }
        })
    }

    selectGroup(g: any) {
        this.filter.group_id = g.id;
        this.listing();
    }

    setCurrGroup(g: any) {
        let client_ids = [];
        this.items.forEach(v => {
            if (v.checked == true) {
                client_ids.push(v.id);
            }
        });

        if (client_ids.length == 0) {
            msg.warn("请至少选择一个客户端");
            return;
        }

        this.server.setGroup(g.id, client_ids).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("设置成功");
                this.listing();
            }
        })
    }

    selectAll() {
        this.items.forEach(v => v.checked = !this.checked);
    }

    editGroup(e: any) {
        let group_id = this.groups[e.id].id;
        this.server.editGroup(group_id, e.value).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("修改分组成功");
            }
        })
    }

    editClientName(e: any) {
        let client_id = this.items[e.id].id;
        this.server.editClientName(client_id,e.value).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("修改分组成功");
            } else {
                msg.error(re.error_msg);
                e.rollback();
            }
        })
    }

    chanageRouter(e) {
        if (this.curr_url != '/clients' ) {
            this.consoleHeight = 40;
        } else {
            this.consoleHeight = 0;
        }
        this.router.navigateByUrl(this.curr_url);
    }

    listingAll() {
        this.filter = new Filter();
        this.listing();
    }

    listing(page?: Page) {
        if (page != undefined) {
            this.offset = page.offset;
            this.limit = page.rowcount;
        }

     let param = { offset: this.offset, limit: this.limit, filter: this.filter }
     this.server.listing(param).subscribe((re:any) => {
          if (re.isSucc) {
              this.items = re.items;
              this.total = re.total;
              this.account_types = re.account_types;
              this.account_counts = re.account_counts;
              this.client_caches = re.client_caches;
          } else {
              
              msg.error(re.error_msg);
              return;
          }
          this.items.forEach((r) => {
              r['account_counts'] = this.account_counts[r.id];
              let cach = this.client_caches[r.id];
              if (cach != undefined) {
                  r['last_date'] = cach['last_date'];
                  r['status_txt'] = cach['status_txt'];
              } else {
                  r['last_date']='';
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
    
    //查看账号
    accounts(cli:any){}

    del(index: number, cli: any) {
        this.server.del(cli.id).subscribe(re => { this.items.splice(index, 1); msg.succ(`${cli.name} 删除成功`); });
    }

}
