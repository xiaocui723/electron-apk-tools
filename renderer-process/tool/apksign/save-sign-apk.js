const { ipcRenderer } = require('electron')

const saveBtn = document.getElementById('save-sign-apk')

saveBtn.addEventListener('click', (event) => {
  ipcRenderer.send('save-sign-apk-dialog')
})

ipcRenderer.on('saved-sign-apk-dir', (event, path) => {
  if (!path) path = 'No path'
  document.getElementById('save-sign-apk-dir').innerHTML = `${path}`
})
