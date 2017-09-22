import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type.component';
import { ServerModule } from './../../server/server.module';
@NgModule({
    imports: [ServerModule],
    declarations: [TypeComponent],
    exports: [TypeComponent],
})
export class AccountTypeModule { }
