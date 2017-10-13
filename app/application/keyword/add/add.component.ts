import { Component, OnInit } from '@angular/core';
import { Application } from './../../../server/application';
import { msg } from './../../../common/common';
import {Router, Params, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'keyword-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class KeywordAddComponent implements OnInit {
    keywords: string;
    appinfo_id: number;
    constructor(private server: Application, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (param['appid'] != undefined) {
                this.appinfo_id = Number(param['appid']);

            }
        })
    }

  save() {
      if (this.keywords == undefined || this.keywords.length == 0) {
          msg.warn("请至少添加一个关键字")
              return ;
      }

      let keywords = this.keywords.split("\n");

      this.server.keywordAdd({ keywords: keywords, appinfo_id: this.appinfo_id }).subscribe(r => {
          this.keywords = "";
          msg.succ("添加成功");
      });
  }

}
