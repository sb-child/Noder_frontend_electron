const { app, BrowserWindow } = require("electron");
// const io = require('socket.io-client');
// const { Manager } = require("socket.io-client");
const lang = require("./language/lang")


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        minHeight: 100,
        minWidth: 100,
        center: true,
    });
    win.setMenu(null);
    win.loadFile("html/mainwindow.html");
    win.webContents.openDevTools();
}

// var cli = io("ws://", {
//     reconnectionDelayMax: 5000,
//     query: {
//         auth: "123",
//     },
// });
var nowLang = "zh_CN";

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
const setLang = (lang_name) => {
    nowLang = lang_name;
};
const getNowLang = () => {
    return nowLang;
};
const getLang = (lang_index) => {
    var ln = new lang.Lang(nowLang);
    return ln.getLang(lang_index);
};
const getLangList = () => {
    return lang.getLangNames();
};
const connect1 = (host, port) => {
    
}

app._io_lang_SetLang = setLang;
app._io_lang_GetNowLang = getNowLang;
app._io_lang_GetLang = getLang;
app._io_lang_GetLangList = getLangList;
