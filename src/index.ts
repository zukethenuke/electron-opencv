import { app, BrowserWindow } from 'electron';
import { PythonShell } from 'python-shell';
import { spawn } from 'child_process';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
let pyProcess;
let mainWindow: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  pyProcess = new PythonShell(`${__dirname}/../../src/python/rtsp_stream.py`, { mode: 'text' });

  pyProcess.on('message', function (frame) {
    // handle message (a line of text from stdout)
    // console.log('******* frame ***********', frame)
    mainWindow.webContents.send('video:frame', frame)
  });
  
  pyProcess.on('close', function (message) {
    // handle message (a line of text from stdout)
    console.log('close', message)
  });

  // pyProcess = spawn('python', ['-u', './python/rtsp_stream.py']);

  // pyProcess.stdout.on('data', (data) => {
  //   console.log(`******** data:${data} *********`);
  // });

  // // console.log(pyProcess)

  // pyProcess.on('error', (err) => {
  //   console.log('error', err)
  // })

  // pyProcess.on('close', (code) => {
  //   console.log('closing: ', code)
  // })

  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
