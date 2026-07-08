// electron.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 850,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false, // 禁用 web 安全性
    },
  });

  // const startURL = isDev
  //   ? "http://localhost:3000"
  //   : `file://${join(__dirname, "../build/index.html")}`;
  // const startURL = isDev
  //   ? 'http://localhost:3000'
  //   : `file://${path.join(__dirname, 'build', 'index.html')}`;

  // // 读取 asset-manifest.json 文件
  // const manifestPath = path.join(__dirname, 'build', 'asset-manifest.json');
  // fs.readFile(manifestPath, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Error reading asset-manifest.json:', err);
  //     return;
  //   }
  //   const manifest = JSON.parse(data);
  //   console.log('Asset Manifest:', manifest);
  // });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'index.html')}`;

  // console.log(startURL);
  mainWindow.loadURL(startURL);

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
