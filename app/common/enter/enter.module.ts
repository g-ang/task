import { Component, OnInit ,Input,EventEmitter,Output,NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ServerModule } from '../../server/server.module';

@Component({
    selector: 'enter',
    templateUrl: './enter.component.html',
})

export class EnterComponent implements OnInit {
   
    @Input('val') value: string;
    @Input() id: any;
    @Output() update = new EventEmitter();

    disable = true;

    //更改前的值
    private old_value: string;

    onedit() {
        this.disable = false;
        this.old_value = this.value;
    }

    enterEdit(event: any) {
        if (event.keyCode == 13) {
            this.blurEdit();
        }
    }

    blurEdit() {
        this.disable = true;

        if (typeof this.value == 'string') {
            this.value = this.value.trim();
        }

        if (this.value.length == 0) {
            this.value = this.old_value;
            return;
        }

        if (this.old_value == this.value) {
            return;
        }

        this.update.emit({
            id: this.id, value: this.value, rollback: () => {
                this.value = this.old_value;
            }
        });
    }

    ngOnInit(){}
}

@NgModule({
    declarations: [EnterComponent],
    exports: [EnterComponent],
    imports: [BrowserModule, HttpClientModule, ServerModule]
})

export class EnterModule{ }

