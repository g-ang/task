import {Common, Observable, Injectable} from './common';

@Injectable()
export class Application {
    constructor(private common: Common) { }

    listing(body): Observable<Object> {
        return this.common.post("/app/listing", body);
    }

    del(id: Number): Observable<Object> {
        return this.common.post("/app/remove", { id: id });
    }

    save(param: Object): Observable<Object> {
        return this.common.post("/app/add", param);
    }

    setHot(id: Number): Observable<Object> {
        return this.common.post("/app/sethot", { id: id, "ishot": 1 });
    }

    cancelHot(id: Number): Observable<Object> {
        return this.common.post("/app/sethot", { id: id, "ishot": 0 });
    }

    keywordListing(body): Observable<Object> {
        return this.common.post("/app/keyword.listing", body);
    }

    saveTask(body): Observable<Object> {
        return this.common.post("/task/add", body);
    }

    taskList(param: Object): Observable<Object> {
        return this.common.post("/task/listing", param);
    }

    startRunTask(task_id: number): Observable<Object> {
        return this.common.post("/task/startrun", { task_id: task_id });
    }

    endRunTask(task_id: number): Observable<Object> {
        return this.common.post("/task/endrun", { task_id: task_id });
    }

    taskKeywords(param: Object): Observable<Object> {
        return this.common.post("/task/keywords", param);
    }

    keywordAdd(param: any): Observable<Object> {
        return this.common.post("/app/keyword.add", param);
    }

    taskRuns(): Observable<Object> {
        return this.common.post("/task/runlist", {})
    }

    setTaskSort(task_id: number, value: number) {
        return this.common.post("/task/setsort", { task_id: task_id, value: value});
    }

    setKeywordSort(id: number, value: number) {
        return this.common.post("/task/setkeywordsort",{id:id,sort:value});
    }

    setKeywordQuant(id: number, value: number) {
        return this.common.post("/task/setkeywordquant", { id: id, quant: value });
    }
}