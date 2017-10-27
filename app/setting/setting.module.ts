import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnterModule} from  '../common/enter/enter.module';
import {SelectButtonModule, RadioButtonModule} from 'primeng/primeng';
import { ScriptComponent } from './script/script.component';
import { SettingComponent } from './setting/setting.component';
import { ServerModule } from './../server/server.module';
import {UploadModule} from '../common/upload/upload.module';
const routers: Routes = [
    {path: 'setting/setting', component: SettingComponent },
    { path: 'setting/script', component: ScriptComponent},
]
@NgModule({
  declarations: [
      ScriptComponent,
      SettingComponent,
  ],
  imports: [
      RouterModule.forRoot(routers),
      BrowserModule,
      HttpClientModule,
    
      EnterModule,
      SelectButtonModule,
      UploadModule,
      ServerModule,
      RadioButtonModule

  ],
  providers: [],
  exports: [BrowserModule, HttpClientModule]
})
export class SettingModule { }
