import {Common, Observable, Injectable} from './common';

@Injectable()
export class Setting extends Common {

    scriptListing(param: any): Observable<Object>{
        return this.post("/setting/script.listing", param);
    }

    scriptAdd(param): Observable<Object>{
        return this.post("/setting/script.add", param);
    }

    getSetting(): Observable<Object>{
        return this.get("/setting/setting");
    }

    saveSetting(setting:any): Observable<Object> {
        return this.post("/setting/setting", setting);
    }

}