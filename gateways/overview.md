---
title: Gateways
---

# Gateways

Gateways connect UddoktaPay to payment methods. There are two types:

- **Automatic (API & MFS Automation)** — Provider SDK/API integrations and mobile-financial-service automations.
- **Manual Bank Gateways** — Bank transfer methods that require proof (e.g., slip, reference ID). These collect user inputs and are reviewed/approved through Payments.

A gateway may be **enabled/disabled**, **ordered**, and **configured**. Gateways that do not meet amount rules are automatically hidden during checkout.

::: warning
If the checkout amount is not within a gateway’s **Minimum** and **Maximum** limits, that gateway will not appear. A **Maximum Amount** of **0** means **unlimited**.
:::
