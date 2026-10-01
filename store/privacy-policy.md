# Privacy Policy — ChannelFlow — Token Tools

**Last updated:** 2026-01-01
**Effective:** immediately upon installation

## 1. Overview

ChannelFlow — Token Tools ("the Extension") is a local-only utility that lets you
view and copy **your own** Discord authorization token. This policy explains what
data the Extension handles and how.

The headline: **the Extension never transmits any data off your device.**

## 2. Data We Handle

| Item | Details |
|------|---------|
| Discord authorization token | Read passively from the `Authorization` header of your own Discord API traffic, only while you are logged into discord.com. |
| Extension preferences | None beyond the language toggle, which is not persisted. |

We do **not** handle: passwords, email addresses, chat content, browsing history,
cookies, payment information, or any data from websites other than Discord's API.

## 3. How Data Is Collected

The Extension observes outgoing requests to `https://discord.com/api/v9/*` via the
`webRequest` API and reads the `Authorization` header that Discord itself attaches
to those requests. This happens only when the Extension is installed and you are
using Discord.

## 4. How Data Is Stored

The captured token is written to `chrome.storage.local` — a storage area that
lives on **your device only**. It is not synced to any account and not accessible
to other extensions or websites.

## 5. Use of Data

The token is used for exactly one purpose: to be displayed (masked by default)
in the Extension popup and copied to your clipboard when you click Copy. No other
processing occurs.

## 6. Sharing & Transmission

**None.** The Extension contains no analytics, no tracking, no ads, no remote
code, and no code path that sends data over the network. The token never leaves
your device through this Extension.

## 7. Retention & Deletion

- Clicking **Clear** in the popup immediately deletes the token.
- Uninstalling the Extension removes all its local data.
- The Extension does not create backups or copies anywhere else.

## 8. Security

- Minimal permission set (see the extension listing).
- No remote scripts, no third-party dependencies.
- The token is masked in the UI by default.

## 9. Your Rights

You may view, copy, and delete your token at any time. Because all data is local,
there is no server-side copy to request deletion of.

## 10. Changes to This Policy

If this policy changes, the updated version will be published at this URL and the
"Last updated" date will change.

## 11. Contact

Email: `support@example.com` — replace with your contact address before publishing.
