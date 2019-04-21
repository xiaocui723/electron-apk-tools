# Electron APK Tools

这是一个从 Electron API Demos 修改而来的 APK 工具集桌面应用。



## 使用

工程是个 JS 项目，所以需要准备好 JS 的环境，还有安装 node。

当前只适配了 OS X 系统，功能只有 APK 签名。

APK 签名所需的命令行工具没有包含在工程中，需要自己下载，相关命令行工具放在工程根目录的 tools 目录。命令行工具列表：

- Android SDK build-tools 目录 25 API 等级及更高版本目录中的 apksigner 和 lib 目录中的 apksigner.jar。

运行：

```bash
npm install
npm start
```

构建 OS X app 应用：

```bash
npm run package:mac
```

app 签名（[具体问题](https://github.com/electron/electron/issues/7476)）：

```bash
codesign --deep --force --verbose --sign - ./out/Electron APK Tools-darwin-x64/Electron APK Tools.app
```

