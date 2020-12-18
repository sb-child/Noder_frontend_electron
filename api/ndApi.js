"use strict";
exports.__esModule = true;
exports.NdApi = void 0;
var socket_io_client_1 = require("socket.io-client");
var NdApi = /** @class */ (function () {
    function NdApi() {
        this.isConnected = false;
        this.wsHost = "";
        this.wsPort = 0;
    }
    NdApi.prototype.disconnect = function () {
        this.isConnected = false;
        this.lastConnectError = undefined;
        this.wsPort = 0;
        this.wsHost = "";
        if (this.wsMan) {
            this.wsMan = undefined;
        }
        [this.wsManGreeter, this.wsManUser].forEach(function (v, _, _2) {
            if (v) {
                v.disconnect();
            }
        });
    };
    NdApi.prototype.connect = function (host, port, callback) {
        var _this = this;
        this.disconnect();
        this.wsMan = new socket_io_client_1.Manager("http://" + host + ":" + port, {
            reconnectionDelayMax: 1000,
            reconnectionDelay: 500,
            timeout: 2000,
            reconnectionAttempts: 3,
            autoConnect: false
        });
        this.wsMan.open(function (err) {
            _this.lastConnectError = err;
            _this.isConnected = err == undefined;
            if (callback && !_this.isConnected) {
                callback("error", err);
            }
        });
        this.wsManGreeter = this.wsMan.socket("/greeter");
        this.wsManGreeter.off("connect");
        this.wsManGreeter.connect();
        this.wsManGreeter.once("connect", function () {
            _this.isConnected = true;
            console.log(_this.wsManGreeter.id);
            _this.wsHost = host;
            _this.wsPort = port;
            if (callback) {
                callback("success");
            }
        });
    };
    NdApi.prototype.auth = function () {
        if (!this.isConnected) {
        }
        this.wsManUser = this.wsMan.socket("/user");
        this.wsManUser.connect();
        this.wsManUser.once("connect", function () { });
    };
    return NdApi;
}());
exports.NdApi = NdApi;
function test() {
    var test1 = new NdApi();
    test1.connect("127.0.0.1", 37321, function (a, b) {
        console.log("---");
        console.log(a);
        console.log(b);
    });
}
// test();
