import {Common, Observable, Injectable} from './common';

@Injectable()
export class Client {
    constructor(private common: Common) { }

    listing(body): Observable<Object>{
       return this.common.post("/client/listing", body);
    }

    all(): Observable<Object> {
        return this.common.post("/client/all", {});
    }

    del(...ids: Number[]): Observable<Object> {
        return this.common.post("/client/del", { ids: ids });
    }

    enabled(...ids: Number[]): Observable<Object>{
        return this.common.post("/client/enabled", { ids: ids });
    }

    disabled(...ids: Number[]): Observable<Object> {
        return this.common.post("/client/disabled", { ids: ids});
    }

    add(client_names: String[]): Observable<Object>{
        return this.common.post("/client/adds", { client_names: client_names });
    }

    groups(): Observable<Object>{
        return this.common.post("/client/groups", {});
    }

    setGroup(group_id: Number, ids: Number[]): Observable<Object> {
        return this.common.post("/client/setgroup", { group_id: group_id, client_ids: ids });
    }

    addGroup(new_name: String):Observable<Object>{
        return this.common.post("/client/group.add", { group_name: new_name });
    }

    editGroup(group_id: Number, new_name: String) {
        return this.common.post("/client/group.edit", { group_name: new_name, id: group_id });
    }

    editClientName(client_id: Number, new_name: String) {
        return this.common.post("/client/edit.name", { client_name: new_name, client_id: client_id });
    }
}
