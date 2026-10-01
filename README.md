# ChannelFlow — Token Tools

> Language: [English](README.md) · [中文](README.zh-CN.md)

Local-only Chrome (MV3) extension: view and copy **your own** Discord
authorization token. Nothing leaves your device.

> 100% 本地、零外发、可一键清除的 Discord 令牌工具。

## Features

- Auto-captures your Discord token from your own API traffic (the `Authorization` header on `discord.com/api/v9/*`)
- Masked by default — reveal / copy / refresh / clear controls
- Live status indicator (Connected / Waiting)
- English / 简体中文 interface
- No network calls, no content scripts, no cookies, no `<all_urls>`

## Install (developer mode)

1. `git clone https://github.com/0xliangjiang/channelflow-tools.git`
2. Open `chrome://extensions` → enable **Developer mode**
3. Click **Load unpacked** → select the cloned folder (this one, the directory containing `manifest.json`)
4. Pin **ChannelFlow** from the toolbar puzzle menu, then log in to discord.com

> Edge / Brave: same steps at `edge://extensions` / `brave://extensions`.

## Usage

1. Open https://discord.com and log in
2. Click the ChannelFlow toolbar icon
3. The status turns green (**Connected**) — click **Copy** to grab your token

## Repo layout

```
manifest.json          MV3 manifest
background.js          service worker — webRequest captures the Authorization header
popup.html / popup.css original popup UI
popup.js               popup logic + EN/中文 i18n
icons/                 icons 16/32/48/128
store/                 Chrome Web Store submission materials
                       (listing, permission justification, privacy policy,
                        1280×800 screenshots)
```

## Privacy

- The token is stored in `chrome.storage.local` only; **Clear** or uninstall deletes it
- No `fetch` / `XMLHttpRequest` / `WebSocket` — zero outbound network code
- See `store/privacy-policy.md` for the full policy

## Chrome Web Store submission

See `store/` for the full submission kit (single-purpose statement, listing copy,
permission justification, privacy policy, screenshots). Note: token-extraction
tools fall under the store's credential-harvesting policy, so store approval is
not guaranteed — developer-mode and enterprise policy install are the
recommended distribution paths.
