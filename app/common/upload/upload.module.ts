import {Directive, ElementRef, Input, Output, EventEmitter, Component, NgModule} from  '@angular/core';

import {storage} from '../common';
import { ServerModule } from '../../server/server.module';

@Component({
    selector: 'uploadbox',
    templateUrl: 'upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent {
    file: any;
    @Input('addr') upload_addr: string;
    @Input() params: any;
    @Input() accept: string;
    @Output() success = new EventEmitter();
    buttonName = '上传';
    buttonDisable = false;

    uploadStatus(e: any) {
        if (e.status == 2) {
            this.success.emit(e);
            this.buttonDisable = false;
        } else {
            this.buttonDisable = true;
        }
        this.buttonName = e.text;
    }
}

@Directive({
    selector: '[upload]',
    host: {
        '(change)': 'upload($event.target)'
    }
})

export class UploadDirective {
    file: any;
    @Input('upload') upload_addr: string;
    @Input('params') params: any;
    @Output() status = new EventEmitter();

    constructor(_elm: ElementRef) {
        this.file = _elm.nativeElement;
    }

    upload(a) {
        let file = this.file.files[0];
        let xhr = new XMLHttpRequest();
        let formdata = new FormData();
        formdata.append("file", file);

        if (this.params != undefined) {
            for (let k in this.params) {
                formdata.append(k, this.params[k]);
            }
        }
        xhr.open("POST", this.upload_addr);
        xhr.overrideMimeType("application/octet-stream");
        xhr.setRequestHeader("Authorization", storage.get("token"));

        this.status.emit({ text: `${file.name} 上传中...`, status: 1 });

        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                let res = JSON.parse(xhr.responseText);
                res['status'] = 2;
                res['text'] = `${file.name} 上传成功`;

                this.status.emit(res);
            }
        })
        xhr.send(formdata)
    }
}

@NgModule({
    declarations: [UploadComponent, UploadDirective],
    exports: [UploadComponent, UploadDirective],
    imports: [ ServerModule]
})

export class UploadModule { }
