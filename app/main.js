const { app, BrowserWindow } = require('electron');

app.commandLine.appendSwitch('ignore-certificate-errors')

function createWindow() {
  const [ width, height ] = [1400, 780];
  let win = new BrowserWindow({
    minWidth: width,
    minHeight: height,
    maxWidth: width,
    maxHeight: height,
    nodeIntegration: true,
  });
  win.setMenuBarVisibility(true);
  win.loadURL("http://colinhartigan.github.io/valorant-skin-manager");
}

app.whenReady().then(() => {
  createWindow();
})