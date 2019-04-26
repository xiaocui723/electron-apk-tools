const { app, ipcMain, shell } = require("electron");
const { spawn } = require('child_process');

ipcMain.on('exec-sign', (event, param) => {
  console.log(param);
  zipalign(param, event);
  // event.sender.send('execed-sign', '')
})

function zipalign(param, event) {
  if (!param.signTypeV2) {
    return;
  }

  var toolsDir = app.getAppPath() + "/tools";
  var zipalign = toolsDir + "/zipalign";
  var apkDir = param.apkDir;
  var apkIndex = apkDir.indexOf(".apk");
  var zipApkDir = apkDir.slice(0, apkIndex) + "_zip" + apkDir.slice(apkIndex, apkDir.length);

  var args = ["4", `${param.apkDir}`, `${zipApkDir}`];

  var ret = spawn(zipalign, args);
  ret.stdout.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.stderr.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.on("close", function(code) {
    event.sender.send(
      "execed-sign",
      "child process zipalign exited with code " + code +
      "\n" +
      "\n=============================\n\n"
    );
    if (code == 0) {
      param.apkDir = zipApkDir;
      sign(param, event);
    }
  });
}

function sign(param, event) {
  var toolsDir = app.getAppPath() + "/tools";
  var apksigner = toolsDir + "/apksigner";

  var args = [
    "sign",
    "--ks",
    `${param.keystoreDir}`,
    "--v1-signing-enabled",
    `${param.signTypeV1}`,
    "--v2-signing-enabled",
    `${param.signTypeV2}`,
    "--ks-key-alias",
    `${param.alias}`,
    "--ks-pass",
    `pass:${param.aliasPass}`,
    "--key-pass",
    `pass:${param.keyPass}`,
    "--out",
    `${param.saveDir}`,
    `${param.apkDir}`
  ];
  console.log(args);
  var ret = spawn(apksigner, args);
  ret.stdout.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.stderr.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.on("close", function(code) {
    event.sender.send(
      "execed-sign",
      "child process sign exited with code " +
        code +
        "\n" +
        "\n=============================\n\n"
    );
    if (code == 0) {
      checkZipalign(param, event);
    }
  });
}

function checkZipalign(param, event) {
  var toolsDir = app.getAppPath() + "/tools";
  var zipalign = toolsDir + "/zipalign";
  var args = ["-c", "4", `${param.saveDir}`];

  var ret = spawn(zipalign, args);
  ret.stdout.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.stderr.on("data", function(data) {
    event.sender.send("execed-sign", data);
  });

  ret.on("close", function(code) {
    event.sender.send(
      "execed-sign",
      "child process checkZipalign exited with code " + code
    );
    shell.showItemInFolder(param.saveDir);
  });
}