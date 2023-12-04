import { app, BrowserWindow, screen, ipcMain, shell, dialog, globalShortcut, Notification, Menu, Tray, MessageBoxOptions } from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import * as path from 'path';
import Store from 'electron-store';
import nodemailer from 'nodemailer';
import { userInfo } from 'os';
import dotenv from 'dotenv';

dotenv.config();

const store = new Store();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'notifications.gxs@gmail.com',
    pass: 'iriv kyqw sckm gwfw'
  }
});

const TrayIcon = '../renderer/assets/GXS-Checklist.ico';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const appLock: boolean = app.requestSingleInstanceLock();

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 700,
    width: 500,
    resizable: false,
    frame: false,
    skipTaskbar: true,
    icon: path.join(__dirname, './assets/icons/GXS-Checklist.ico'),
    x: screen.getPrimaryDisplay().workAreaSize.width - 510,
    y: screen.getPrimaryDisplay().workAreaSize.height - 710,
    alwaysOnTop: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('blur', () => {
    // mainWindow.hide();
  });
};

if (!appLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });

  app.on('ready', () => {
    createWindow();
    const tray = new Tray(path.join(__dirname, TrayIcon));
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show', click: () => { mainWindow.show(); } },
      { label: 'Quit', click: () => { app.quit(); } },
    ]);
    tray.setToolTip('GXS Checklist');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
      mainWindow.show();
    });
  });
}

app.on('window-all-closed', () => {
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

//SECTION - IPC Events

ipcMain.handle('get-data', async (event) => {
  const data = await fetchDataFromDatabase();
  return data;
});

ipcMain.handle('update-data', async (event, data: object) => {
  store.set('checklist-data', data);
});

ipcMain.handle('get-emails', async (event) => {
  const email = await fetchEmailFromDatabase();
  console.log('The email is:', email);
  return email;
});

ipcMain.handle('save-settings', async (event, data: settingsData) => {
  console.log('Saving settings:', data.tabs, data.emails);
  store.set('checklist-data', data.tabs);
  store.set('emails', data.emails);
  mainWindow.reload();
  console.log('Settings saved!', typeof store.get('emails'), store.get('emails'));
  return 'Success';
});

ipcMain.handle('send-email', async (event, orderData: any) => {
  const { accountName, orderNumber, checkedRows, typeOfWork } = orderData[0];
  console.log('Sending email...', accountName, orderNumber, checkedRows, typeOfWork, orderData);
  const emailList: string[] = Object.values(store.get('emails'));
  emailList.push('gxs.mpon@gmail.com');
  const receiversList = emailList.join(', ');
  const User = userInfo().username;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const emailChecklist = populateEmail(checkedRows);
  const emailHtml = `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Task Report</title>
      <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
      <style>
          body {
              font-family: 'Roboto', sans-serif;
              color: #000;
              background-color: #fff;
          }
  
          .header {
              background-color: #000;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
          }
  
          .content {
              padding: 20px;
              border: 1px solid #0f5beb;
              margin: 20px;
          }
  
          .footer {
              padding: 20px;
              text-align: center;
              border-top: 1px solid #0f5beb;
          }
  
          .accent {
              color: #0f5beb;
          }
  
          .title {
              color: #fff;
          }
  
          table {
              margin-bottom: 20px;
              border: none;
          }
  
          .checklist-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
          }
  
  
          .icon {
              margin-right: 10px;
          }
      </style>
  </head>
  
  <body>
      <div class="header">
          <img src="https://static.wixstatic.com/media/3ceef4_2e20a110e64f4e86abc35e7e10e7c0f8~mv2.png/v1/fill/w_368,h_162,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3ceef4_2e20a110e64f4e86abc35e7e10e7c0f8~mv2.png"
              alt="GraphXSource Logo" class="logo">
          <h1 class="title">${accountName} Task Report</h1>
      </div>
      <div class="content">
          <table width="100%">
              <tr>
                  <td><strong>Employee:</strong> ${User}</td>
                  <td><strong>Order Number:</strong> ${orderNumber}</td>
                  <td><strong>Date:</strong> ${currentDate}</td>
                  <td><strong>Time of Completion:</strong> ${currentTime}</td>
                  <td><strong>Type of Work:</strong> ${typeOfWork}</td>
              </tr>
          </table>
  
          <h2>Task Checklist:</h2>
          ${emailChecklist}
      </div>
      <div class="footer">
          <p>Para preguntas, consultas o reportes de bugs, favor contactarnos via: <a
                  href="mailto:mario.pon@graphxsource.com" class="accent">mario.pon@graphxsource.com</a></p>
      </div>
  </body>
  
  </html>`;
  const emailHeader = `${accountName} Task Report: ${typeOfWork}`;

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '<notifications.gxs@gmail.com>',
      to: receiversList,
      subject: emailHeader,
      html: emailHtml
    }, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    return info;
  } catch (error) {
    return 'Error sending email';
  }
});

//!SECTION

//SECTION - Functions 

function fetchDataFromDatabase(): Promise<any> {
  const data = store.get('checklist-data');

  /* // Tab names
  const fullData: object[] = [{
    name: 'Welcome!',
    values: [
      'Welcome to the CheckList!',
      'Please Click on the Gear Icon to setup your tasks!'
    ]
  }]; */

  return new Promise((resolve) => {
    if (data) {
      resolve(data);
    } else {
      resolve(null);
    }
  });
}

function fetchEmailFromDatabase(): Promise<any> {
  const email = store.get('emails');
  return new Promise((resolve) => {
    if (email) {
      resolve(email);
    } else {
      resolve(['jhon.doe@test.com', 'jane.doe@test.com']);
    }
  });
}

function populateEmail(MyObject: object) {
  let htmlString = ''; // Initialize an empty string to accumulate the HTML

  Object.entries(MyObject).forEach(([key, value]) => {
    const svgString = value ? `&#x2705;` : `&#x274C;`

    htmlString += `
      <div class="checklist-item" key=${key}>
        <span class="icon">${svgString}</span>
        <span>${key}</span>
      </div>
    `;
  });

  return htmlString; // Return the accumulated HTML string
}

//!SECTION

//SECTION - Types

interface settingsData {
  tabs: object[],
  emails: string[]
}

//!SECTION