import { Component, OnInit, Input, OnChanges, forwardRef} from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg} from './../../common/common';
import { Router} from '@angular/router';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SELECTBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeComponent),
    multi: true
};

@Component({
    selector: 'account-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.css'],
    providers: [SELECTBUTTON_VALUE_ACCESSOR]
})
export class TypeComponent implements OnInit, ControlValueAccessor{
    types = [];
    account_type: number;
    @Input() selected: number;

    constructor(private server: Account) { }
    value: any;
    onModelChange: Function = () => { };

    onModelTouched: Function = () => { };

    ngOnInit() {
        this.server.getTypes().subscribe((re: any) => {
            if (re.isSucc) {
                this.types = <Type[]>re.data;
            }
        })
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void{

    }

    change() {
        this.onModelChange(this.selected);
    }

    writeValue(value: any): void{
        this.value = value;
    }
}