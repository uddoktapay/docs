# Automatic Entry

Automatic entries are created when you paste the **full SMS message** from a supported provider (e.g., bKash, Nagad, Rocket).  
The system parses the message to extract transaction details.

Steps:

1. Go to **SMS Data → New SMS Data**.  
2. Select **Entry Type: Automatic Entry**.  
3. Choose the **Payment Method**.  
4. Paste the **exact SMS text** into the message field.  
5. Save the entry.

If parsing is successful, the record is created with details such as:

- Transaction ID  
- Amount  
- Balance  
- Phone Number  
- Payment Type (Agent, Personal, Merchant)  

::: warning
If parsing fails (message not recognized or incomplete), no automatic entry is created.  
In that case, use a **Manual Entry**.
:::
