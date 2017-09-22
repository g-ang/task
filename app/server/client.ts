import {Common, Observable, Injectable} from './common';

@Injectable()
export class Client {
    constructor(private common: Common) { }

    listing(body): Observable<Object>{
       return this.common.post("/client/listing", body);
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

    add(client_names: string[]): Observable<Object>{
        return this.common.post("/client/adds", { client_names: client_names });
    }
}
