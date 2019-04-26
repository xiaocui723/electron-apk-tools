const {ipcRenderer} = require('electron')

const selectFileBtn = document.getElementById('select-apk')

selectFileBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-apk-file-dialog')
})

ipcRenderer.on('selected-apk-dir', (event, path) => {
  document.getElementById('selected-apk-dir').innerHTML = `${path}`
})