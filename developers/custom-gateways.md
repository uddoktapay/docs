---
title: Custom Gateways
---

# Custom Gateways

- [Introduction](#introduction)
- [Gateway Structure](#gateway-structure)
- [Creating A Gateway Provider](#creating-a-gateway-provider)
- [Gateway Metadata](#gateway-metadata)
- [Configuration Form](#configuration-form)
- [Initialization](#initialization)
- [Payment Flow](#payment-flow)
- [Handling Callbacks](#handling-callbacks)
- [IPN Support](#ipn-support)
- [Refund Support](#refund-support)
- [Helper Methods](#helper-methods)
- [Testing Your Gateway](#testing-your-gateway)
- [Best Practices](#best-practices)

## Introduction

Custom gateways let you integrate any payment provider into UddoktaPay. They extend the `BaseGatewayProvider` class and appear alongside built-in gateways in the admin panel.

**Common use cases:**
- Integrate regional payment providers
- Add niche payment services
- Connect proprietary payment systems
- Build custom payment workflows

## Gateway Structure

Place your gateway in the correct directory for auto-discovery:

```
app/
└── Modules/
    └── Gateways/
        └── YourGateway/
            └── ProcessPayment.php
```

**Your namespace must match the directory:**

```php
namespace App\Modules\Gateways\YourGateway;
```

## Creating A Gateway Provider

Every gateway extends `BaseGatewayProvider` and implements required methods.

**Basic structure:**

```php
<?php

namespace App\Modules\Gateways\ExampleGateway;

use Illuminate\Http\Request;
use Revoltify\Gatewayify\BaseGatewayProvider;
use Revoltify\Gatewayify\Config\GatewayMetadata;
use Revoltify\Gatewayify\Contracts\Paymentable;
use Revoltify\Gatewayify\Response\GatewayResponse;
use Revoltify\Support\Forms\Components\Field;
use Revoltify\Support\Forms\Form;

class ProcessPayment extends BaseGatewayProvider
{
    // Define gateway info and appearance
    public static function metadata(): GatewayMetadata
    {
        return GatewayMetadata::make()
            ->name('Example Gateway')
            ->currency('USD', '$')
            ->group('example')
            ->global()
            ->live();
    }

    // Define admin configuration fields
    public function config(): Form
    {
        return Form::make([
            Field::make('api_key')->required(),
            Field::make('api_secret')->password()->required(),
        ]);
    }

    // Initiate payment with gateway
    public function checkout(Paymentable $payment): GatewayResponse
    {
        // 1. Call gateway API to create payment
        // 2. Return redirect URL to checkout page
    }

    // Handle return after payment
    public function success(Request $request, Paymentable $payment): GatewayResponse
    {
        // 1. Verify payment status with gateway
        // 2. Mark payment as completed or pending
        // 3. Always return redirectToSuccessURL
    }
}
```

## Gateway Metadata

Configure how your gateway appears and behaves:

```php
public static function metadata(): GatewayMetadata
{
    return GatewayMetadata::make()
        ->name('Stripe')                 // Display name
        ->currency('USD', '$')           // Supported currency
        ->group('stripe')                // Group identifier
        ->global()                       // Gateway type
        ->live();                        // Operation mode
}
```

### Available Options

**Gateway Type:**
```php
->global()  // International (Stripe, PayPal)
->mfs()     // Mobile Money (bKash, Nagad)
->bank()    // Bank Transfer
```

**Operation Mode:**
```php
->live()      // Automated API integration
->personal()  // Manual personal account
->agent()     // Manual agent account
->merchant()  // Manual merchant account
```

**Additional Features:**
```php
->qr()  // Enable QR code display
```

## Configuration Form

Define what settings admins need to configure:

```php
public function config(): Form
{
    return Form::make([
        // Environment toggle
        Field::make('sandbox')
            ->select([
                'enable' => 'Sandbox Mode',
                'disable' => 'Live Mode',
            ])
            ->default('disable')
            ->required(),

        // API credentials
        Field::make('api_key')
            ->placeholder('sk_live_...')
            ->helperText('Find in your dashboard under API Keys')
            ->required(),

        Field::make('api_secret')
            ->password()
            ->revealable()  // Show/hide toggle
            ->required(),

        // IPN/Webhook URL (if gateway requires manual setup)
        Field::make('webhook_url')
            ->value($this->gateway->gatewayifyIpnUrl())
            ->suffixCopy()  // Copy button
            ->disabled()    // Read-only
            ->columnSpanFull()
            ->helperText('Copy this URL and paste it in your gateway dashboard webhook settings'),
    ]);
}
```

::: tip Displaying IPN URL in Config
If your gateway requires you to manually configure a webhook URL in their dashboard (like Paddle, Stripe, etc.), display it in the config form:
- Use `->value($this->gateway->gatewayifyIpnUrl())` to get the static IPN URL
- Add `->suffixCopy()` for easy copying
- Make it `->disabled()` so it's read-only
- Add helpful text telling admins where to paste it
:::

### Common Field Types

**Text input:**
```php
Field::make('merchant_id')
    ->placeholder('Enter ID')
    ->maxLength(50)
```

**Password with reveal:**
```php
Field::make('secret')
    ->password()
    ->revealable()
```

**Dropdown:**
```php
Field::make('mode')
    ->select([
        'test' => 'Test',
        'live' => 'Live',
    ])
```

**Number:**
```php
Field::make('timeout')
    ->number()
    ->min(10)
    ->max(300)
    ->suffix('seconds')
```

**Textarea:**
```php
Field::make('notes')
    ->textarea(rows: 3)
    ->columnSpanFull()
```

**Read-only field with copy (for IPN URLs):**
```php
Field::make('webhook_url')
    ->value($this->gateway->gatewayifyIpnUrl())
    ->suffixCopy()
    ->disabled()
    ->columnSpanFull()
    ->helperText('Copy this URL and add it to your gateway webhook settings')
```

**Conditional fields:**
```php
Field::make('sandbox_key')
    ->visibleWhen('sandbox', 'enable')  // Show only when sandbox enabled
```

## Initialization

Use `init()` to validate credentials and set up your gateway before processing payments.

```php
use Revoltify\Gatewayify\Contracts\Initializable;
use Revoltify\Gatewayify\Exceptions\ApiCredentialException;

class ProcessPayment extends BaseGatewayProvider implements Initializable
{
    private string $baseUrl;
    private array $headers;

    public function init(): void
    {
        // Validate required credentials
        ApiCredentialException::throwIfEmpty(
            $this->getConfig('api_key'),
            $this->getConfig('api_secret')
        );

        // Set API endpoint based on mode
        $this->baseUrl = $this->getConfig('sandbox') === 'enable'
            ? 'https://sandbox.gateway.com/api/'
            : 'https://api.gateway.com/';

        // Prepare headers for requests
        $this->headers = [
            'Authorization' => 'Bearer ' . $this->getConfig('api_key'),
            'Content-Type' => 'application/json',
        ];
    }
}
```

::: tip When to use init()
Implement `Initializable` when you need to:
- Validate API credentials before processing
- Set up base URLs or endpoints
- Prepare authentication headers
- Initialize SDK instances
:::

## Payment Flow

### Checkout Method

Create a payment session and redirect the customer:

```php
use Illuminate\Support\Facades\Http;

public function checkout(Paymentable $payment): GatewayResponse
{
    // Prevent double processing
    if ($payment->paymentableIsAlreadyCompleted()) {
        return GatewayResponse::error('Payment already completed');
    }

    // Create payment with gateway API
    $response = Http::withHeaders($this->headers)->post($this->baseUrl . 'payments', [
        'amount' => $payment->paymentableAmount(),
        'currency' => 'USD',
        'reference' => $payment->paymentableReferenceId(),
        'customer' => [
            'name' => $payment->paymentableCustomerName(),
            'email' => $payment->paymentableCustomerEmail(),
            'phone' => $payment->paymentableCustomerPhone(),
        ],
        // Callback URLs
        'success_url' => $this->gateway->gatewayifySuccessUrl($payment),
        'cancel_url' => $this->gateway->gatewayifyCancelUrl($payment),
        'ipn_url' => $this->gateway->gatewayifyIpnUrl($payment),  // If gateway supports IPN
    ]);

    // Handle errors
    if ($response->failed()) {
        return GatewayResponse::error('Payment creation failed');
    }

    // Redirect to checkout
    $data = $response->json();
    return GatewayResponse::redirect($data['checkout_url']);
}
```

### Payment Data Available

```php
$payment->paymentableReferenceId()        // Unique reference
$payment->paymentableAmount()             // Amount to charge
$payment->paymentableCustomerName()       // Customer name
$payment->paymentableCustomerEmail()      // Customer email
$payment->paymentableCustomerPhone()      // Customer phone
$payment->paymentableProductName()        // Product description
$payment->paymentableIsAlreadyCompleted() // Check if paid
```

### Response Types

**Redirect customer:**
```php
return GatewayResponse::redirect('https://gateway.com/checkout/abc123');
```

**Show error:**
```php
return GatewayResponse::error('Invalid credentials');
```

**Show success message:**
```php
return GatewayResponse::success('Payment initiated');
```

### Callback URLs

Generate URLs with optional parameters:

```php
// Basic callback URLs
$successUrl = $this->gateway->gatewayifySuccessUrl($payment);
$cancelUrl = $this->gateway->gatewayifyCancelUrl($payment);

// IPN/Webhook URL (if gateway supports it)
$ipnUrl = $this->gateway->gatewayifyIpnUrl($payment);  // Per-payment IPN URL

// Static IPN URL (for config form display)
$staticIpnUrl = $this->gateway->gatewayifyIpnUrl();  // Without payment param

// With query parameters
$successUrl = $this->gateway->gatewayifySuccessUrl($payment, [
    'session_id' => $response['session'],
    'payment_ref' => $response['id'],
]);
```

::: tip IPN URL Usage
**Use in checkout** (if gateway accepts dynamic webhooks):
```php
'webhook_url' => $this->gateway->gatewayifyIpnUrl($payment)
```
✅ No need for `resolvePaymentableFromIpn()`

**Use in config form** (if gateway requires manual setup):
```php
Field::make('webhook_url')
    ->value($this->gateway->gatewayifyIpnUrl())  // No payment param
    ->suffixCopy()
```
⚠️ Must also implement `resolvePaymentableFromIpn()` (see [IPN Support](#ipn-support))
:::

## Handling Callbacks

Verify payment status when customer returns to your site:

```php
public function success(Request $request, Paymentable $payment): GatewayResponse
{
    // Get payment reference from URL
    $reference = $request->get('reference');
    
    if (!$reference) {
        return GatewayResponse::error('Reference required');
    }

    // Verify with gateway API
    $response = Http::withHeaders($this->headers)
        ->get($this->baseUrl . "payments/{$reference}");

    if ($response->failed()) {
        return GatewayResponse::error('Verification failed');
    }

    $data = $response->json();

    // Payment successful
    if ($data['status'] === 'completed') {
        $this->markAsCompleted(
            payment: $payment,
            transactionId: $data['transaction_id'],
            gatewayReferenceId: $data['payment_id'],
            senderNumber: $data['customer_phone'] ?? null
        );

        return $this->redirectToSuccessURL($payment);
    }

    // Payment pending
    if ($data['status'] === 'pending') {
        $this->markAsPending(
            payment: $payment,
            transactionId: $data['transaction_id'],
            gatewayReferenceId: $data['payment_id']
        );

        return $this->redirectToSuccessURL($payment);
    }

    return GatewayResponse::error('Payment failed');
}
```

::: warning Important
Always return `$this->redirectToSuccessURL($payment)` for both completed and pending payments. The system automatically shows the appropriate message based on the payment status you set.
:::

### Marking Payment Status

**Completed payment:**
```php
$this->markAsCompleted(
    payment: $payment,
    transactionId: 'TXN123456',           // Gateway transaction ID
    gatewayReferenceId: 'PAY789',         // Gateway payment ID
    senderNumber: '+8801712345678',       // Optional
    additionalData: ['fee' => 2.50]       // Optional
);
```

**Pending payment:**
```php
$this->markAsPending(
    payment: $payment,
    transactionId: 'TXN123456',
    gatewayReferenceId: 'PAY789'
);
```


## IPN Support

For gateways that support Instant Payment Notifications (webhooks), implement the `IPNCapable` interface.

::: warning Interface Implementation Required
To enable IPN support, your gateway class must implement the `IPNCapable` interface:
```php
use Revoltify\Gatewayify\Contracts\IPNCapable;

class ProcessPayment extends BaseGatewayProvider implements IPNCapable
{
    // ... your methods
}
```
:::

### IPN Method

The `ipn()` method processes webhook notifications from your gateway:

```php
use Illuminate\Support\Facades\Http;

public function ipn(Request $request, Paymentable $payment): GatewayResponse
{
    try {
        // Verify webhook authenticity with gateway
        $response = Http::asForm()->post(
            $this->baseUrl . 'ipn/verify',
            $request->all()
        );

        if ($response->failed()) {
            return GatewayResponse::error('Verification failed');
        }

        $data = $response->json();

        // Handle completed payment
        if ($data['status'] === 'completed') {
            $this->markAsCompleted(
                payment: $payment,
                transactionId: $data['transaction_id'],
                gatewayReferenceId: $data['payment_id'],
                senderNumber: $data['customer_phone'] ?? null,
                additionalData: [
                    'fee' => $data['fee'] ?? 0,
                    'net_amount' => $data['net_amount'] ?? 0,
                ]
            );

            return GatewayResponse::success('Payment completed');
        }

        // Handle pending payment
        if ($data['status'] === 'pending') {
            $this->markAsPending(
                payment: $payment,
                transactionId: $data['transaction_id'],
                gatewayReferenceId: $data['payment_id']
            );

            return GatewayResponse::success('Payment pending');
        }

        return GatewayResponse::error('Payment failed');

    } catch (\Exception $e) {
        Log::error('IPN Error', [
            'message' => $e->getMessage(),
            'payload' => $request->all(),
        ]);
        
        return GatewayResponse::error('IPN processing error');
    }
}
```

**Key points:**
- Verify webhook authenticity (signature, token, or verification endpoint)
- Extract payment status and transaction details
- Mark payment as completed or pending based on status
- Always return `GatewayResponse` with appropriate message
- Log all IPN activities for debugging

### Resolve Payment from IPN

::: warning When Required
Implement `resolvePaymentableFromIpn()` **only if** your gateway uses a static webhook URL (configured in their dashboard). If your gateway accepts dynamic IPN URLs during checkout, you can skip this method.
:::

**If your gateway requires static webhooks** (like Paddle, Stripe), implement this method to identify the payment:

```php
use Illuminate\Database\Eloquent\Builder;

public function resolvePaymentableFromIpn(
    Request $request, 
    Builder $paymentQuery
): ?Paymentable {
    // Extract reference ID from webhook payload
    // Check common field names used by gateways
    $referenceId = $request->input('reference')
                ?? $request->input('order_id')
                ?? $request->input('merchant_reference')
                ?? $request->input('custom_data.reference');

    // Return null if no reference found
    if (!$referenceId) {
        Log::warning('IPN missing reference', [
            'payload' => $request->all(),
        ]);
        return null;
    }

    // Find and return the payment
    return $paymentQuery->byReferenceId($referenceId)->first();
}
```

**How it works:**
1. System receives webhook at static URL (e.g., `/ipn/paddle`)
2. `resolvePaymentableFromIpn()` extracts payment reference from payload
3. System finds the payment record using the reference
4. System calls `ipn()` with the found payment

**Common payload field names:**
- `reference`, `order_id`, `merchant_reference`
- `custom`, `custom_data`, `metadata`
- `passthrough`, `client_reference_id`

::: tip Pro Tip
Check your gateway's webhook documentation to find which field contains the payment reference, then adjust the field names in `resolvePaymentableFromIpn()` accordingly.
:::

### IPN Methods Summary

**resolvePaymentableFromIpn()**

Finds the payment record from IPN data:
- Receives IPN request and payment query builder
- Returns `Paymentable` if found, `null` if not
- Check multiple possible field names for reference
- Log when reference is missing for debugging

**ipn()**

Processes the IPN notification:
- Verify IPN authenticity (signature, token, or verification endpoint)
- Extract payment status and transaction details
- Mark payment as completed or pending
- Return `GatewayResponse` with result
- Log all IPN activities for debugging

::: tip IPN vs Success Callback
- **Success Callback:** User returns to site after payment (can fail if user closes browser)
- **IPN (Webhook):** Server-to-server notification (more reliable)
- Always implement IPN when available for better reliability
- IPN ensures payment status updates even if user doesn't return
:::

### About `resolvePaymentableFromIpn()`

::: info When is this needed?
This method is **optional** but **required** if your gateway doesn't accept IPN URL during checkout.

**Two IPN scenarios:**

1. **Gateway accepts IPN URL during checkout** ✅
   - Pass `gatewayifyIpnUrl($payment)` in checkout payload
   - ✅ No need for `resolvePaymentableFromIpn()`
   - Each payment gets unique IPN URL

2. **Gateway requires static webhook in dashboard** ⚠️
   - Display IPN URL in config form with copy button
   - Admin manually pastes it in gateway dashboard
   - ⚠️ **Must implement `resolvePaymentableFromIpn()`** to extract payment reference from payload
:::

**Example scenarios:**

```php
// Scenario 1: Dynamic IPN URLs (no resolvePaymentableFromIpn needed)
public function checkout(Paymentable $payment): GatewayResponse
{
    $response = Http::post($this->baseUrl . 'payments', [
        'amount' => $payment->paymentableAmount(),
        'reference' => $payment->paymentableReferenceId(),
        'ipn_url' => $this->gateway->gatewayifyIpnUrl($payment),
        // IPN sent to: https://yoursite.com/ipn/REF123
    ]);
    
    return GatewayResponse::redirect($response->json('checkout_url'));
}

// Scenario 2: Static webhook (MUST implement both)
// Step 1: Display webhook URL in config form
public function config(): Form
{
    return Form::make([
        Field::make('api_key')->required(),
        
        // Show webhook URL for manual setup
        Field::make('webhook_url')
            ->value($this->gateway->gatewayifyIpnUrl())
            ->suffixCopy()
            ->disabled()
            ->columnSpanFull()
            ->helperText('Copy and paste this in your Paddle dashboard webhook settings'),
    ]);
}

// Step 2: Include reference in checkout payload
public function checkout(Paymentable $payment): GatewayResponse
{
    $response = Http::post($this->baseUrl . 'payments', [
        'amount' => $payment->paymentableAmount(),
        'reference' => $payment->paymentableReferenceId(), // Important: include reference
        // Webhook URL configured in gateway dashboard
    ]);
    
    return GatewayResponse::redirect($response->json('checkout_url'));
}

// Step 3: Implement resolvePaymentableFromIpn (REQUIRED for Scenario 2)
public function resolvePaymentableFromIpn(Request $request, Builder $query): ?Paymentable
{
    // Extract reference from webhook payload
    $ref = $request->input('reference') 
        ?? $request->input('order_id')
        ?? $request->input('custom_data.reference');
    
    if (!$ref) {
        return null;
    }
    
    return $query->byReferenceId($ref)->first();
}
```

::: tip IPN vs Success Callback
- **Success Callback:** User returns to your site (can fail if user closes browser)
- **IPN (Webhook):** Server-to-server notification (reliable)
- Always implement IPN when available for better reliability
:::

## Refund Support

For gateways that support Refund, implement the ```RefundCapable``` interface.

::: warning Interface Implementation Required

Enable refunds by implementing the `RefundCapable` interface:

```php
use Revoltify\Gatewayify\Contracts\RefundCapable;
use Revoltify\Gatewayify\Exceptions\ProviderException;

class ProcessPayment extends BaseGatewayProvider implements RefundCapable
{
    public function refund(
        Paymentable $payment,
        string|float|int $amount,
        ?string $reason = null
    ): ?string {
        // Call gateway refund API
        $response = Http::withHeaders($this->headers)
            ->post($this->baseUrl . 'refunds', [
                'payment_id' => $payment->paymentableGatewayReferenceId(),
                'amount' => $amount,
                'reason' => $reason ?? 'Refund requested',
            ]);

        // Handle errors
        if ($response->failed()) {
            throw ProviderException::make('Refund failed');
        }

        // Return refund transaction ID
        return $response->json('refund_id');
    }
}
```
:::

**Return values:**
- **Success:** Return refund transaction ID (string)
- **Failure:** Throw `ProviderException` with error message

## Helper Methods

### Get Configuration

```php
$apiKey = $this->getConfig('api_key');
$mode = $this->getConfig('sandbox', 'disable');  // With default
```

## Testing Your Gateway

### Enable Debug Logging

```php
use Illuminate\Support\Facades\Log;

public function checkout(Paymentable $payment): GatewayResponse
{
    Log::info('Creating payment', [
        'reference' => $payment->paymentableReferenceId(),
        'amount' => $payment->paymentableAmount(),
    ]);

    $response = Http::post($url, $data);

    Log::info('Gateway response', [
        'status' => $response->status(),
        'data' => $response->json(),
    ]);

    // ... rest of code
}
```

### Handle Errors Gracefully

```php
try {
    $response = Http::timeout(30)->post($url, $data);
    
    if ($response->failed()) {
        return GatewayResponse::error('Payment failed');
    }
    
    return GatewayResponse::redirect($response->json('checkout_url'));
    
} catch (\Exception $e) {
    Log::error('Gateway error', [
        'message' => $e->getMessage(),
    ]);
    
    return GatewayResponse::error('Connection failed');
}
```

## Best Practices

### Security
- Never log sensitive data (API keys, tokens, card numbers)
- Always verify webhook signatures
- Use HTTPS for all API calls
- Validate all incoming data
- Store credentials encrypted

### Error Handling
- Return clear error messages
- Log errors for debugging
- Handle network timeouts
- Don't expose sensitive errors to users
- Always return `redirectToSuccessURL()` in callbacks

### Code Quality
- Use type hints
- Add helpful comments
- Follow PSR standards
- Write descriptive variable names
- Keep methods focused and simple

### Performance
- Set appropriate timeouts (30 seconds recommended)
- Cache configuration if accessed frequently
- Minimize API calls during checkout
- Use IPN for async updates

### User Experience
- Provide clear configuration instructions
- Use helpful tooltips and labels
- Show meaningful error messages
- Test the complete checkout flow
- Handle all payment statuses properly