---
title: Payment Best Practices
---

# Payment Best Practices

The following practices help maintain reliable payment records.

- **Verify before approving**  
  Ensure the transaction has cleared with the gateway before marking it as completed.  

- **Prefer refund over delete**  
  If a payment needs to be reversed, issue a refund. This preserves transaction history and ensures accurate reporting.  

- **Use filters and exports**  
  Combine filters and column visibility to audit specific gateways, customers, or time ranges.  

- **Resend IPNs when necessary**  
  If your system did not receive a callback, use the **Send IPN** action to resend the notification.