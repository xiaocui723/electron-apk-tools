const { ipcMain, dialog } = require('electron')

ipcMain.on('save-sigin-apk-dialog', (event) => {
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
  var day = (date.getDay() < 10 ? '0' + date.getDay() : date.getDay()).toString();
  var hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
  var minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
  var dateStr = year + month + day + hours + minutes;
  const options = {
    title: 'Save an Apk',
    defaultPath: `release-sigin-${dateStr}`,
    filters: [
      { name: 'Apk', extensions: ['apk'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('saved-sigin-apk-dir', filename)
  })
})
