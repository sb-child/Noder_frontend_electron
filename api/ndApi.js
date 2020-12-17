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
    NdApi.prototype.connect = function (host, port, callback) {
        this.wsMan = new socket_io_client_1.Manager("http://" + host + ":" + port, {
            reconnectionDelayMax: 1000,
            timeout: 2000,
            autoConnect: false
        });
        this.wsMan.connect(function (err) {
            console.log(err);
            if (callback) {
                callback(err);
            }
        });
    };
    return NdApi;
}());
exports.NdApi = NdApi;
var test1 = new NdApi();
test1.connect("127.0.0.1", 37321);
