import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ServerModule } from './../server/server.module';
import { AccountTypeModule } from './type/type.module';

import {CheckboxModule, MultiSelectModule, FileUploadModule, SelectButtonModule, ToggleButtonModule} from 'primeng/primeng';

import {AccountComponent} from './account.component';
import {TypeSwitchPipe, JoinPipe} from './../common/array';
import {IndexComponent} from './index/index.component';
import {ExportComponent} from './export/export.component';
import {ImportComponent} from './import/import.component';
import {ImportListingComponent} from './import/import.listing.component';
import {DeviceimportComponent} from './deviceimport/deviceimport.component';
import { DeviceComponent } from './device/device.component';
import {UploadModule} from '../common/upload/upload.module';


const routers: Routes = [{
    path: 'account', component: AccountComponent, children: [
        {path: '', component: IndexComponent },
        {path: 'export', component: ExportComponent },
        {path: 'import', component: ImportComponent },
        {path: 'import.listing', component: ImportListingComponent },
        {path: 'device.import', component: DeviceimportComponent },
        {path: 'device.listing/:account_ids', component: DeviceComponent }
    ]
}
]

@NgModule({
    declarations: [
        IndexComponent,
        AccountComponent,
        ImportComponent,
        ImportListingComponent,
        ExportComponent,
        TypeSwitchPipe,
        JoinPipe,
        DeviceimportComponent,
        DeviceComponent,
     
    ],
    imports: [
        RouterModule.forRoot(routers),
        FileUploadModule,
        HttpClientModule,
        ServerModule,
        CheckboxModule,
        SelectButtonModule,
        MultiSelectModule,
        AccountTypeModule,
        UploadModule],
    providers: [],
    exports: [RouterModule, ServerModule, CheckboxModule]
})
export class AccountModule {
}