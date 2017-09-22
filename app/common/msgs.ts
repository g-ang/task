import {Message} from 'primeng/components/common/api';

export class Msg {
    public msgs: Message[] = [];
    constructor() {}
    succ(title: string, content?: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: title, detail: content });
    }

    info(title: string, content?: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: title, detail: content });
    }

    warn(title: string, content?: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: title, detail: content });
    }

    error(title: string, content?: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: title, detail: content });
    }
}
