import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Application} from './../../server/application';
import {Router, Params} from '@angular/router';
import {msg} from './../../common/common';
@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.css']
})
export class KeywordComponent implements OnInit {

    offset = 0;
    limit = 20;
    items = [];
    total = 0;
    sort = 'id DESC';

    @Input()appinfo_id: number;
    @Input()selecteds =[];

    constructor(private server: Application, private router: Router) { }

    ngOnInit() {
        if (this.appinfo_id > 0) {
            this.listing();
        }
    }

    listing() {
        let param = {
            offset: this.offset, limit: this.limit, sort: this.sort, filter: { appinfo_id: this.appinfo_id } }
        this.server.keywordListing(param).subscribe((re: any) => {
            if (re.isSucc) {
                this.items = re.items;
                this.total = re.total;
            } else {
                msg.error(re.error_nsg);
            }
        })
    }

    add(index) {
        let row = this.items[index];
        if (row != undefined) {
            this.items.splice(index, 1);
            this.selecteds.push(row);
        }
    }

    cancel(index) {
        let row = this.selecteds[index];
        if (row != undefined) {
            this.selecteds.splice(index, 1);
            this.items.push(row);
        }
    }
}
