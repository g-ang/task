import { Component, OnInit } from '@angular/core';
import {isLocalhost,msg} from '../../common/common';
import { api_addr} from './../../server/common';
import {Setting} from './../../server/setting';

export class Script {
    name:string
    path: string
    version: number
    desc: string
}

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

    upscript_dir: string;
    script = new Script();
    consoleHeight = 40;

    total = 0;
    page = 1;
    limit = 10;
    offset = 0;

    items = [];
    constructor(private server: Setting) {
        this.upscript_dir = `${api_addr}/setting/upscript`;
        this.listing();
    }

    listing(page?: any) {
        if (page != undefined) {
            this.limit = page.rowcount;
            this.offset = page.offset;
        }

        this.server.scriptListing({ limit: this.limit, offset: this.offset, filter: {} }).subscribe((re:any) => {
            if (re.isSucc) {
                this.items = re.data.items;
                this.total = re.data.total;
            }
        })
    }

    uploadSuccess(e) {
        this.script.path = e.data.filepath;
    }

    save() {

        if (this.script.path == undefined || this.script.path.trim().length == 0) {
            msg.warn("请上传脚本文件");
            return;
        }

        if (this.script.name == undefined || this.script.name.trim().length == 0) {
            msg.warn("脚本名称不能为空");
            return;
        }

        if (this.script.version == undefined || this.script.version <=0) {
            msg.warn("版本号不能为空");
            return;
        }

        this.server.scriptAdd(this.script).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("上传成功");
                this.script = new Script();
            }
        })
    }

    setConsoleHeight(n: any) {
        this.consoleHeight = n;
    }

   ngOnInit() {}

}
