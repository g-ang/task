import { Component, OnInit } from '@angular/core';
import {msg} from '../../common/common';
import {Setting} from './../../server/setting';

class Settings{
    on_repeat_runtask: number;
    get_task_mod: number;
    on_repeat_account: number;
    on_repeat_filter_ip: number;
};

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

    settings = new Settings();

    constructor(private server: Setting) {

        this.server.getSetting().subscribe((re: any) => {
            this.settings = re.data;
        });
    }

    save() {
        this.settings.on_repeat_runtask = Number(this.settings.on_repeat_runtask);
        this.settings.get_task_mod = Number(this.settings.get_task_mod);
        this.settings.on_repeat_account = Number(this.settings.on_repeat_account);
        this.settings.on_repeat_filter_ip = Number(this.settings.on_repeat_filter_ip);
        this.server.saveSetting(this.settings).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("保存成功");
            } else {
                msg.error(re.error_msg);
            }
        });
    }

  ngOnInit() {

  }

}
