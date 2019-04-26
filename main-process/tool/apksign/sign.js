const { app, ipcMain } = require('electron')
const { spawn } = require('child_process');

ipcMain.on('exec-sign', (event, param) => {
  console.log(param);

  var toolsDir = app.getAppPath() + '/tools';
  var apksigner = toolsDir + '/apksigner';
  
  var args = [
    'sign',
    '-v',
    '--ks',
    `${param.keystoreDir}`,
    '--v1-signing-enabled',
    `${param.signTypeV1}`,
    '--v2-signing-enabled',
    `${param.signTypeV2}`,
    '--ks-key-alias',
    `${param.alias}`,
    '--ks-pass',
    `pass:${param.aliasPass}`,
    '--key-pass',
    `pass:${param.keyPass}`,
    '--out',
    `${param.saveDir}`,
    `${param.apkDir}`,
  ];
  console.log(args);
  var ret = spawn(apksigner, args);
  ret.stdout.on('data', function (data) {
    event.sender.send('execed-sign', data)
  });

  ret.stderr.on('data', function (data) {
    event.sender.send('execed-sign', data)
  });

  ret.on('close', function (code) {
    event.sender.send('execed-sign', 'child process exited with code ' + code)
  })
  // event.sender.send('execed-sign', '')
})