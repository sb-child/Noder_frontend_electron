import { Manager, Socket } from "socket.io-client";

export class NdApi {
    wsMan: Manager; // = new Manager()
    wsManGreeter: Socket;
    isConnected: Boolean = false;
    lastConnectError: Error;
    wsHost: string = "";
    wsPort: Number = 0;
    constructor() {}
    connect(
        host: string,
        port: Number,
        callback?: (status: string, err?: Error) => void
    ) {
        this.isConnected = false;
        this.lastConnectError = undefined;
        this.wsMan = new Manager("http://" + host + ":" + port, {
            reconnectionDelayMax: 1000,
            reconnectionDelay: 500,
            timeout: 2000,
            reconnectionAttempts: 1,
            autoConnect: false,
        });
        this.wsMan.connect((err?: Error) => {
            this.lastConnectError = err;
            this.isConnected = false;
            if (callback) {
                callback("error", err);
            }
        });
        this.wsManGreeter = this.wsMan.socket("greeter");
        this.wsManGreeter.once("connect", () => {
            this.isConnected = true;
            if (callback) {
                callback("success");
            }
        });
    }
    auth() {
        if (!this.isConnected) {
        }
    }
}

var test1 = new NdApi();
test1.connect("127.0.0.1", 37321, (a, b) => {
    console.log("---")
    console.log(a);
    console.log(b);
});
