---
title: Notifications
---

# Notifications

Use **Notification Channels** to get alerts when important events happen (for example: **Payment Completed**, **Payment Pending**, or **Payment Transaction Not Found**).  
You can enable multiple channels and configure each one differently.

::: warning
Notifications run in the background via **queues** and require a **Cron Job**.  
See the [Cron Job](/system-settings/cron-job) section for setup instructions.
:::

---

## Overview

- Add as many channels as you need (Mail, Telegram, Slack, Discord, Webhook, Database).  
- Choose which **events** will trigger each channel.  
- Toggle a channel **Active** or **Inactive** at any time.  
- Channels are **brand-specific**.

Example setups:

- **Mail** → *Payment Completed* → **All admins**  
- **Mail** → *Payment Pending* → **Specific admin(s)**  
- **Telegram** → *Payment Completed* → **Ops group**  
- **Webhook (n8n/Make/Zapier)** → *Any event* → **Custom workflow**

---

## Create a notification channel

1. Click **New notification channel**.  
2. Fill **Channel Name** (e.g., “Slack – Sales”).  
3. Select a **Notification Provider** (Mail, Telegram, Slack, Discord, Webhook, Database).  
4. Turn **Active** on to start receiving alerts.  
5. Under **Event Configuration**, select **Notification Events** to monitor (e.g., *Payment Completed*, *Payment Pending*, *Payment Transaction Not Found*).   
6. Click **Create**.

> You can edit a channel later to change events or configuration.

---

## Providers & configuration

### Database
Saves notifications inside your dashboard.

- **Recipients**:
  - **All Admins**
  - **Select by Roles**
  - **Select Specific Admins**

### Mail
Sends emails to selected admins.

- **Recipients**:
  - **All Admins**
  - **Select by Roles**
  - **Select Specific Admins**
- Make sure your **Mail Settings** for the brand are correct.

### Telegram
Sends messages to a chat, group, or channel.

- **Bot Token** — from `@BotFather`  
- **Chat ID** — user/group/channel ID (use `@userinfobot` to find it).  
- For groups/channels, use **negative IDs** (e.g., `-1001234567890`).

### Slack
Posts messages to a Slack channel via Bot token.

- **Token** — Slack Bot User OAuth token (starts with `xoxb-`).  
- **Channel** — channel ID (e.g., `C0123456789` or `GXXXXXXXX`).  
- Ensure the app is invited to the channel.

### Discord
Sends messages to a Discord channel.

- **Webhook URL** — Paste the channel’s webhook URL.

### Webhook (e.g., n8n/Make/Zapier)
Sends the event payload to an HTTP endpoint.

- **Webhook URL** — Your automation or integration URL.
- Useful for custom workflows or forwarding to other systems.

::: tip
Need a custom provider (e.g., SMS gateway, internal tool)?  
See **Developer Guide** for creating your own channel.  
[Developer Guide →](/brand-settings/notifications/developer-guide)
:::

---

## Manage channels

- **Active toggle** — enable/disable without deleting.  
- **Edit** — change name, provider configuration, events, or activation.  
- **Delete** — remove the channel.  
- **Search & filter** — quickly find channels by name/provider.

You can enable **multiple channels** for the **same event**. For example, send *Payment Completed* to both **Mail** and **Telegram**.

---

## Events

Select one or more events per channel:

- **Payment Completed** — payment verified successfully.  
- **Payment Pending** — payment moved to pending review.  
- **Payment Transaction Not Found** — user-submitted transaction ID could not be matched.

> Additional events may be added in future updates.

---

## Best practices

- Use **separate channels** for different teams (Finance, Ops, Support).  
- For pending reviews, notify **specific admins** instead of everyone.  
- Keep **Mail Settings** and chat **tokens/webhooks** up to date.  
- If you have high volume, prefer **chat/webhook** for faster triage.  
- Test each channel after configuration (toggle Active, trigger a small test payment).

---

## Requirements

- **Cron Job** configured and running.  

See [Cron Job](/system-settings/cron-job) instructions to ensure notifications are processed reliably.
