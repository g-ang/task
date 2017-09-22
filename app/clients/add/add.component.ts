import { Component, OnInit } from '@angular/core';
import { Client } from './../../server/client';
import { msg } from './../../common/common';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    client_names:string;
    constructor(private server: Client) { }

  ngOnInit() {

  }

  save() {
      if (this.client_names == undefined || this.client_names.length == 0) {
          msg.warn("请至少添加一个客户端")
              return ;
      }
      let cliens_names = this.client_names.split("\n")

      this.server.add(cliens_names).subscribe(r => {
          this.client_names = "";
          msg.succ("添加成功");
      });
  }

}
