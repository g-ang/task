import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import {ClitensModule} from './clients/clients.module';
import {ApplicationModule} from './application/application.module';

import { ConsoleComponent } from './console/console.component';
import { LoginComponent } from './login/login.component';

import {EnterModule} from  './common/enter/enter.module'

const routers: Routes = [
    {path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
      ConsoleComponent,
      LoginComponent,
  ],
  imports: [
      RouterModule.forRoot(routers),
      BrowserModule,
      HttpClientModule,
      AccountModule,
      ClitensModule,
      ApplicationModule,
      EnterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BrowserModule, HttpClientModule]
})
export class AppModule { }
