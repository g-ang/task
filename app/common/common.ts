import {Msg} from './msgs';
import {Ws} from './ws';
export {Page} from './page/page';

//web socket
var ws: Ws;

export var msg = new Msg();

export function WsConn(): Ws {
    if (ws == undefined || ws.isOpen == false) {
        ws = new Ws("127.0.0.1", 0);
    }
    return ws;
}
