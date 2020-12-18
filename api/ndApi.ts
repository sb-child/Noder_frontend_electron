import { Manager, Socket } from "socket.io-client";

export class NdApi {
    wsMan: Manager; // = new Manager()
    wsManGreeter: Socket;
    wsManUser: Socket;
    isConnected: Boolean = false;
    lastConnectError: Error;
    wsHost: string = "";
    wsPort: Number = 0;
    constructor() {}
    disconnect() {
        this.isConnected = false;
        this.lastConnectError = undefined;
        this.wsPort = 0;
        this.wsHost = "";
        if (this.wsMan) {
            this.wsMan = undefined;
        }
        [this.wsManGreeter, this.wsManUser].forEach((v, _, _2) => {
            if (v) {
                v.disconnect();
            }
        });
    }
    connect(
        host: string,
        port: Number,
        callback?: (status: string, err?: Error) => void
    ) {
        this.disconnect();
        this.wsMan = new Manager("http://" + host + ":" + port, {
            reconnectionDelayMax: 1000,
            reconnectionDelay: 500,
            timeout: 2000,
            reconnectionAttempts: 3,
            autoConnect: false,
        });
        this.wsMan.open((err?: Error) => {
            this.lastConnectError = err;
            this.isConnected = err == undefined;
            if (callback && !this.isConnected) {
                callback("error", err);
            }
        });
        this.wsManGreeter = this.wsMan.socket("/greeter");
        this.wsManGreeter.off("connect");
        this.wsManGreeter.connect();
        this.wsManGreeter.once("connect", () => {
            this.isConnected = true;
            console.log(this.wsManGreeter.id);
            this.wsHost = host;
            this.wsPort = port;
            if (callback) {
                callback("success");
            }
        });
    }
    auth() {
        if (!this.isConnected) {
        }
        this.wsManUser = this.wsMan.socket("/user");
        this.wsManUser.connect();
        this.wsManUser.once("connect", () => {});
    }
}
function test() {
    var test1 = new NdApi();
    test1.connect("127.0.0.1", 37321, (a, b) => {
        console.log("---");
        console.log(a);
        console.log(b);
    });
}
// test();
