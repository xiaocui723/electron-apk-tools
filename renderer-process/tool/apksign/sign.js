const { ipcRenderer } = require('electron')

const selectFileBtn = document.getElementById('exec-sign')
const logTextarea = document.getElementById('keystore-sign-log');

selectFileBtn.addEventListener('click', (event) => {
  if (logTextarea.firstChild != null) {
    logTextarea.firstChild.data = '';
  }
  ipcRenderer.send('exec-sign', dataFormat())
})

ipcRenderer.on('execed-sign', (event, data) => {
  if (logTextarea.firstChild == null) {
    logTextarea.innerText = data;
  } else {
    logTextarea.firstChild.appendData(data);
  }
  // document.getElementById('execed-sign').innerHTML = `${path}`
})

function dataFormat() {
  var apkDirSpan = document.getElementById('selected-apk-dir');
  var keystoreDirSpan = document.getElementById('selected-keystore-dir');
  var saveDirSpan = document.getElementById('save-sign-apk-dir');
  var signTypeV1Check = document.getElementById('signtypev1');
  var signTypeV2Check = document.getElementById('signtypev2');
  var aliasInput = document.getElementById('keystore-alias');
  var aliasPassInput = document.getElementById('keystore-alias-pass');
  var keyPassInput = document.getElementById('keystore-key-pass');

  var apkDir = apkDirSpan.innerText;
  var keystoreDir = keystoreDirSpan.innerText;
  var saveDir = saveDirSpan.innerText;
  var signTypeV1 = signTypeV1Check.checked;
  var signTypeV2 = signTypeV2Check.checked;
  var alias = aliasInput.value;
  var aliasPass = aliasPassInput.value;
  var keyPass = keyPassInput.value;

  var param = {
    'apkDir': apkDir,
    'keystoreDir': keystoreDir,
    'saveDir': saveDir,
    'signTypeV1': signTypeV1,
    'signTypeV2': signTypeV2,
    'alias': alias,
    'aliasPass': aliasPass,
    'keyPass': keyPass
  }
  return param;
}