const { app, ipcMain } = require('electron')
const { spawn } = require('child_process');

ipcMain.on('exec-sigin', (event, param) => {
  console.log(param);

  var toolsDir = app.getAppPath() + '/tools';
  var apksigner = toolsDir + '/apksigner';
  // var comdargs = [
  //   'sign',
  //   `--ks ${param.keystoreDir}`,
  //   `--ks-key-alias ${param.alias}`,
  //   `--ks-pass pass:${param.aliasPass}`,
  //   `--key-pass pass:${param.keyPass}`,
  //   `${param.apkDir}`,
  //     `--out ${param.saveDir}`
  // ]
  var ret = spawn(apksigner, [
    'sign',
    '--ks',
    `${param.keystoreDir}`,
    '--ks-key-alias',
    `${param.alias}`,
    '--ks-pass',
    `pass:${param.aliasPass}`,
    '--key-pass',
    `pass:${param.keyPass}`,
    '--out',
    `${param.saveDir}`,
    `${param.apkDir}`,
    ]);
  ret.stdout.on('data', function (data) {
    event.sender.send('execed-sigin', data)
  });

  ret.stderr.on('data', function (data) {
    event.sender.send('execed-sigin', data)
  });

  ret.on('close', function (code) {
    event.sender.send('execed-sigin', 'child process exited with code ' + code)
  })
  // event.sender.send('execed-sigin', '')
})