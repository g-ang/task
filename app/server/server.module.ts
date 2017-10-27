import {Injectable, NgModule} from '@angular/core';
import {Common} from './common';

import {Account} from './account';
import {Client} from './client';
import {Application} from './application';
import {Setting} from './setting';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {GrowlModule} from 'primeng/primeng';

import {MessageService} from 'primeng/components/common/messageservice';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {LogsComponent, LogFrmatPipe} from './logs/logs.component'
import {PageComponent} from './../common/page/page.component'

import {SortPipe} from './sort.pipe'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GrowlModule,
        BrowserModule,
        HttpClientModule
    ],
    declarations: [
        LogsComponent, LogFrmatPipe, PageComponent, SortPipe
    ],
    providers: [
        Common,
        Account,
        Client,
        Application,
        Setting
    ],
    exports: [
        CommonModule,
        FormsModule,
        GrowlModule,
        LogsComponent,
        BrowserModule,
        HttpClientModule,
        PageComponent,
        SortPipe
    ]
})

export class ServerModule {
}