import {Common, Observable, Injectable} from './common';

@Injectable()
export class Application {
    constructor(private common: Common) { }

    listing(body): Observable<Object>{
       return this.common.post("/app/listing", body);
    }

    del(...ids: Number[]): Observable<Object> {
        return this.common.post("/app/del", { ids: ids });
    }

    save(param: Object): Observable<Object>{
        return this.common.post("/app/add", param);
    }

    setHot(id: Number): Observable<Object>{
        return this.common.post("/app/sethot", { id: id, "ishot": 1 });
    }

    cancelHot(id: Number): Observable<Object> {
        return this.common.post("/app/sethot", { id: id,"ishot":0});
    }

    keywordListing(body): Observable<Object> {
        return this.common.post("/app/keyword.listing", body);
    }

    saveTask(body): Observable<Object> {
        return this.common.post("/app/task.add", body);
    }

    taskList(param: Object): Observable<Object>{
        return this.common.post("/app/task.listing", param);
    }

    startRunTask(task_id: number): Observable<Object>{
        return this.common.post("/app/task.startrun", { task_id: task_id });
    }

    endRunTask(task_id: number): Observable<Object>  {
        return this.common.post("/app/task.endrun", { task_id: task_id });
    }

    taskKeywords(param: Object): Observable<Object>  {
        return this.common.post("/app/task.keywords", param);
    }

}