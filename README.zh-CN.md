# ChannelFlow — Token Tools

> 语言：[English](README.md) · [中文](README.zh-CN.md)

本地（local-only）Chrome MV3 扩展：查看并复制**你自己的** Discord 授权令牌。
数据绝不离开你的设备。

> 100% 本地、零外发、可一键清除的 Discord 令牌工具。

## 功能

- 从你自己的 API 流量中自动捕获 Discord 令牌（`discord.com/api/v9/*` 的 `Authorization` 请求头）
- 默认打码显示，支持显示 / 复制 / 刷新 / 清除
- 实时状态指示（Connected / Waiting）
- 中英双语界面
- 无网络外发、无 content script、无 cookies、无 `<all_urls>`

## 安装（开发者模式）

1. `git clone https://github.com/0xliangjiang/channelflow-tools.git`
2. 打开 `chrome://extensions` → 开启「开发者模式」
3. 点「加载已解压的扩展程序」→ 选中克隆下来的文件夹（含 `manifest.json` 的那一层）
4. 从工具栏拼图菜单固定 ChannelFlow，然后登录 discord.com

> Edge / Brave 同理：`edge://extensions` / `brave://extensions`

## 使用

1. 打开 https://discord.com 并登录
2. 点击工具栏的 ChannelFlow 图标
3. 状态变绿（Connected）后，点「Copy」复制你的令牌

## 仓库结构

```
manifest.json          MV3 清单
background.js          后台 service worker——webRequest 捕获 Authorization 头
popup.html / popup.css 原创弹窗 UI
popup.js               交互逻辑 + 中英双语
icons/                 图标 16/32/48/128
store/                 Chrome Web Store 上架材料
                       （文案、权限说明、隐私政策、1280×800 截图）
```

## 隐私

- 令牌仅存于 `chrome.storage.local`；点「Clear」或卸载即删除
- 无 `fetch` / `XMLHttpRequest` / `WebSocket`——零出站网络代码
- 完整政策见 `store/privacy-policy.md`，中文版见 https://0xliangjiang.github.io/channelflow-tools/index.zh-CN.html

## Chrome Web Store 上架

`store/` 内含完整上架材料（单一用途陈述、商店文案、权限说明、隐私政策、截图）。
注意：令牌提取工具属于商店「凭证收集」政策范畴，过审不保证；推荐开发者模式或企业策略分发。
