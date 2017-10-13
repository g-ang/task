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

    constructor() {

    }

    onedit() {
        this.disable = false;
    }


    enterEdit(event: any) {
        if (event.keyCode == 13) {
            this.disable = true;
            this.update.emit({ id: this.id, value: this.value });
        }
    }

    blurEdit() {
        this.disable = true;
        this.update.emit({ id: this.id, value: this.value });
    }



    ngOnInit() {
    }

    
}

@NgModule({
    declarations: [EnterComponent],
    exports: [EnterComponent],
    imports: [BrowserModule, HttpClientModule, ServerModule]
})

export class EnterModule{ }

