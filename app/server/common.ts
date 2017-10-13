import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {storage} from '../common/common';
import {Observable} from 'rxjs';

const api_addr = "http://120.76.158.16:1839/admin";
@Injectable()
export class Common {
    constructor(private http: HttpClient) { }


    private genToken() {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var token = "";
        for (var i = 0; i < 16; i++) {
            var id = Math.ceil(Math.random() * 35);
            token += chars[id];
        }
        return token;
    }

    private getHeader(): HttpHeaders {
        let token = storage.get("token");
        if (token == "" || token == null){
            token = this.genToken();
            storage.set("token", token);
        }
        let h = new HttpHeaders({ "Authorization": token });
        return h;
    }

    private getToken() {
        let token = storage.get("token");
        if (token == "" || token == null) {
            token = this.genToken();
            storage.set("token", token);
        }
        return token;
    }
    
    get(addr: string, params?: any): Observable<Object> {
        let options = { "headers": this.getHeader()}
        if (params != undefined){
            options['params'] = params;
        }
        return this.http.get(`${api_addr}${addr}`, options);
    }

    post(addr: string, body: any, params?: any): Observable<Object> {
        let options ={"headers":this.getHeader() }
        if (params != undefined) {
            options['params'] = params;
        }
        return this.http.post(`${api_addr}${addr}`, body, options);
    }
}

export {Injectable, Observable, api_addr}