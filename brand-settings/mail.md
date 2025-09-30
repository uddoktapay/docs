---
title: Mail Settings
---

# Mail Settings

Configure how your application sends outgoing emails, such as customer notifications and system alerts.

---

## Enable Email Sending
This is the **master switch** for all emails.  
- **On:** Emails will be sent using the configured driver.  
- **Off:** No emails will be sent, regardless of other settings.

---

## Mail Driver
Choose the service that will handle email delivery. Available options:  

- **SMTP** — Works with any standard email provider. Requires host, port, username, and password.  
- **Sendmail** — Uses the server’s built-in mail transport.  
- **Mailgun** — Requires API key, domain, and endpoint.  
- **Amazon SES** — Requires AWS credentials and region.  
- **Postmark** — Requires Postmark Server Token.  
- **Resend** — Requires Resend API key.  
- **MailerSend** — Requires MailerSend API key.  

Each driver has its own connection fields. Fill them exactly as provided by your mail service.

---

## From Details
- **From Address:** The email address shown as the sender.  
- **From Name:** The display name shown to recipients.  

Use a professional domain-based email (e.g. `no-reply@yourdomain.com`) to improve deliverability.

---

## Customer Email Notifications
Control which automatic emails go out to customers:  

- **Payment Completed** — Notify customer when a payment is successfully completed.  
- **Payment Pending** — Notify customer when a payment is created but still pending.  

Enable only the notifications you want your customers to receive.

---

## Test Connection
Use the **Test Connection** button to send a test email and verify that your configuration is working.  

You can set:
- **Test Email Address** — Where the test will be sent.  
- **Subject & Message** — Customize the test message.  

If the test fails, double-check your credentials, ports, and firewall settings.

---

::: tip
Start with **SMTP** if you are unsure. For production systems, services like **Amazon SES**, **Mailgun**, or **Postmark** are recommended for better deliverability.
:::

::: warning
Incorrect credentials or blocked ports (25, 465, 587, 2525) are common reasons for email delivery failures.
:::
