---
title: Custom Notification
---

# Custom Notifications

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Module Structure](#module-structure)
- [Creating A Notification Provider](#creating-a-notification-provider)
- [Configuration Form](#configuration-form)
- [Handling Notifications](#handling-notifications)
- [Payment Data Available](#payment-data-available)
- [Notification Events](#notification-events)
- [Helper Methods](#helper-methods)
- [Testing Your Notification Provider](#testing-your-notification-provider)
- [Troubleshooting](#troubleshooting)

## Introduction

Custom notification providers let you integrate any notification service into UddoktaPay. They extend the `AbstractNotificationProvider` class and appear alongside built-in notification channels in the admin panel.

**Common use cases:**
- Send payment alerts to Slack, Discord, or Telegram
- Post webhooks to external monitoring systems
- Notify CRM systems of new customers or transactions
- Send custom alerts to team communication platforms
- Integrate with third-party analytics or reporting tools

## Prerequisites

Before creating a custom notification provider, you should be familiar with:

- **Laravel HTTP Client** - Used for API requests ([Documentation](https://laravel.com/docs/http-client))
- Basic PHP OOP concepts
- RESTful API integration
- Understanding of webhook delivery patterns

## Module Structure

Place your notification provider in the correct directory for auto-discovery:

```
app/
└── Modules/
    └── Notifications/
        └── YourProvider/
            └── YourProvider.php
```

**Your namespace must match the directory:**

```php
namespace App\Modules\Notifications\YourProvider;
```

::: warning Naming Convention
- Directory name should be PascalCase (e.g., `SlackNotifier`, `DiscordWebhook`)
- Class name must match the directory name
- Namespace must match directory path
:::

## Creating A Notification Provider

Every notification provider extends `AbstractNotificationProvider` and implements required methods.

**Basic structure:**

```php
<?php

declare(strict_types=1);

namespace App\Modules\Notifications\Webhook;

use Illuminate\Support\Facades\Http;
use Revoltify\Notificationify\AbstractNotificationProvider;
use Revoltify\Notificationify\Contracts\NotificationChannelInterface;
use Revoltify\Notificationify\Contracts\NotificationInterface;
use Revoltify\Support\Forms\Components\Field;
use Revoltify\Support\Forms\Form;

class Webhook extends AbstractNotificationProvider
{
    // Define configuration fields
    public function form(): Form
    {
        return Form::make([
            Field::make('webhook_url')
                ->text()
                ->label('Webhook URL')
                ->placeholder('https://example.com/webhook')
                ->helperText('The URL where notifications will be sent')
                ->required()
                ->url(),
        ]);
    }

    // Handle notification delivery
    public function handle(
        NotificationChannelInterface $notifiable,
        NotificationInterface $notification
    ): void {
        $url = $this->config('webhook_url');
        $payload = $notification->toArray($notifiable);
        
        Http::timeout(30)->asJson()->post($url, $payload);
    }
}
```

## Configuration Form

Define what settings admins need to configure:

```php
public function form(): Form
{
    return Form::make([
        // Webhook URL
        Field::make('webhook_url')
            ->text()
            ->label('Webhook URL')
            ->placeholder('https://your-app.com/webhook')
            ->helperText('The endpoint where notifications will be sent')
            ->required()
            ->url(),

        // API Token
        Field::make('api_token')
            ->password()
            ->label('API Token')
            ->placeholder('Enter your API token')
            ->revealable()  // Show/hide toggle
            ->required(),

        // Environment Selection
        Field::make('environment')
            ->select([
                'production' => 'Production',
                'staging' => 'Staging',
                'development' => 'Development',
            ])
            ->default('production')
            ->label('Environment'),

        // Minimum Amount Filter
        Field::make('minimum_amount')
            ->number()
            ->label('Minimum Amount')
            ->helperText('Only notify for payments above this amount')
            ->min(0)
            ->suffix('USD'),

        // Custom Headers (JSON)
        Field::make('custom_headers')
            ->textarea(rows: 3)
            ->label('Custom Headers')
            ->placeholder('{"X-Custom-Header": "value"}')
            ->helperText('JSON object of custom headers to include')
            ->columnSpanFull(),
    ]);
}
```

### Common Field Types

**Text input:**
```php
Field::make('channel_id')
    ->text()
    ->placeholder('#general or C1234567890')
    ->maxLength(100)
```

**Password with reveal:**
```php
Field::make('secret_key')
    ->password()
    ->revealable()
    ->required()
```

**Dropdown:**
```php
Field::make('priority')
    ->select([
        'high' => 'High Priority',
        'normal' => 'Normal',
        'low' => 'Low Priority',
    ])
    ->default('normal')
```

**Number:**
```php
Field::make('timeout')
    ->number()
    ->min(5)
    ->max(60)
    ->suffix('seconds')
    ->default(30)
```

**Toggle switch:**
```php
Field::make('enabled')
    ->toggle()
    ->default(true)
```

**Textarea:**
```php
Field::make('message_template')
    ->textarea(rows: 4)
    ->columnSpanFull()
```

**Conditional fields:**
```php
Field::make('sandbox_token')
    ->visibleWhen('environment', 'staging')  // Show only when staging selected
```

## Handling Notifications

Process notification delivery when events occur:

::: tip Laravel HTTP Client
This section uses Laravel's HTTP client for API requests. Learn more: [Laravel HTTP Client Documentation](https://laravel.com/docs/http-client)
:::

```php
use Illuminate\Support\Facades\Http;

public function handle(
    NotificationChannelInterface $notifiable,
    NotificationInterface $notification
): void {
    try {
        // Get configuration
        $webhookUrl = $this->config('webhook_url');
        $apiToken = $this->config('api_token');

        // Prepare payload
        $payload = $notification->toArray($notifiable);

        // Send notification with authentication
        $response = Http::timeout(30)
            ->retry(3, 100)  // Retry 3 times with 100ms delay
            ->withHeaders([
                'Authorization' => "Bearer {$apiToken}",
                'Content-Type' => 'application/json',
            ])
            ->post($webhookUrl, $payload);

        // Handle response
        if ($response->failed()) {
            logger()->warning('Notification delivery failed', [
                'status' => $response->status(),
                'response' => $response->body(),
            ]);
        }

    } catch (\Exception $e) {
        // Log error but don't break payment flow
        logger()->error('Notification error', [
            'provider' => static::class,
            'error' => $e->getMessage(),
        ]);
    }
}
```

### Custom Payload Construction

Build custom payloads for specific services:

```php
public function handle(
    NotificationChannelInterface $notifiable,
    NotificationInterface $notification
): void {
    $payment = $notification->getPayment();
    
    // Build custom payload
    $customPayload = [
        'event_type' => $notification->getEventKey(),
        'timestamp' => now()->toIso8601String(),
        'payment' => [
            'id' => $payment->paymentableReferenceId(),
            'amount' => $payment->paymentableAmount(),
            'currency' => $payment->gatewayCurrency(),
            'gateway_transaction_id' => $payment->paymentableGatewayTransactionId(),
            'gateway_reference_id' => $payment->paymentableGatewayReferenceId(),
        ],
        'customer' => [
            'name' => $payment->paymentableCustomerName(),
            'email' => $payment->paymentableCustomerEmail(),
            'phone' => $payment->paymentableCustomerPhone(),
        ],
        'urls' => [
            'view_payment' => $notification->getPaymentUrl(),
            'success' => $payment->paymentableSuccessUrl(),
            'cancel' => $payment->paymentableCancelUrl(),
        ],
    ];

    Http::timeout(30)
        ->asJson()
        ->post($this->config('webhook_url'), $customPayload);
}
```

## Payment Data Available

Notifications provide access to comprehensive payment information through the `Paymentable` interface.

### Notification Methods

```php
// Get event identifier
$eventKey = $notification->getEventKey();
// Returns: 'payment.completed', 'payment.pending', etc.

// Get payment model
$payment = $notification->getPayment();

// Get complete notification data
$data = $notification->toArray($notifiable);

// Get payment view URL
$url = $notification->getPaymentUrl();
$absoluteUrl = $notification->getPaymentUrl(isAbsolute: true);
```

### Payment Reference Information

```php
// Get unique payment reference ID
$referenceId = $payment->paymentableReferenceId();
// Example: '1', '2', '12345'

// Get gateway's reference ID for this payment
$gatewayRef = $payment->paymentableGatewayReferenceId();
// Example: 'trxn_abc123', 'ref_456xyz'

// Get gateway's transaction ID
$transactionId = $payment->paymentableGatewayTransactionId();
// Example: 'txn_789abc', 'gw_trx_123456'
```

### Payment Amount

```php
// Get payment amount
$amount = $payment->paymentableAmount();
// Returns: '100.50', '250.00'

// Get gateway currency
$currency = $payment->gatewayCurrency();
// Returns: 'USD', 'EUR', 'BDT'
```

### Customer Information

```php
// Get customer name
$customerName = $payment->paymentableCustomerName();
// Example: 'John Doe'

// Get customer email
$customerEmail = $payment->paymentableCustomerEmail();
// Example: 'john@example.com'

// Get customer phone
$customerPhone = $payment->paymentableCustomerPhone();
// Example: '+1234567890'
```

### Product Information

```php
// Get product name
$productName = $payment->paymentableProductName();
// Example: 'Premium Subscription'
```

### Callback URLs

```php
// Get success redirect URL
$successUrl = $payment->paymentableSuccessUrl();

// Get cancel redirect URL
$cancelUrl = $payment->paymentableCancelUrl();

// Get IPN/webhook URL (if configured)
$ipnUrl = $payment->paymentableIPNUrl();
```

### Example Notification Data Structure

The `toArray()` method returns a complete payload:

```php
[
    'event' => 'payment.completed',
    'data' => [
        'payment_id' => 12345,
        'customer_name' => 'John Doe',
        'customer_email' => 'john@example.com',
        'amount' => 100.00,
        'currency' => 'USD',
        'transaction_id' => 'TXN123456',
        'gateway_name' => 'Stripe',
        'action_url' => 'https://yoursite.com/admin/payments/12345',
        'created_at' => '2025-10-08T10:30:00.000000Z',
    ],
]
```

## Notification Events

Common notification events that trigger notifications:

| Event Key | Description | When Triggered |
|-----------|-------------|----------------|
| `payment.completed` | Payment successfully completed | After payment verification and completion |
| `payment.pending` | Payment pending verification | Payment initiated but not yet confirmed |

**Accessing event type:**
```php
$eventKey = $notification->getEventKey();

if ($eventKey === 'payment.completed') {
    // Handle completed payment notification
}
```

## Helper Methods

### Get Configuration

```php
// Get config value
$webhookUrl = $this->config('webhook_url');

// Get with default value
$timeout = $this->config('timeout', 30);

// Check if config exists
if ($this->config('api_token')) {
    // Config exists
}
```

### Build Custom Messages

```php
public function handle(
    NotificationChannelInterface $notifiable,
    NotificationInterface $notification
): void {
    $payment = $notification->getPayment();
    
    // Build formatted message
    $message = sprintf(
        "Payment of %s %s received from %s\nTransaction ID: %s\nGateway: %s",
        $payment->gatewayCurrency(),
        number_format((float) $payment->paymentableAmount(), 2),
        $payment->paymentableCustomerName(),
        $payment->paymentableGatewayTransactionId(),
        $payment->gateway->name ?? 'N/A'
    );
    
    // Send message
    Http::post($this->config('webhook_url'), ['text' => $message]);
}
```

## Testing Your Notification Provider

### Handle Errors Gracefully

```php
try {
    $response = Http::timeout(30)
        ->retry(3, 100)  // Retry 3 times with 100ms delay
        ->asJson()
        ->post($url, $data);
    
    if ($response->failed()) {
        logger()->warning('Notification delivery failed', [
            'status' => $response->status(),
            'response' => $response->body(),
        ]);
    }
    
} catch (\Illuminate\Http\Client\ConnectionException $e) {
    logger()->error('Connection failed', [
        'url' => $url,
        'error' => $e->getMessage(),
    ]);
    
} catch (\Exception $e) {
    logger()->error('Notification error', [
        'provider' => static::class,
        'error' => $e->getMessage(),
    ]);
}
```

## Troubleshooting

### Common Issues

**Provider not appearing in admin:**
- Check namespace matches directory structure
- Verify class name matches directory name

**Notifications not being sent:**
- Verify provider is enabled in admin panel
- Check configuration values are correct
- Review application logs for errors