import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { TaskComponent } from './task/task.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from './../server/server.module';

import { AddComponent } from './add/add.component';
import { KeywordAddComponent } from './keyword/add/add.component';

import { AccountTypeModule } from './../account/type/type.module';

import {CheckboxModule, MultiSelectModule, FileUploadModule, SelectButtonModule, ListboxModule, InputSwitchModule} from 'primeng/primeng';
import { AddtaskComponent } from './addtask/addtask.component';
import { KeywordComponent } from './keyword/keyword.component';
import { IndexComponent } from './index/index.component';

import {EnterModule} from  '../common/enter/enter.module';
const routers: Routes = [
    {
        path: 'app', component: ApplicationComponent, children: [
            { path: '', component: IndexComponent },
            { path: 'add', component: AddComponent },
            { path: 'addtask/:appinfo_id', component: AddtaskComponent },
            { path: 'task/:appid', component: TaskComponent },
            { path: 'keyword/add/:appid', component: KeywordAddComponent },
          
        ]
    },
]

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule.forRoot(routers),
        CommonModule,
        CheckboxModule,
        MultiSelectModule,
        FileUploadModule,
        SelectButtonModule,
        ServerModule,
        AccountTypeModule,
        ListboxModule,
        InputSwitchModule,
        EnterModule,
    ],

    declarations: [
        ApplicationComponent,
        TaskComponent,
        AddComponent,
        AddtaskComponent,
        KeywordComponent,
        IndexComponent,
        KeywordAddComponent
    ]
})
export class ApplicationModule { }
