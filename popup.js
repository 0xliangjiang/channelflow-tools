// ChannelFlow — Token Tools · popup logic
// ---------------------------------------------------------------------------
// Reads the token captured by background.js from local storage, renders it in
// a masked view, and offers reveal / copy / refresh / clear. No network I/O.

"use strict";

const STORAGE_KEY = "channelflow.token";
const POLL_INTERVAL_MS = 800;
const POLL_TIMEOUT_MS = 15000;

const I18N = {
  en: {
    subtitle: "Token Tools",
    statusListening: "Listening",
    statusWaiting: "Waiting for Discord",
    statusConnected: "Connected",
    statusHint: "auto-captures your token",
    tokenLabel: "Authorization Token",
    sourceBadge: "API header",
    length: "Length",
    captured: "Captured",
    copy: "Copy",
    copied: "Copied",
    refresh: "Refresh",
    clear: "Clear",
    reveal: "Reveal",
    hide: "Hide",
    rowState: "State",
    rowSource: "Source",
    rowStorage: "Storage",
    rowStorageValue: "Local only",
    footer: "Local only — your token never leaves this device",
    placeholder: "No token yet — open Discord and log in",
    stateIdle: "Idle",
    stateActive: "Active",
    toastCopied: "Token copied to clipboard",
    toastNoToken: "Nothing to copy yet",
    toastCleared: "Token cleared",
    toastNotOnDiscord: "Open discord.com first, then try again",
    toastWaiting: "Waiting for Discord traffic…",
    toastCopiedFail: "Copy failed — select and copy manually",
  },
  zh: {
    subtitle: "令牌工具",
    statusListening: "监听中",
    statusWaiting: "等待 Discord",
    statusConnected: "已连接",
    statusHint: "自动捕获你的令牌",
    tokenLabel: "授权令牌",
    sourceBadge: "API 请求头",
    length: "长度",
    captured: "捕获时间",
    copy: "复制",
    copied: "已复制",
    refresh: "刷新",
    clear: "清除",
    reveal: "显示",
    hide: "隐藏",
    rowState: "状态",
    rowSource: "来源",
    rowStorage: "存储",
    rowStorageValue: "仅本地",
    footer: "仅本地存储 — 你的令牌不会离开此设备",
    placeholder: "尚未捕获令牌 — 请打开 Discord 并登录",
    stateIdle: "空闲",
    stateActive: "活跃",
    toastCopied: "令牌已复制到剪贴板",
    toastNoToken: "暂无令牌可复制",
    toastCleared: "令牌已清除",
    toastNotOnDiscord: "请先打开 discord.com 再试",
    toastWaiting: "等待 Discord 流量…",
    toastCopiedFail: "复制失败 — 请手动选中复制",
  },
};

let lang = "en";
let record = null;      // { token, capturedAt, source }
let revealed = false;
let pollTimer = null;

// ---------- DOM ----------
const $ = (id) => document.getElementById(id);
const el = {
  langBtn: $("langBtn"),
  statusPill: $("statusPill"),
  statusText: $("statusText"),
  statusHint: $("statusHint"),
  tokenValue: $("tokenValue"),
  tokenLength: $("tokenLength"),
  capturedAt: $("capturedAt"),
  revealBtn: $("revealBtn"),
  copyBtn: $("copyBtn"),
  refreshBtn: $("refreshBtn"),
  clearBtn: $("clearBtn"),
  rowState: $("rowState"),
  rowSource: $("rowSource"),
  toast: $("toast"),
};

// ---------- Helpers ----------
function t(key) {
  return I18N[lang][key] || I18N.en[key] || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.getAttribute("data-i18n"));
  });
  el.langBtn.textContent = lang === "en" ? "中" : "EN";
  el.revealBtn.title = revealed ? t("hide") : t("reveal");
  el.revealBtn.textContent = revealed ? "🙈" : "👁";
}

