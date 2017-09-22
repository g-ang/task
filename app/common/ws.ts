
export class Ws{
    conn: WebSocket;
    call = [];
    isOpen=false;
    constructor(host: string, private serid: number) {

        this.conn = new WebSocket("ws://" + host + ":1818/manage");
        
        //监听消息
        this.conn.onmessage = (event: any) => {
            var re = JSON.parse(event.data);
            if (this.call[re.cmd] != undefined) {
                this.call[re.cmd](re.args);
            }
        };

        //close
        this.conn.onclose = () => {
            this.isOpen = false;
            this.echo("连接断开");
        };

        //open
        this.conn.onopen = () => {
            this.isOpen = true;
            this.echo("连接服务器" + this.serid + "成功");
        };
    }

    echo(msg){
        console.log(msg);
    }

    send(name, arge, callback?: Function) {
        arge["serid"] = this.serid;
        var command = { "cmd": name, "args": arge};
        if (callback != undefined) {
            this.watch(name, callback);
        }
        this.conn.send(JSON.stringify(command));
    }


    watch(name: string, fun: Function) {
        this.call[name] = fun;
    }
}