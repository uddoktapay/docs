---
title: Balance Verification
---

# Balance Verification

Balance verification ensures SMS data is authentic by comparing expected balances with actual wallet balances.

## How it works

- When a transaction arrives, the system checks:
  - **Previous balance** (from last record)  
  - **Transaction amount**  
  - **New balance in SMS**  

Example:  
If your stored balance is **৳10**, and you receive a new payment of **৳20**, the SMS balance should show **৳30**.  
If it matches, the SMS is valid.

## Settings

- **Enable Balance Verification**  
  Verifies every SMS balance against expected calculations. Detects fake SMS automatically.

- **Enable Smart Verification**  
  AI-powered protection for busy merchants. Approves legitimate transactions even if SMS is delayed or missing (3–5 transactions). Helps prevent service disruption while still blocking fake SMS.

::: warning
If balance verification fails, the SMS data must be reviewed manually and approved before the user payment can proceed.
:::

## Updating balances

- Balances **auto-update** when money is received.  
- After a **cash-out** or **send money**, update the **Current Balance** manually to keep verification accurate.
