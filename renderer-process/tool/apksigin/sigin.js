const { ipcRenderer } = require('electron')

const selectFileBtn = document.getElementById('exec-sigin')
const logTextarea = document.getElementById('keystore-sigin-log');

selectFileBtn.addEventListener('click', (event) => {
  if (logTextarea.firstChild != null) {
    logTextarea.firstChild.data = '';
  }
  ipcRenderer.send('exec-sigin', dataFormat())
})

ipcRenderer.on('execed-sigin', (event, data) => {
  if (logTextarea.firstChild == null) {
    logTextarea.innerText = data;
  } else {
    logTextarea.firstChild.appendData(data);
  }
  // document.getElementById('execed-sigin').innerHTML = `${path}`
})

function dataFormat() {
  var apkDirSpan = document.getElementById('selected-apk-dir');
  var keystoreDirSpan = document.getElementById('selected-keystore-dir');
  var saveDirSpan = document.getElementById('save-sigin-apk-dir');
  var aliasInput = document.getElementById('keystore-alias');
  var aliasPassInput = document.getElementById('keystore-alias-pass');
  var keyPassInput = document.getElementById('keystore-key-pass');

  var apkDir = apkDirSpan.innerText;
  var keystoreDir = keystoreDirSpan.innerText;
  var saveDir = saveDirSpan.innerText;
  var alias = aliasInput.value;
  var aliasPass = aliasPassInput.value;
  var keyPass = keyPassInput.value;

  var param = {
    'apkDir': apkDir,
    'keystoreDir': keystoreDir,
    'saveDir': saveDir,
    'alias': alias,
    'aliasPass': aliasPass,
    'keyPass': keyPass
  }
  return param;
}