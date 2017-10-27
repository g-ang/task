import { Component, OnInit } from '@angular/core';
import { Client } from './../../server/client';
import { msg } from './../../common/common';

@Component({
  selector: 'app-group',
  templateUrl: './add.html',
  styleUrls: ['./group.component.css']
})
export class GroupAddComponent implements OnInit {

    group_name="";

    constructor(private sever: Client) {

    }

    save() {

        this.group_name = this.group_name.trim();

        if (this.group_name == "") {
            msg.warn("分类名不能为空");
            return;
        }

        this.sever.addGroup(this.group_name).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("添加成功");
                this.group_name = "";
            }
        })

    }


    ngOnInit() {

    }
}
