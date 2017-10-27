import { Component, OnInit } from '@angular/core';
import { Account, Type, getImportStatus} from './../../server/account';
import { api_addr} from './../../server/common';
import { msg} from './../../common/common';
import { Router} from '@angular/router';
@Component({
  selector: 'app-deviceimport',
  templateUrl: './deviceimport.component.html',
  styleUrls: ['./deviceimport.component.css']
})
export class DeviceimportComponent implements OnInit {

    types: Type[];
    device_types: Type[];
    account_type = -1;
    account_status = -1;
    filepath: string;
    filename: string;
    disabledUpload = false;
    disabledSave = true;
    //分隔符
    sep: string;

   
    fields: any[];
    selectedFields: any[];
    remarks='';
    upload_dir = `${api_addr}/account/import.upload`;
    items = [];

    //上传进度
    progress: number;
    //导入帐号方式
    importStatus = getImportStatus();

    //新分类名称
    new_typename: string;


    constructor(private account: Account, private router: Router){
        this.fields = [
            { label: 'UDID', value: 'udid'},
            { label: 'SerialNumber', value: 'serial_num' },
            { label: 'IMEI', value: 'imei' },
            { label: "ECID", value: 'ecid' },
            { label: 'ICCID', value: 'iccid'},
            { label: '蓝牙地址', value: 'btaddr' },
            { label: 'Wifi地址', value: 'macaddr' },
            { label: '机型', value: 'model_number' },
            { label: '硬件版本号', value: 'hardware_version' },
            { label: '小网卡地址', value: 'router_macaddr' },
        ];
    }

    ngOnInit() {
        this.account.getDeviceTypes().subscribe((re: any) => {
            if (re.isSucc) {
                this.types = <Type[]>re.data;
            }
        });
    }

    onUpload(res:any) {
        if (res.data.isSucc) {
            this.disabledSave = false;
            msg.succ("上传成功");
            this.filename = res.data.filename;
            this.filepath = res.data.filepath;
            this.disabledUpload = false;
        }
    }

    save() {
        let data = {
            account_type: Number(this.account_type),
            account_status: Number(this.account_status),
            filepath: this.filepath,
            filename: this.filename,
            fields: this.selectedFields,
            sep: '----',
            device_config: {},
            act: 'INSERT_DEVICE',
            remarks: this.remarks,
        }
        
        if (data.fields == undefined || data.fields.length == 0) {
            msg.warn("请选择导入的字段");
            return;
        }

        if (data.account_type == -1) {
            msg.warn("请选择账号类型");
            return;
        }
        
        if (data.filename == undefined || data.filename == "") {
            msg.warn("请选择上传的文件");
            return;
        }

        //绑定设备信息
        this.account.saveImport(data).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ("保存成功");
                this.router.navigateByUrl('/account/import.listing');
            } else {
                msg.succ(re.error_msg);
            }
        });
    }

    saveNewType() {
        this.new_typename=this.new_typename.trim();
        if (this.new_typename.length == 0) {
            msg.warn("分类名称不能为空");
            return;
        }

        this.account.saveNewDeviceType(this.new_typename).subscribe((re: any) => {
            if (re.isSucc) {
                msg.succ(`${this.new_typename} 保存成功`);
                this.types.push(re.item);
                this.new_typename = "";
                this.account_type = re.type_id;
            } else {
                msg.error(re.error_msg);
            }
        })
    }

}
