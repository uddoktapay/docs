---
title: SMS Data Overview
---

# SMS Data

SMS Data holds the transaction messages received from your connected devices.  
These records are used to verify user-submitted transaction IDs during checkout.

## How it works

- The **Paymently App** running on a device forwards SMS transaction messages to your server.  
- Each SMS is stored here as an **SMS Data record**.  
- Approved SMS Data can automatically verify a payment.  
- Admins can create SMS Data manually if the app fails to send a message.
- Automatic creation works for **parsable** messages.  
  If a message can’t be parsed, store it via **Create SMS Data**.

## Key features

- **List view** with search, filters, and status labels.  
- **Statuses:** All, Approved, Awaiting Review, Used, Trashed.  
- **Manual or Automatic creation.**  
