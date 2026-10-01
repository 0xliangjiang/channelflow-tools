# ChannelFlow — Token Tools · 权限说明（Permission Justification）

> 用途：CWS 审核后台「Permissions justification」逐条填写。每个权限都服务于
> 同一个单一用途：查看并复制用户自己的 Discord 授权令牌。

---

## 权限总览

| 权限 | 用途 | 是否最小化 |
|------|------|-----------|
| `webRequest` | 读取 Discord 自己发出的 API 请求头 | ✅ 仅观察，不拦截/不改写 |
| `host_permissions: https://discord.com/api/v9/*` | 把观察范围限定在 Discord 的 API 端点 | ✅ 不含 `<all_urls>` |
| `storage` | 把捕获到的令牌保存在设备本地 | ✅ 仅 `chrome.storage.local` |
| `activeTab` | 判断当前标签页是否在 discord.com | ✅ 无持久站点访问权 |

---

## 逐条解释

### 1. webRequest
- **为什么需要**：Discord 的用户令牌只存在于「页面发出的 HTTP 请求的
  `Authorization` 头」里，扩展无法通过页面 DOM 或 localStorage 合法读取。
  只有 `webRequest.onBeforeSendHeaders`（观察型、非阻塞）能拿到这个头。
- **如何使用**：仅读取请求头，**不拦截、不修改、不重定向**任何请求。
- **范围**：监听 URL 严格限定为 `https://discord.com/api/v9/*`。

### 2. host_permissions（https://discord.com/api/v9/*）
- **为什么需要**：`webRequest` 观察请求头要求对应站点的 host 权限；该模式
  只覆盖 Discord 的 API 子域，不涉及其他任何网站。
- **不使用** `<all_urls>`、不使用 cookies 权限。

### 3. storage
- **为什么需要**：background 捕获令牌后需要把它交到 popup 展示；这是同一
  设备内的进程间传递，必须借助 `chrome.storage.local`。
- **存储位置**：仅本地。扩展卸载时该数据被浏览器自动清除；弹窗内提供
  「Clear」按钮随时手动清除。

### 4. activeTab
- **为什么需要**：popup 打开时判断「当前标签页是否在 discord.com」，以决定
  是否轮询等待捕获令牌。
- **授予范围**：只在用户主动点击扩展图标时对当前标签页生效，无任何常驻
  访问权限。

---

## 明确不使用的能力（审核加分项）

- ❌ 不使用 `<all_urls>` / `cookies` / `debugger` / `tabs`（读全部标签）
- ❌ 无 content scripts（不注入任何网页）
- ❌ 无远程代码、无 analytics、无第三方脚本
- ❌ 无任何 `fetch` / `XMLHttpRequest` / `WebSocket` 出站调用
  （`grep -rE "fetch|XMLHttpRequest|WebSocket"` 结果为空）

---

## 一句话总结（可直接粘贴）

> All four permissions serve one purpose: passively read the Authorization
> header of the user's own Discord API traffic (scoped to
> discord.com/api/v9/*), store it on-device, and display it in the popup.
> The extension makes no network requests, uses no cookies, injects no
> content scripts, and grants no access to any site other than Discord's API.
