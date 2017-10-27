import {Input, Component, OnInit, EventEmitter, Output, OnChanges} from '@angular/core';
import {msg,Page} from '../common';

@Component({
    selector: '[page]',
    templateUrl: 'page.component.html'
})

export class PageComponent implements OnInit, OnChanges {
    @Input('page') page: number;
    @Input('total') total: number;
    @Input('rowcount') rowcount: number;
    @Input('mod') mod: string;
    @Output('callback') callback = new EventEmitter();
    nextOff = false;
    previousOff = true;
    pagetotal = 0;
    offset = 0;
    selectLimit = [10, 20, 50, 100,150,200];

    constructor() {}

    ngOnChanges(e: any) {
        if (e.page) {
            this.page = e.page.currentValue;
        }
        if (e.total) {
            this.pagetotal = Math.ceil(this.total / this.rowcount);
        }

        if (e.rowcount != undefined) {
            this.pagetotal = Math.ceil(this.total / this.rowcount);
        }
    }

    ngOnInit() {
        if (typeof this.mod == 'undefined') {
            this.mod = "def";
        }
        if (this.rowcount > this.total) {
            this.nextOff = true;
        }
        this.pagetotal = Math.ceil(this.total / this.rowcount);
    }

    next() {
        this.page++;
        this.call();
    }

    previous() {
        this.page--;
        this.call();
    }

    reload() {
        this.call();
        msg.succ("刷新成功");
    }

    call() {
        this.offset = Math.ceil(this.rowcount * (this.page - 1));
        this.callback.next(new Page(this.offset, this.rowcount, this.page));
        this.test(this.offset);
    }

    last() {
        this.page = this.pagetotal;
        this.call();
    }

    first() {
        this.page = 1;
        this.call();
    }

    test(offset: number) {
        if (offset + this.rowcount >= this.total) {
            this.nextOff = true;
        } else {
            this.nextOff = false;
        }
        if (offset == 0) {
            this.previousOff = true;
        } else {
            this.previousOff = false;
        }
    }
}
