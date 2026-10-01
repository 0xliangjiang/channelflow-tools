# ChannelFlow — Token Tools · Chrome Web Store 上架文案

> 用途：CWS 开发者后台各字段的填写内容。逐项对齐「单一用途」政策。

---

## 1. 基本信息

| 字段 | 内容 |
|------|------|
| 扩展名称 | ChannelFlow — Token Tools |
| 版本 | 1.0.0 |
| 类别 | Developer Tools（开发者工具） |
| 语言 | English（界面内置中/英双语切换） |
| 图标 | 128×128（已生成，`icons/icon128.png`） |
| 截图 | `store/screenshot-1.png`（已连接态）、`store/screenshot-2.png`（待机态） |

---

## 2. Short Description（≤132 字符）

```
Local-only toolbox to view and copy your own Discord authorization token. Nothing leaves your device.
```

字符数约 103，合规。

---

## 3. Detailed Description（详细描述）

```
ChannelFlow — Token Tools is a local-only utility with a single purpose:
let you view and copy YOUR OWN Discord authorization token for self-service
account management, right from a clean popup.

WHY IT EXISTS
Discord's web app stores your login token in browser memory and sends it on
every API request. If you need that token yourself — for API scripting,
self-hosted bots, or troubleshooting your own account — there is no built-in
way to see it. ChannelFlow surfaces it safely.

HOW IT WORKS
When you are logged into discord.com, the extension passively observes the
Authorization header Discord sends with its own API calls and keeps a copy
on your device. It then shows the token masked by default, with reveal,
copy, refresh and clear controls.

SINGLE PURPOSE
The extension does exactly one thing: show and copy your own Discord token.
There is no messaging, no account sync, no analytics, no tracking, and no
network calls of any kind.

PRIVACY & SECURITY
• 100% local — the token is stored in chrome.storage.local on your device only
• Never transmitted — the code contains no code path that sends data anywhere
• Masked by default — the full token is hidden until you press reveal
• One-click Clear — removes the token immediately
• Minimal permissions — webRequest is scoped to discord.com/api/v9/* only

WHAT IT IS NOT
This extension does not steal credentials, does not read other websites,
does not access cookies, and does not collect or sell any data.

FEATURES
• Auto-capture of your Discord token from your own API traffic
• Masked display (reveal on demand)
• One-click copy to clipboard
• Refresh and Clear controls
• Live status indicator (Connected / Waiting)
• English & 简体中文 interface

Works with Chrome, Edge, Brave and other Chromium browsers via
"Load unpacked" or the Chrome Web Store.
```

---

## 4. Single Purpose 陈述（审核口径）

> ChannelFlow — Token Tools has one clearly-scoped purpose: to allow a user
> to view and copy **their own** Discord authorization token for legitimate
> self-service account management. Its description, features, and requested
> permissions all serve that single purpose and nothing else.

---

## 5. 语言 / 地区

- 默认语言：English (en)
- 额外支持：简体中文（zh_CN，弹窗内切换）
- 商店语言列表勾选：English, 中文（简体）

---

## 6. 隐私相关声明（Data Safety）

在 CWS「数据安全」部分如实勾选并填写：

| 声明项 | 勾选 |
|--------|------|
| Collects user data | ✅ 是（如实声明，不要选否） |
| Authentication information | ✅ 收集（用户自己的 Discord 授权令牌） |
| Data is encrypted in transit | ❌ 不适用（本扩展不传输任何数据） |
| Data is sold to third parties | ❌ 否 |
| Data used for unrelated purposes | ❌ 否 |
| Data is not transferred off device | ✅ 是（仅本地 chrome.storage） |

> 说明：如实声明「收集身份验证信息」+「不外传」，比隐瞒更易过审。
> 隐私政策 URL 必须填写，见 `store/privacy-policy.html`（可直接托管到
> GitHub Pages / 任意静态空间）。
