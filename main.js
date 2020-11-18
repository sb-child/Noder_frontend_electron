const { app, BrowserWindow } = require("electron");

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
    // win.title = "Noder Client"
    win.setMenu(null);
    win.loadFile("html/index.html");
    // win.loadFile("html/workspace.html");
    win.webContents.openDevTools();
}

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
const remoteObj = {
    name: "remote",
};

const getRemoteObject = (event) => {
    // 一秒后修改 remoteObj.name 的值
    // 并通知渲染进程重新打印一遍 remoteObj 对象
    setTimeout(() => {
        remoteObj.name = "modified name";
        win.webContents.send("modified");
    }, 1000);

    event.returnValue = remoteObj;
};
app.getRemoteObject = getRemoteObject;