function formatTime(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function maskToken(token) {
  if (!token) return "";
  if (token.length <= 12) {
    return token.slice(0, 4) + "••••" + token.slice(-4);
  }
  return token.slice(0, 6) + "••••••••••••" + token.slice(-6);
}

let toastTimer = null;
function showToast(message, type = "") {
  clearTimeout(toastTimer);
  el.toast.textContent = message;
  el.toast.className = "toast show " + type;
  toastTimer = setTimeout(() => {
    el.toast.className = "toast";
  }, 2600);
}

// ---------- Rendering ----------
function render() {
  const hasToken = Boolean(record && record.token);

  // Status pill
  if (hasToken) {
    el.statusPill.className = "status-pill live";
    el.statusText.textContent = t("statusConnected");
  } else {
    el.statusPill.className = "status-pill waiting";
    el.statusText.textContent = t("statusWaiting");
  }

  // Token box
  if (!hasToken) {
    el.tokenValue.textContent = t("placeholder");
    el.tokenValue.className = "token-value placeholder";
    el.tokenLength.textContent = "—";
    el.capturedAt.textContent = "—";
    el.rowState.textContent = t("stateIdle");
    el.rowSource.textContent = "—";
  } else {
    el.tokenValue.className = "token-value" + (revealed ? "" : " masked");
    el.tokenValue.textContent = revealed
      ? record.token
      : maskToken(record.token);
    el.tokenLength.textContent = record.token.length;
    el.capturedAt.textContent = formatTime(record.capturedAt);
    el.rowState.textContent = t("stateActive");
    el.rowSource.textContent = record.source || "—";
  }

  el.copyBtn.disabled = !hasToken;
  el.clearBtn.disabled = !hasToken;
  el.revealBtn.disabled = !hasToken;
  applyI18n();
}

// ---------- Storage ----------
function loadRecord(callback) {
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    record = result[STORAGE_KEY] || null;
    revealed = false;
    if (callback) callback();
    render();
  });
}

function clearRecord() {
  chrome.storage.local.remove(STORAGE_KEY, () => {
    record = null;
    revealed = false;
    stopPolling();
    render();
    showToast(t("toastCleared"), "success");
  });
}

// ---------- Polling ----------
function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function startPolling() {
  if (pollTimer) return;
  const startedAt = Date.now();

  pollTimer = setInterval(() => {
    if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
      stopPolling();
      render();
      return;
    }

    chrome.storage.local.get(STORAGE_KEY, (result) => {
      if (result[STORAGE_KEY]) {
        record = result[STORAGE_KEY];
        revealed = false;
        stopPolling();
        render();
      }
    });
  }, POLL_INTERVAL_MS);
}

// ---------- Actions ----------
function isOnDiscord(tab) {
  return Boolean(tab && tab.url && tab.url.includes("discord.com"));
}

el.langBtn.addEventListener("click", () => {
  lang = lang === "en" ? "zh" : "en";
  applyI18n();
  render();
});

el.revealBtn.addEventListener("click", () => {
  revealed = !revealed;
  render();
});

el.copyBtn.addEventListener("click", () => {
  if (!record || !record.token) {
    showToast(t("toastNoToken"), "error");
    return;
  }
  navigator.clipboard
    .writeText(record.token)
    .then(() => {
      el.copyBtn.textContent = t("copied");
      showToast(t("toastCopied"), "success");
      setTimeout(() => {
        applyI18n();
        el.copyBtn.textContent = t("copy");
      }, 1500);
    })
    .catch(() => showToast(t("toastCopiedFail"), "error"));
});

el.refreshBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!isOnDiscord(tab)) {
      showToast(t("toastNotOnDiscord"), "error");
      return;
    }

    if (record) {
      loadRecord();
      showToast(t("toastCopied"), "success");
      return;
    }

    showToast(t("toastWaiting"));
    startPolling();
  });
});

el.clearBtn.addEventListener("click", clearRecord);

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  loadRecord();

  // If no token yet and the active tab is Discord, quietly poll for a bit.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!record && isOnDiscord(tabs[0])) {
      startPolling();
    }
  });
});
