// ChannelFlow — Token Tools · background service worker
// ---------------------------------------------------------------------------
// Purpose: passively observe Discord's own API traffic and keep the
// Authorization header (the logged-in user's token) in local storage.
//
// Privacy: this extension makes NO network requests of its own. The captured
// token is written to chrome.storage.local only and is never sent anywhere.

const DISCORD_API_PATTERN = "https://discord.com/api/v9/*";
const STORAGE_KEY = "channelflow.token";

/**
 * Discord tokens are compact strings that can pick up stray whitespace when
 * read from headers. Normalize and reject empty values.
 */
function normalizeToken(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Every time Discord's web client talks to its API it sends an
 * `Authorization` header. We intercept the request right before it leaves
 * the browser and snapshot that header.
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const header = details.requestHeaders.find(
      (h) => h.name.toLowerCase() === "authorization"
    );

    const token = header ? normalizeToken(header.value) : null;
    if (!token) return;

    chrome.storage.local.set({
      [STORAGE_KEY]: {
        token,
        capturedAt: Date.now(),
        source: "discord.com/api/v9 · Authorization header",
      },
    });
  },
  { urls: [DISCORD_API_PATTERN] },
  ["requestHeaders"]
);
