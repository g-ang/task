import {Pipe, PipeTransform  } from '@angular/core';

export class Type {
    id: number;
    title: string;
}

@Pipe({
    name: 'typeSwitch'
})

export class TypeSwitchPipe implements PipeTransform {
    transform(v: any, types: Type[]): string {
        let name = "--";
        types.forEach((e) => { if (e.id == v) name = e.title; })
        return name;
    }
}


@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(vv: any[], s?: string): string {
        if (s == undefined) {
            return vv.toString();
        }
        var str = "";
        if (s == '\n') { s = '<br/>'; }
        let ll = vv.length-1;
        vv.forEach((v, i) => {
            if (ll == i) {
                s = '';
            }
            str += v + s;
           
        });

        return str;
    }
}