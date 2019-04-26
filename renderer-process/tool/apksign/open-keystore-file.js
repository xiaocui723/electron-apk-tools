const { ipcRenderer } = require('electron')

const selectFileBtn = document.getElementById('select-keystore')

selectFileBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-keystore-file-dialog')
})

ipcRenderer.on('selected-keystore-dir', (event, path) => {
  document.getElementById('selected-keystore-dir').innerHTML = `${path}`
})