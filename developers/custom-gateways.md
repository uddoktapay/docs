---
title: Custom Gateways
---

# Custom Gateways

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
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
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Introduction

Custom gateways let you integrate any payment provider into UddoktaPay. They extend the `BaseGatewayProvider` class and appear alongside built-in gateways in the admin panel.

**Common use cases:**
- Integrate regional payment providers
- Add niche payment services
- Connect proprietary payment systems
- Build custom payment workflows

## Prerequisites

Before creating a custom gateway, you should be familiar with:

- **Laravel HTTP Client** - Used for API requests ([Documentation](https://laravel.com/docs/11.x/http-client))
- Basic PHP OOP concepts
- RESTful API integration
- Webhook/IPN handling

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

::: warning Naming Convention
- Directory name should be PascalCase (e.g., `BkashPayment`)
- Class must be named `ProcessPayment`
- Namespace must match directory path
:::

## Creating A Gateway Provider

Every gateway extends `BaseGatewayProvider` and implements required methods.

**Basic structure:**

```php
<?php

namespace App\Modules\Gateways\ExampleGateway;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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

Create a payment session and redirect the customer.

::: tip Laravel HTTP Client
This section uses Laravel's HTTP client for API requests. Learn more: [Laravel HTTP Client Documentation](https://laravel.com/docs/11.x/http-client)
:::

```php
use Illuminate\Support\Facades\Http;

public function checkout(Paymentable $payment): GatewayResponse
{
    // Prevent double processing
    if ($payment->paymentableIsAlreadyCompleted()) {
        return GatewayResponse::error('Payment already completed');
    }

    try {
        // Create payment with gateway API
        $response = Http::timeout(30)
            ->withHeaders($this->headers)
            ->post($this->baseUrl . 'payments', [
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
                'ipn_url' => $this->gateway->gatewayifyIpnUrl($payment),
            ]);

        // Handle API errors
        if ($response->failed()) {
            return GatewayResponse::error('Payment creation failed');
        }

        $data = $response->json();

        // Redirect to checkout
        return GatewayResponse::redirect($data['checkout_url']);

    } catch (\Exception $e) {
        return GatewayResponse::error('Connection failed. Please try again.');
    }
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
$payment->paymentableGatewayReferenceId() // Gateway payment ID (after completion)
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

### Understanding IPN URLs

There are two ways gateways handle webhooks:

**1. Dynamic IPN URLs** (Gateway accepts unique webhook per payment)
```php
// Pass IPN URL during checkout
'ipn_url' => $this->gateway->gatewayifyIpnUrl($payment)
// Result: https://yoursite.com/ipn/gateway-name/REF123

// No need for resolvePaymentableFromIpn() - payment is in the URL
```

**2. Static Webhook URLs** (Gateway requires one webhook URL in dashboard)
```php
// Display in config form for admin to copy
Field::make('webhook_url')
    ->value($this->gateway->gatewayifyIpnUrl())  // No payment param
    ->suffixCopy()
// Result: https://yoursite.com/ipn/gateway-name

// ⚠️ Must implement resolvePaymentableFromIpn() - need to extract reference from payload
```

## Handling Callbacks

Verify payment status when customer returns to your site:

```php
use Illuminate\Support\Facades\Http;

public function success(Request $request, Paymentable $payment): GatewayResponse
{
    // Get payment reference from URL
    $reference = $request->get('reference');
    
    if (!$reference) {
        return GatewayResponse::error('Reference required');
    }

    try {
        // Verify with gateway API
        $response = Http::timeout(30)
            ->withHeaders($this->headers)
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

        // Payment failed
        return GatewayResponse::error('Payment failed');

    } catch (\Exception $e) {
        return GatewayResponse::error('Verification error');
    }
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

### When to Use IPN

**Why implement IPN?**
- **Reliability:** Server-to-server notifications are more reliable than user redirects
- **User experience:** Payment status updates even if user closes browser
- **Automation:** Handle payments without user intervention

**IPN vs Success Callback:**
- **Success Callback:** User returns to site after payment (can fail if user closes browser)
- **IPN (Webhook):** Server-to-server notification (always works)
- Always implement both for maximum reliability

### Two IPN Scenarios

#### Scenario 1: Dynamic IPN URLs Simpler

Gateway accepts IPN URL during payment creation:

```php
public function checkout(Paymentable $payment): GatewayResponse
{
    $response = Http::post($this->baseUrl . 'payments', [
        'amount' => $payment->paymentableAmount(),
        'reference' => $payment->paymentableReferenceId(),
        // Pass unique IPN URL for this payment
        'ipn_url' => $this->gateway->gatewayifyIpnUrl($payment),
        // Result: https://yoursite.com/ipn/gateway-name/REF123
    ]);
    
    return GatewayResponse::redirect($response->json('checkout_url'));
}

// Only need to implement ipn() method
// No need for resolvePaymentableFromIpn()
```

#### Scenario 2: Static Webhook URL ⚠️ Requires Extra Step

Gateway requires one webhook URL configured in their dashboard:

**Step 1:** Display webhook URL in config form
```php
public function config(): Form
{
    return Form::make([
        Field::make('api_key')->required(),
        
        // Show static webhook URL for admin to copy
        Field::make('webhook_url')
            ->value($this->gateway->gatewayifyIpnUrl())
            ->suffixCopy()
            ->disabled()
            ->columnSpanFull()
            ->helperText('Copy this URL and paste it in your gateway dashboard webhook settings'),
    ]);
}
```

**Step 2:** Include reference in payment data
```php
public function checkout(Paymentable $payment): GatewayResponse
{
    $response = Http::post($this->baseUrl . 'payments', [
        'amount' => $payment->paymentableAmount(),
        // Important: Include reference so we can find payment later
        'reference' => $payment->paymentableReferenceId(),
        'metadata' => [
            'order_id' => $payment->paymentableReferenceId(),
        ],
    ]);
    
    return GatewayResponse::redirect($response->json('checkout_url'));
}
```

**Step 3:** Implement both IPN methods (REQUIRED)
```php
// Method 1: Find payment from webhook payload
public function resolvePaymentableFromIpn(Request $request, Builder $query): ?Paymentable
{
    // Extract reference from webhook payload
    // Check common field names used by gateways
    $ref = $request->input('reference') 
        ?? $request->input('order_id')
        ?? $request->input('metadata.order_id')
        ?? $request->input('custom_data.reference');
    
    if (!$ref) {
        Log::warning('IPN missing reference', [
            'payload' => $request->all(),
        ]);
        return null;
    }
    
    // Find and return payment
    return $query->byReferenceId($ref)->first();
}

// Method 2: Process the webhook
public function ipn(Request $request, Paymentable $payment): GatewayResponse
{
    // ... verify and process
}
```

### IPN Method Implementation

Process webhook notifications from your gateway:

```php
use Illuminate\Support\Facades\Http;

public function ipn(Request $request, Paymentable $payment): GatewayResponse
{
    try {
        // Verify webhook authenticity with gateway
        $response = Http::timeout(30)
            ->asForm()
            ->post($this->baseUrl . 'ipn/verify', $request->all());

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
        return GatewayResponse::error('IPN processing error');
    }
}
```

**Key points:**
- Always verify webhook authenticity (signature, token, or verification endpoint)
- Extract payment status and transaction details
- Mark payment as completed or pending based on status
- Always return `GatewayResponse` with appropriate message
- Handle all edge cases and exceptions gracefully

### Resolve Payment from IPN

::: info When is this needed?
Only implement `resolvePaymentableFromIpn()` if your gateway uses a **static webhook URL** (configured in their dashboard). If your gateway accepts dynamic IPN URLs during checkout, skip this method.
:::

Extract payment reference from webhook payload:

```php
use Illuminate\Database\Eloquent\Builder;

public function resolvePaymentableFromIpn(
    Request $request, 
    Builder $paymentQuery
): ?Paymentable {
    // Extract reference from common webhook payload fields
    // Different gateways use different field names
    $referenceId = $request->input('reference')
                ?? $request->input('order_id')
                ?? $request->input('merchant_reference')
                ?? $request->input('metadata.reference')
                ?? $request->input('custom_data.reference')
                ?? $request->input('passthrough.reference')
                ?? $request->input('client_reference_id');

    // Return null if no reference found
    if (!$referenceId) {
        return null;
    }

    // Find and return the payment
    return $paymentQuery->byReferenceId($referenceId)->first();
}
```
::: tip Pro Tip
Check your gateway's webhook documentation to find which field contains the payment reference. Test with their webhook testing tools to see the actual payload structure.
:::

### IPN Security Best Practices

**1. Verify webhook signatures:**
```php
public function ipn(Request $request, Paymentable $payment): GatewayResponse
{
    // Verify signature before processing
    $signature = $request->header('X-Gateway-Signature');
    $expectedSignature = hash_hmac(
        'sha256',
        $request->getContent(),
        $this->getConfig('webhook_secret')
    );

    if (!hash_equals($expectedSignature, $signature)) {
        return GatewayResponse::error('Invalid signature');
    }

    // Process webhook...
}
```

**2. Validate payment state:**
```php
// Don't process if already completed
if ($payment->paymentableIsAlreadyCompleted()) {
    return GatewayResponse::success('Already processed');
}
```

**3. Handle idempotency:**
```php
// Gateway may send duplicate webhooks
// Check transaction ID before processing
if ($payment->paymentableGatewayReferenceId() === $data['payment_id']) {
    return GatewayResponse::success('Already processed');
}
```

## Refund Support

For gateways that support refunds, implement the `RefundCapable` interface.

::: warning Interface Implementation Required
Enable refunds by implementing the `RefundCapable` interface:

```php
use Revoltify\Gatewayify\Contracts\RefundCapable;
use Revoltify\Gatewayify\Exceptions\ProviderException;
use Illuminate\Support\Facades\Http;

class ProcessPayment extends BaseGatewayProvider implements RefundCapable
{
    public function refund(
        Paymentable $payment,
        string|float|int $amount,
        ?string $reason = null
    ): ?string {
        try {
            // Call gateway refund API
            $response = Http::timeout(30)
                ->withHeaders($this->headers)
                ->post($this->baseUrl . 'refunds', [
                    'payment_id' => $payment->paymentableGatewayReferenceId(),
                    'amount' => $amount,
                    'reason' => $reason ?? 'Refund requested',
                ]);

            // Handle errors
            if ($response->failed()) {
                $errorMessage = $response->json('message') ?? 'Refund failed';
                throw ProviderException::make($errorMessage);
            }

            $refundId = $response->json('refund_id');

            // Return refund transaction ID
            return $refundId;

        } catch (\Exception $e) {
            throw ProviderException::make('Refund failed: ' . $e->getMessage());
        }
    }
}
```
:::

**Return values:**
- **Success:** Return refund transaction ID (string)
- **Failure:** Throw `ProviderException` with error message

**Refund handling tips:**
- Always validate the refund amount
- Check if payment is completed before refunding
- Store refund transaction ID for tracking
- Handle partial refunds if gateway supports them

## Helper Methods

### Get Configuration

```php
// Get config value
$apiKey = $this->getConfig('api_key');

// Get with default value
$mode = $this->getConfig('sandbox', 'disable');

// Check if config exists
if ($this->getConfig('api_key')) {
    // Config exists
}
```

### Access Gateway Instance

```php
// Get gateway name
$name = $this->gateway->name;

// Get gateway display name
$name = $this->gateway->display_name;

// Get gateway ID
$id = $this->gateway->id;

// Check if gateway is enabled
if ($this->gateway->status()) {
    // Gateway is active
}
```

## Testing Your Gateway

### Handle Errors Gracefully

```php
try {
    $response = Http::timeout(30)
        ->retry(3, 100)  // Retry 3 times with 100ms delay
        ->post($url, $data);
    
    if ($response->failed()) {
        return GatewayResponse::error('Payment failed');
    }
    
    return GatewayResponse::redirect($response->json('checkout_url'));
    
} catch (\Illuminate\Http\Client\ConnectionException $e) {
    return GatewayResponse::error('Connection failed. Please try again.');
    
} catch (\Exception $e) {
    return GatewayResponse::error('An error occurred. Please contact support.');
}
```

## Troubleshooting

### Common Issues

**Gateway not appearing in admin:**
- Check namespace matches directory structure
- Verify class is named `ProcessPayment`
- Clear application cache: `php artisan cache:clear`

**Checkout fails:**
- Check API credentials are correct
- Verify `init()` is properly implemented
- Test API credentials with gateway's test tool
- Check network connectivity

**Success callback not working:**
- Verify callback URL is reachable
- Check if gateway sends correct parameters
- Test with gateway's webhook testing tool
- Verify payment status mapping is correct

**IPN not triggering:**
- Verify webhook URL is correctly configured in gateway dashboard
- Check if `IPNCapable` interface is implemented
- Ensure `resolvePaymentableFromIpn()` extracts correct field
- Check gateway's webhook delivery logs

**Payment not marked as completed:**
- Verify you're calling `markAsCompleted()` or `markAsPending()`
- Check payment status field mapping is correct
- Ensure success callback returns `redirectToSuccessURL()`
- Test with different payment statuses

## Best Practices

### Security
- **Never store sensitive data in plain text** (API keys, tokens, card numbers, passwords)
- **Always verify webhook signatures** using HMAC or gateway-provided methods
- **Validate all incoming data** from callbacks and webhooks
- **Use strong, unique webhook secrets** for signature verification

### Error Handling
- **Return clear error messages** that help users understand what went wrong
- **Handle network timeouts** gracefully with appropriate timeouts (30s recommended)
- **Don't expose sensitive errors** to users (show generic message instead)
- **Always return `redirectToSuccessURL()`** in success callbacks for consistency
- **Handle all payment statuses** (completed, pending, failed, cancelled)
- **Implement retry logic** for transient network failures

### Code Quality
- **Use type hints** for all method parameters and return types
- **Add helpful comments** explaining complex logic or gateway-specific quirks
- **Follow PSR standards** for code style and formatting
- **Write descriptive variable names** that clearly indicate purpose
- **Keep methods focused** - each method should do one thing well
- **Extract complex logic** into private helper methods
- **Use early returns** to reduce nesting

### Performance
- **Set appropriate timeouts** (30 seconds recommended for API calls)
- **Minimize API calls** during checkout to reduce latency
- **Use HTTP client retries** for transient failures

### User Experience
- **Provide clear configuration instructions** with examples
- **Use helpful tooltips and labels** in config form
- **Show meaningful error messages** that guide users
- **Test the complete checkout flow** from start to finish
- **Handle all payment statuses properly** with appropriate messaging
- **Provide copy buttons** for webhook URLs and IDs
- **Add validation hints** for configuration fields

### Testing
- **Test in sandbox mode first** before going live
- **Test all payment flows** (success, cancel, timeout, error)
- **Test IPN/webhook handling** with gateway's test tools
- **Test error scenarios** (invalid credentials, network failures, etc.)
- **Test with different amounts** to ensure proper handling

### Maintenance
- **Keep up with gateway API updates** and deprecations