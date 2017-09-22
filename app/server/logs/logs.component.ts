import { Component, OnInit, Input, Pipe, PipeTransform} from '@angular/core';

@Component({
  selector: 'logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

    @Input('data') data: string[];
    @Input() title: string;
    buttonName = '隐藏';
    @Input() hidden = false;
    constructor() {}

    click() {
        this.hidden = !this.hidden;
        if (this.hidden) {
            this.buttonName = '显示日志';
        } else {
            this.buttonName = '隐藏';
        }
    }
  
    ngOnInit() {
        if (this.hidden) {
            this.buttonName = '显示日志';
        } else {
            this.buttonName = '隐藏';
        }
    }
}

@Pipe({
    name: 'logformat'
})

export class LogFrmatPipe implements PipeTransform {
    transform(v: any): string {
        switch (typeof (v)) {
            case 'object':
                if (v.text != undefined) {
                    return v.text;
                }

                return JSON.stringify(v);

            case 'string':
                return v;

           
        }
    }
}