import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import {ClitensModule} from './clients/clients.module';
import {ApplicationModule} from './application/application.module';

const routers: Routes = [
    {path: '', component: HomeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
      RouterModule.forRoot(routers),
      BrowserModule,
      HttpClientModule,
      AccountModule,
      ClitensModule,
      ApplicationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
