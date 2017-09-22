import {Common, Observable, Injectable} from './common';

@Injectable()
export class Account{

    constructor(private common: Common) {}

    listing(param): Observable<Object> {
        return this.common.post("/account/listing", param);
    }

    getTypes(): Observable<Object> {
        return this.common.get("/account/types");
    }

    getDeviceTypes(): Observable<Object> {
        return this.common.get("/account/device.types");
    }

    saveImport(body: any): Observable<Object>{
        return this.common.post("/account/import.save",body);
    }

    importListing(body: any): Observable<Object>{
     
        return this.common.post("/account/import.listing", body);
    }

    countAccount(): Observable<Object>{
        return this.common.get("/account/count");
    }

    useCount(appinfo_id: number): Observable<Object> {
        return this.common.post("/account/useCount", { appinfo_id: appinfo_id });
    }

    saveBindClient(client_name: string, account_ids: number[]): Observable<Object>  {
        return this.common.post("/account/bindClient", { client_name: client_name, account_ids: account_ids});
    }
}

export class Type{
    id: number;
    title: string;
}

export function getStatus(): Type[]{
    return <Type[]>[
        { id: 0, title: "未过检" },
        { id: 0, title: "已过检" },
        { id: 0, title: "已过检" },
    ]
}

export function getImportStatus(): Type[] {
    return <Type[]>[
        {id:0,title: "导入未过检新号"},
        {id:2,title: "导入已过检新号"},
        {id:3,title: "导入解锁或更新密码的帐号"},
    ]
}