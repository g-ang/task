import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';

const api_addr = "http://g.com:1839/admin";
@Injectable()
export class Common {
    constructor(private http: HttpClient) { }


    get(addr: string, params?: any): Observable<Object> {
        let options = {}
        if (params != undefined) {
            options['params'] = params;
        }
        return this.http.get(`${api_addr}${addr}`, options);
    }

    post(addr: string, body: any, params?: any): Observable<Object> {
        let options = {}
        if (params != undefined) {
            options['params'] = params;
        }
        return this.http.post(`${api_addr}${addr}`, body, options);
    }
}

export {Injectable, Observable, api_addr}