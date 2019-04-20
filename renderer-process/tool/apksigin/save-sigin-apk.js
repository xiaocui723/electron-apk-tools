const { ipcRenderer } = require('electron')

const saveBtn = document.getElementById('save-sigin-apk')

saveBtn.addEventListener('click', (event) => {
  ipcRenderer.send('save-sigin-apk-dialog')
})

ipcRenderer.on('saved-sigin-apk-dir', (event, path) => {
  if (!path) path = 'No path'
  document.getElementById('save-sigin-apk-dir').innerHTML = `${path}`
})
