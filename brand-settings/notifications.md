---
title: Notification Channels
---

# Notification Channels

- [Introduction](#introduction)
- [Create Notification Channel](#create-notification-channel)
  - [Channel Details](#channel-details)
  - [Event Configuration](#event-configuration)
- [Edit Notification Channel](#edit-notification-channel)
  - [Provider Configuration](#provider-configuration)
- [Notification Providers](#notification-providers)
  - [Database](#database)
  - [Mail](#mail)
  - [Telegram](#telegram)
  - [Slack](#slack)
  - [Discord](#discord)
  - [Webhook](#webhook)
- [Available Events](#available-events)
- [Custom Providers](#custom-providers)
- [Best Practices](#best-practices)

## Introduction

Notification Channels send alerts when important events occur in your payment system. Configure multiple channels to notify different teams through their preferred communication methods.

Access Notification Channels from **Brand Settings → Notification Channels** to manage your alert configurations.

**Available providers:**
- Database (in-dashboard notifications)
- Mail (email notifications)
- Telegram (chat messages)
- Slack (workspace messages)
- Discord (channel messages)
- Webhook (custom integrations)

::: warning
Notifications run in the background via **queues** and require a **Cron Job**. See the [Cron Job](/system-settings/cron-job) section for setup instructions.
:::

## Create Notification Channel

Click **New notification channel** to create a new alert configuration.

### Channel Details

**Channel Name** (required)  
Descriptive identifier for this channel (e.g., "Mail to Super Admin", "Slack – Sales Team").

- Helps identify the channel's purpose
- Use team or recipient names for clarity

**Notification Provider** (required)  
Choose how notifications will be delivered.

- Database — In-dashboard notifications
- Mail — Email alerts
- Telegram — Telegram messages
- Slack — Slack channel messages
- Discord — Discord channel messages
- Webhook — HTTP POST to external URL

**Active** (toggle)  
Enable or disable notifications for this channel.

- Toggle on to activate
- Toggle off to pause without deleting
- Can be changed anytime after creation

### Event Configuration

**Notification Events** (required)  
Select which events trigger this channel.

Available events:
- **Payment Completed** — Payment verified successfully
- **Payment Pending** — Payment moved to pending review
- **Payment Transaction Not Found** — Submitted transaction ID couldn't be matched

Multiple events can be selected for one channel.

::: tip
You can create multiple channels for the same event. For example, send "Payment Completed" to both Mail and Telegram for different teams.
:::

## Edit Notification Channel

Click **Edit** from the actions menu to modify an existing channel.

The edit page shows three sections:

### Channel Details

Modify the channel name and active status.

**Channel Name**  
Update the descriptive name.

**Active**  
Toggle to enable/disable the channel.

### Event Configuration

Change which events trigger this channel.

**Notification Events**  
Add or remove events from the selected list.

### Provider Configuration

**This section appears only after creation** and contains provider-specific settings.

The configuration fields depend on the selected provider. See [Notification Providers](#notification-providers) below for details on each provider's settings.

## Notification Providers

Each provider has specific configuration requirements shown in the **Configuration** section of the edit page.

### Database

Saves notifications in the dashboard for admin viewing.

**Notification Recipients** (required dropdown)  
Choose who receives notifications:

- **All Admins** — Every admin user
- **Select by Roles** — Specific admin roles
- **Select Specific Admins** — Individual admin users

No additional configuration required.

### Mail

Sends email notifications to selected admins.

**Notification Recipients** (required dropdown)  
Choose who receives notifications:

- **All Admins** — Every admin user
- **Select by Roles** — Specific admin roles
- **Select Specific Admins** — Individual admin users

**Requirements:**
- Mail Settings must be configured in Brand Settings
- Enable Email Sending must be toggled on
- Mail driver must be properly configured and tested

::: warning
If Mail Settings are disabled or misconfigured, email notifications will fail silently. Always test your mail configuration before relying on email alerts.
:::

### Telegram

Sends messages to a Telegram chat, group, or channel.

**Bot Token** (required)  
Telegram bot token from BotFather.

- Get from [@BotFather](https://t.me/BotFather)
- Format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
- Each bot has unique token

**Chat ID** (required)  
Recipient chat, group, or channel ID.

- User chat: Positive number (e.g., `123456789`)
- Group/Channel: Negative number (e.g., `-1001234567890`)
- Use [@userinfobot](https://t.me/userinfobot) to find your ID
- For groups, add bot as member first

::: tip
To get a group Chat ID:
1. Add your bot to the group
2. Send a message in the group
3. Visit `https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates`
4. Look for the chat ID in the response
:::

### Slack

Posts messages to a Slack channel.

**Token** (required)  
Slack Bot User OAuth token.

- Starts with `xoxb-`
- Get from Slack App settings → OAuth & Permissions
- Requires `chat:write` scope

**Channel** (required)  
Slack channel ID.

- Format: `C0123456789` or `GXXXXXXXX`
- Right-click channel → View channel details → Copy ID
- Bot must be invited to the channel

::: tip
After creating your Slack app:
1. Install app to workspace
2. Copy the Bot User OAuth Token
3. Invite bot to the channel: `/invite @YourBotName`
:::

### Discord

Sends messages to a Discord channel.

**Webhook URL** (required)  
Discord webhook URL for the target channel.

- Get from Channel Settings → Integrations → Webhooks
- Format: `https://discord.com/api/webhooks/...`
- Each webhook targets one channel

::: tip
To create a Discord webhook:
1. Go to Channel Settings → Integrations
2. Click "Create Webhook"
3. Copy the Webhook URL
4. Paste into this field
:::

### Webhook

Sends event data to an HTTP endpoint for custom integrations.

**Webhook URL** (required)  
HTTP endpoint receiving the notification payload.

- Accepts HTTP POST requests
- Receives JSON payload with event data
- Compatible with automation tools (n8n, Make, Zapier)

**Payload structure:**
```json
{
  "event": "payment.completed",
  "data": {
    "payment_id": "...",
    "amount": "...",
    "customer": "...",
    // Additional payment details
  }
}
```

::: tip
Use webhooks to integrate with:
- n8n workflows
- Make (Integromat) scenarios
- Zapier zaps
- Custom applications
- Internal monitoring systems
:::

## Available Events

Select one or more events per channel:

**Payment Completed**  
Triggered when payment is verified successfully.

- Customer paid and verification passed
- Payment moved to Completed status
- Ideal for finance team notifications

**Payment Pending**  
Triggered when payment moves to pending review.

- Customer submitted TrxID but auto-verification failed
- Payment requires manual approval
- Useful for operations team alerts

**Payment Transaction Not Found**  
Triggered when submitted transaction ID couldn't be matched.

- Customer entered invalid TrxID
- SMS Data doesn't contain matching transaction
- Helps identify potential issues or fraud

::: tip
Additional events may be added in future updates. Check back after system updates to see new notification options.
:::

## Best Practices

**Channel organization:**
- Use separate channels for different teams (Finance, Operations, Support)
- Name channels clearly with team or purpose
- Keep critical channels active, disable testing channels

**Event selection:**
- Payment Completed → Finance team (for accounting)
- Payment Pending → Operations team (for manual review)
- Transaction Not Found → Support team (for customer assistance)

**Provider selection:**
- Database → For admin dashboard visibility
- Mail → For detailed, actionable alerts
- Telegram/Slack/Discord → For quick team notifications
- Webhook → For automation and custom workflows

**Configuration:**
- Test each channel after creation
- Keep API tokens and webhooks secure
- Update Mail Settings before enabling email channels
- Use specific admin selection instead of "All Admins" for pending reviews

**Monitoring:**
- Trigger test payments to verify channels work
- Check notification delivery regularly
- Monitor queue processing with cron job
- Review and update recipient lists quarterly

::: warning
**Requirements:**
- **Cron Job** must be configured and running
- Notifications process via background queues
- See [Cron Job](/system-settings/cron-job) for setup instructions
:::

## Custom Providers

Need a custom notification provider for your specific use case?

::: tip
**For Developers:**  
Create custom notification channels for SMS gateways, internal tools, or any service with an API.

See the [Developer Guide](/developers/notification-channels) for implementation details, including:
- Creating custom notification drivers
- Registering providers
- Handling notification events
- Testing custom channels
:::