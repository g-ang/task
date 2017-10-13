import { Component, OnInit } from '@angular/core';
import { msg, WsConn } from './../common/common';
import {Application} from './../server/application';
@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

    ws = WsConn();
    get_tasks = [];
    complete_tasks = [];
    failing_tasks = [];
    fails = [];
    tasks = [];
    keywords = [];
    wait_tasks = [];

    constructor(private appServer: Application){}

    listing() {
        this.appServer.taskRuns().subscribe((res: any) => {
            if (res.isSucc) {
                this.tasks = res.run_tasks;
                this.wait_tasks = res.wait_tasks;
                this.get_tasks = res.logs.gets;
                this.complete_tasks = res.logs.completes;
                this.failing_tasks = res.logs.failings;
            }
        });
    }

    reload() {
        this.listing();
        msg.succ("刷新成功");
    }
    ngOnInit() {
        this.listing();
      this.ws.watch("api.task.get", (res) => {
          res["timeout"] = 0;
          res["timeout_txt"] = '0 秒前';
          this.get_tasks.unshift(res);
      });

      this.ws.watch("api.task.complete", (res) => {
       
          res["timeout"] = 0;
          res["timeout_txt"] = '0 秒前';
          this.complete_tasks.unshift(res);
      })
    
      this.ws.watch("api.task.failing", (res) => {
          res["timeout"] = 0;
          res["timeout_txt"] = '0 秒前';
          this.failing_tasks.unshift(res);
      })

      this.ws.watch("fail", (res) =>{
          res["timeout"] = 0;
          res["timeout_txt"] = '0 秒前';
          this.fails.unshift(res);
      });
      
      let h = 3600
      let d = h * 24
      let timeoutSum = (timeout: number) => {
          if (timeout > d) {
              let s = parseInt(String(timeout / d));
              return `${s} 天前`;
          }
          if (timeout > h) {
              let s = parseInt(String(timeout / h));
              return `${s} 小时前`;
          }

          if (timeout > 60) {
              let s = parseInt(String(timeout / 60));
              return `${s} 分钟前`;
          }

          return `${timeout} 秒前`;
      }
      setInterval(() => {
          this.fails.forEach(row => {
              row["timeout_txt"] = timeoutSum(++row["timeout"]);
          });

          this.get_tasks.forEach(row => {
              row["timeout_txt"] = timeoutSum(++row["timeout"]);
          });

          this.complete_tasks.forEach(row => {
              row["timeout_txt"] = timeoutSum(++row["timeout"]);
          });

          this.failing_tasks.forEach(row => {
              row["timeout_txt"] = timeoutSum(++row["timeout"]);
          });
      }, 1000);
    }

    getKeywords(t: any) {
        this.appServer.taskKeywords({ limt:1000, offset: 0, filter: { task_id: t.task_id } }).subscribe((re:any) => {
            if (re.isSucc){
                this.keywords = re.items;
            }
        })
    }

    updateSort(v) {
        this.appServer.setTaskSort(Number(v.id), Number(v.value)).subscribe((re:any) => {
            if (re.isSucc) {
                msg.succ("修改成功");
            }
        });
    }

    stopTask(index: number, t: any) {
        this.appServer.endRunTask(t.task_id).subscribe((re: any) => {
            if (re.isSucc) {
                this.tasks.splice(index, 1);
                msg.succ(`${t.name}已暂停`);
            }
        });
    }

}
