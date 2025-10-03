---
title: Devices
---

# Devices

- [Introduction](#introduction)
- [Why devices matter](#why-devices-matter)
- [How devices affect non-API gateways](#how-devices-affect-non-api-gateways)
- [Devices List View](#devices-list-view)
  - [Table columns](#table-columns)
  - [Available actions](#available-actions)
- [Connect Android App](#connect-android-app)
  - [Download Android App](#download-android-app)
  - [Connect Your Device](#connect-your-device)
  - [Mobile app login](#mobile-app-login)
- [Balance Verification](#balance-verification)
  - [How it works](#how-it-works)
  - [Create Balance Verification](#create-balance-verification)
  - [Verification settings](#verification-settings)
  - [Manage Balance Verifications](#manage-balance-verifications)
- [Device Best Practices](#device-best-practices)

## Introduction

Devices are Android phones running the **Paymently Payment Automation App**. They forward SMS transaction messages from your mobile financial services (MFS) accounts (e.g., bKash, Nagad, Rocket) to your server for automatic payment verification.

Access the Devices module from the sidebar under **MFS Automation** to view connected devices, manage balance verification, and connect new devices.

## Why devices matter

Connected devices are essential for automatic payment verification:

- **Collect SMS data automatically** — No manual entry required for most transactions
- **Keep payment verification seamless** — Customers get instant confirmation
- **Enable balance and smart verification** — Detect fraudulent SMS automatically
- **Allow multiple wallets** — Run different MFS accounts across multiple devices
- **Reduce manual workload** — Eliminate the need to manually check every transaction

Each connected device displays:

- **Device ID** — Unique identifier (e.g., TestID)
- **Device name** — Friendly name (e.g., Samsung)
- **Device model** — Phone model (e.g., A54)
- **Android Version** — OS version (e.g., 15)
- **App Version** — Paymently app version (e.g., 1.0.3)
- **Status** — Connection status (CONNECTED badge)

## How devices affect non-API gateways

For Personal, Agent, and Merchant (non-API) gateways, customers send money directly to your MFS account and then submit their transaction ID during checkout.

### When a device is connected

- The Paymently app reads SMS messages from the device
- SMS data is automatically sent to your server
- System verifies the customer's transaction ID against SMS Data
- Payment is automatically marked as **Completed** if match found

### When no device is connected

The verification process depends on your gateway's Pending Payment setting:

**Pending Payment disabled:**
- Customer sees error: *"Transaction not found, please try again later."*
- No payment record is created
- Admin can manually add SMS data later
- Customer can then retry verification with the same transaction ID

**Pending Payment enabled:**
- Payment is created with **Pending** status
- Customer is redirected to Pending page (no error shown)
- Admin can approve manually after verifying the transaction

::: tip
Always connect at least one device for smooth, automatic payment verification. Enable Pending Payment as a fallback for when devices go offline temporarily.
:::

## Devices List View

The devices list displays all connected Android devices with their current status and details.

### Table columns

- **Device ID** — Unique identifier for the device
- **Device name** — Friendly name assigned to the device
- **Device model** — Phone model number
- **Android Version** — Operating system version
- **App Version** — Paymently app version installed
- **Status** — Connection status (CONNECTED badge in blue)

### Available actions

For each connected device:

- **Balance Verification** (blue shield icon with checkmark) — Manage balance verification settings for this device
- **Delete** (red trash icon) — Remove the device from your account

::: warning
Deleting a device will stop automatic SMS forwarding. All payments requiring verification through that device will fail until you reconnect it or enable Pending Payment.
:::


## Connect Android App

Click **Connect Android App** (button with WiFi icon, top right) to link a new Android device.

A modal appears with two sections: **Download Android App** and **Connect Android App**.

### Step 1: Download the App

Click **Download Android App** (blue button) to download the Paymently app to your Android phone.

**What the app does:**
- Reads SMS from your bKash/Nagad/Rocket SIM card
- Automatically sends transaction data to your dashboard
- Enables instant payment verification
- Shows verified transactions in SMS Data section

::: tip
Install the app before moving to Step 2. Make sure you grant all SMS permissions when the app asks.
:::

### Step 2: Connect Your Device

**Two ways to connect:**

#### Option A: Quick Connect with QR Code (Recommended)

This is the fastest method:

1. Open the Paymently app on your phone
2. Tap **"Or log in with QR code"** at the bottom
3. Point your camera at the QR code shown in the dashboard modal
4. Done! Your device connects automatically

#### Option B: Manual Login

If QR code doesn't work:

1. Open the Paymently app
2. Enter your **Base URL** (e.g., https://yoursite.paymently.io)
3. Enter your admin **Email**
4. Enter your admin **Password**
5. Tap **Login**

::: warning
**Important:** The phone must have the MFS SIM card (bKash/Nagad/Rocket) inserted. The app reads SMS directly from that SIM.
:::

### What Happens After Connection

Once connected, you'll see your device in the Devices list showing:
- Device name (e.g., Samsung)
- Status badge: **CONNECTED** (blue)
- All device details (model, Android version, app version)

The app now automatically:
- ✓ Reads incoming transaction SMS
- ✓ Sends data to your dashboard
- ✓ Verifies customer payments instantly

### Troubleshooting Connection

**QR code not scanning?**
- Ensure good lighting
- Hold phone steady
- Try manual login instead

**App closes automatically?**
- Go to phone Settings → Apps → Paymently
- Disable battery optimization
- Allow background activity

**SMS not being read?**
- Grant all SMS permissions
- Ensure correct SIM is inserted
- Check that SIM is active

::: tip
**Best practice:** After connecting, make a small test transaction to verify everything works. Check if the SMS appears in your SMS Data section within a few seconds.
:::


## Balance Verification

Balance Verification ensures SMS data is authentic by comparing expected account balances with actual balances reported in transaction SMS messages.

### How it works

When a transaction SMS arrives, the system performs these checks:

1. **Previous balance** — Retrieved from the last SMS Data record
2. **Transaction amount** — Amount from current SMS
3. **New balance** — Balance reported in current SMS
4. **Calculation** — Previous balance + transaction amount = expected new balance
5. **Comparison** — Expected balance vs. actual SMS balance

**Example:**
- Stored balance: BDT 100.00
- New payment received: BDT 10.00
- Expected new balance: BDT 110.00
- SMS reports balance: BDT 110.00
- ✓ Verification passes — SMS is authentic

If the balance doesn't match, the SMS Data is marked with a "Balance verify mismatch" warning and requires manual review.

### Create Balance Verification

Click **Balance Verification** from the device actions, or click **New balance verification** on the Balance Verification page.

**Device & Account Information section:**

| Field | Description | Required |
|-------|-------------|----------|
| **Payment Method** | MFS provider (dropdown: bKash, Rocket, Nagad, etc.) | Yes |
| **Payment Type** | Account type (dropdown: Personal, Merchant, Agent) | Yes |
| **Current Balance** | Your actual MFS wallet balance (with currency prefix BDT) | Yes |

**Payment Method & Type combination:**
Only unique device-method-type combinations are allowed. You cannot create duplicate balance verification entries for the same device, payment method, and payment type.

**Current Balance field:**
- Displays with currency prefix (e.g., BDT)
- Help text: "Your actual MFS wallet balance. Auto-updates when money is received. Update manually after cash-out or send money."
- This is the starting point for balance verification calculations

### Verification Settings

Two verification options are available:

**Enable Balance Verification** (toggle)
- Verifies every incoming SMS balance against expected calculations
- Automatically detects fake or fraudulent SMS
- Compares SMS balance with calculated balance (previous balance + transaction amount)
- Flags mismatches for manual review

Description: *"Verify incoming SMS against your account balance. Automatically detects fake SMS by comparing the balance shown in SMS with expected calculations."*

**Enable Smart Verification** (toggle)
- AI-powered protection for busy merchants
- Automatically approves legitimate transactions even when SMS is delayed or missing
- Handles 3-5 transactions intelligently
- Keeps your business running while blocking fake SMS
- Reduces manual intervention during peak times

Description: *"AI-powered protection for busy merchants. Automatically approves legitimate transactions even when SMS is delayed or missing (3-5 transactions). Keeps your business running while blocking fake SMS."*

::: tip
**Recommended setup:**
- Enable **Balance Verification** for all devices to detect fraudulent SMS
- Enable **Smart Verification** if you process many transactions to handle temporary SMS delays
- Start with just Balance Verification if you're new to the system
:::

### Manage Balance Verifications

The Balance Verifications page displays all configured verification settings.

**Table columns:**
- **Payment Method** — MFS provider badge (e.g., BKASH in blue)
- **Payment Type** — Account type badge (e.g., PERSONAL in blue)
- **Current Balance** — Account balance (e.g., 100.00)
- **Balance Verification** — Toggle to enable/disable balance verification
- **Smart Verification** — Toggle to enable/disable smart verification

**Available actions:**
- **Edit** — Modify verification settings
- **Delete** — Remove balance verification configuration

**Inline toggles:**
You can enable/disable Balance Verification and Smart Verification directly from the list without opening the edit form.

::: tip
Toggle Balance Verification off temporarily during cash-outs to avoid false mismatch warnings, then update the Current Balance and toggle it back on.
:::

### Updating balances

**Automatic updates:**
- Balances auto-update when money is **received** (incoming payments)
- System calculates new balance based on SMS transaction amount

**Manual updates required:**
- After **cash-out** transactions
- After **send money** operations
- When you withdraw from the MFS account
- Any transaction that decreases your balance

**To update manually:**
1. Click **Edit** on the balance verification entry
2. Update the **Current Balance** field to match your actual wallet balance
3. Click **Save changes**

::: warning
If balance verification fails repeatedly, check:
- Is the Current Balance accurate?
- Did you cash out recently without updating the balance?
- Are multiple devices using the same SIM card?
- Is the SMS format supported for automatic parsing?
:::

## Device Best Practices

Follow these practices for reliable device management:

- **Keep devices online 24/7**  
  Devices should always be powered on with stable internet connection.

- **Disable battery optimization**  
  Prevent Android from closing the Paymently app in the background.

- **Use dedicated devices**  
  Don't use the same phone for personal use. Keep it dedicated to payment processing.

- **One SIM per device**  
  Each MFS SIM card should be in only one device running the Paymently app.

- **Connect multiple devices for redundancy**  
  Use backup devices for critical MFS accounts in case primary device fails.

- **Configure balance verification immediately**  
  Set up balance verification as soon as you connect a device.

- **Update balances after cash-outs**  
  Always update Current Balance manually when you withdraw money.

- **Enable Smart Verification for high volume**  
  If you process many transactions daily, enable Smart Verification to handle SMS delays.

- **Monitor connection status regularly**  
  Check the Devices list daily to ensure all devices show CONNECTED status.

- **Use Pending Payment as fallback**  
  Enable Pending Payment in gateway settings for when devices go offline.

- **Test after connecting**  
  Make a small test transaction to verify SMS forwarding works correctly.

- **Keep app updated**  
  Update the Paymently app when new versions are released.

- **Secure device physically**  
  Keep devices in a secure location to prevent tampering or theft.

- **Document device assignments**  
  Keep records of which device handles which MFS account.

- **Review mismatch warnings promptly**  
  Check SMS Data with "Balance verify mismatch" warnings daily.

::: tip
For best results, combine connected devices with Pending Payment enabled. This ensures customers can complete checkout even during temporary device issues, while maintaining automatic verification when devices are online.
:::

::: warning
Never share device credentials or QR codes. Each device should be uniquely connected to your account for security and tracking purposes.
:::