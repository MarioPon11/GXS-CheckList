const { app , BrowserWindow, ipcMain } = require('electron'); 

let win: typeof BrowserWindow;

const createMainWindow: Function = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createMainWindow();
});