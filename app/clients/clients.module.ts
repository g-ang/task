import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import { ServerModule } from './../server/server.module';
import {RouterModule, Routes} from '@angular/router';
import { ClientsComponent } from './clients.component';

import {CheckboxModule, MultiSelectModule, FileUploadModule, SelectButtonModule} from 'primeng/primeng';
import { AddComponent } from './add/add.component';
const routers: Routes = [
    {
        path: 'clients', component: ClientsComponent, children: [
            { path: 'adds', component: AddComponent },
        ]
    },
]
@NgModule({
  declarations: [
      ClientsComponent,
      AddComponent,
  ],
  imports: [
      RouterModule.forRoot(routers),
      BrowserModule,
      HttpClientModule,
      ServerModule,
      CheckboxModule, MultiSelectModule, FileUploadModule, SelectButtonModule
  ],
  providers: [],
  bootstrap: [],
  exports: []
})
export class ClitensModule { }
