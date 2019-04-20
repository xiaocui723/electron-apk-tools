const { ipcMain, dialog } = require('electron')

ipcMain.on('open-keystore-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Keystore', extensions: ['keystore', 'jks'] }
    ]
  }, (files) => {
    if (files) {
      event.sender.send('selected-keystore-dir', files)
    }
  })
})