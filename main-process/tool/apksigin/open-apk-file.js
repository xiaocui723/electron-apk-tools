const {ipcMain, dialog} = require('electron')

ipcMain.on('open-apk-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Apk', extensions: ['apk']}
    ]
  }, (files) => {
    if (files) {
      event.sender.send('selected-apk-dir', files)
    }
  })
})