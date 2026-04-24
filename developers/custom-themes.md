---
title: Custom Theme Development
---

# Custom Theme Development

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Directory Structure](#directory-structure)
- [Theme Configuration Class](#theme-configuration-class)
- [Loading Assets](#loading-assets)
- [Template Views](#template-views)
- [Available View Data](#available-view-data)
- [Blade Components](#blade-components)
- [Troubleshooting](#troubleshooting)

## Introduction

Custom themes allow you to build fully customised checkout experiences for UddoktaPay. Each theme consists of a configuration class and optional Blade views.

**What you can customise:**
- Checkout page layout and design
- Gateway payment pages (MFS, Bank, Binance, etc.)
- Success, pending, and cancel result pages
- Payment link and liquid checkout pages
- Colors, typography, and CSS/JS injection via the admin panel

## Prerequisites

- **Laravel Blade** templating ([Documentation](https://laravel.com/docs/blade))
- Basic PHP OOP
- HTML, CSS, and JavaScript

## Directory Structure

```
themes/
└── MyTheme/
    ├── Config.php
    └── views/
        ├── layouts/
        │   └── app.blade.php
        ├── checkout/
        │   ├── checkout.blade.php
        │   ├── success.blade.php
        │   ├── pending.blade.php
        │   ├── cancel.blade.php
        │   ├── paymentlink.blade.php
        │   ├── default-paymentlink.blade.php
        │   └── liquid.blade.php
        ├── gateways/
        │   ├── mfs.blade.php
        │   ├── bank.blade.php
        │   └── binance.blade.php
        └── components/
            └── fields/
                ├── text.blade.php
                ├── select.blade.php
                ├── textarea.blade.php
                ├── checkbox.blade.php
                ├── radio.blade.php
                └── file.blade.php

public/
└── themes/
    └── mytheme/
        └── assets/
            ├── thumbnail.png
            ├── css/
            ├── js/
            └── images/
```

> [!WARNING]
> **Naming Convention**
> - `themes/` directory must be **PascalCase** (e.g., `MyTheme`)
> - `public/themes/` directory must be **lowercase** (e.g., `mytheme`)
> - `Config.php` namespace must be `Themes\\{ThemeName}\\Config`

> [!TIP]
> - `themes/MyTheme/` — only `Config.php` is required; all views are optional
> - `public/themes/mytheme/` — all publicly accessible static files, served via `theme_asset()`
> - `components/fields/` — only create the field type files you want to override; missing types fall back to the default theme automatically

## Theme Configuration Class

`Config.php` is the **only required file** for a theme. It registers the theme and exposes its admin settings form.

Create `themes/MyTheme/Config.php`:

```php
<?php

declare(strict_types=1);

namespace Themes\MyTheme;

use Revoltify\Support\Forms\Components\Field;
use Revoltify\Support\Forms\Form;
use Revoltify\Themeify\AbstractTheme;

final class Config extends AbstractTheme
{
    public function name(): string
    {
        return 'My Theme';
    }

    public function description(): string
    {
        return 'A custom theme for UddoktaPay';
    }

    public function version(): string
    {
        return '1.0.0';
    }

    public function author(): string
    {
        return 'Your Name';
    }

    public function authorUrl(): string
    {
        return 'https://yourwebsite.com';
    }

    /**
     * Path relative to public/themes/{themeslug}/ — shown as the thumbnail in the admin panel.
     */
    public function logo(): string
    {
        return 'assets/thumbnail.png';
    }

    public function form(): Form
    {
        return Form::make([
            Field::make('primary_color')
                ->color()
                ->label('Primary Color'),

            Field::make('button_text_color')
                ->color()
                ->label('Button Text Color'),

            Field::make('custom_css')
                ->codeEditor()
                ->language('css')
                ->label('Custom CSS')
                ->columnSpanFull(),

            Field::make('custom_js')
                ->codeEditor()
                ->language('javascript')
                ->label('Custom JS')
                ->columnSpanFull(),
        ]);
    }
}
```

### Available Field Types

| Method | Description |
|--------|-------------|
| `->text()` | Single-line text input |
| `->password()->revealable()` | Password with show/hide toggle |
| `->number()` | Numeric input |
| `->color()` | Color picker |
| `->select([...])` | Dropdown |
| `->toggle()->default(true)` | Toggle switch |
| `->textarea(rows: 4)` | Multi-line textarea |
| `->codeEditor()->language('css')` | Code editor (`css` / `javascript`) |
| `->columnSpanFull()` | Span the full grid width |
| `->required()` | Mark as required |
| `->helperText('...')` | Help text below the field |
| `->collapsible()` / `->collapsed()` | Collapsible section |
| `->visibleWhen('field', 'value')` | Conditional visibility |

## Loading Assets

Place all public files under `public/themes/{themeslug}/`. These files are served directly by the web server and are not processed through any bundler.

### `theme_asset()`

Use the `theme_asset()` helper to generate URLs to your theme's public files:

```blade
<link rel="stylesheet" href="{{ theme_asset('assets/css/app.css') }}" />
<script src="{{ theme_asset('assets/js/app.js') }}"></script>
<img src="{{ theme_asset('assets/images/logo.png') }}" />
```

### Global Helper Functions

These helpers are available in all theme views:

| Helper | Returns | Description |
|--------|---------|-------------|
| `app_name()` | `string` | Site name from brand settings |
| `app_logo()` | `string` | URL to the site logo |
| `app_round_logo()` | `string` | URL to the round/icon logo |
| `app_favicon()` | `string` | URL to the site favicon |
| `theme_asset($path)` | `string` | URL to a file in `public/themes/{themeslug}/` |

## Template Views

Every view automatically receives the following shared variables:

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page `<title>` |
| `$brandSettings` | `object` | Brand configuration |
| `$themeSettings` | `object` | Values saved from your `Config::form()` fields |

**Brand settings:**

```blade
{{ $brandSettings->site_name }}
{{ $brandSettings->seo_description }}
{{ $brandSettings->seo_keywords }}
{{ $brandSettings->google_tag_manager_id }}
{{ $brandSettings->fb_og_image }}
{{ $brandSettings->support_number }}
{{ $brandSettings->messenger_link }}
{{ $brandSettings->whatsapp_number }}
{{ $brandSettings->email_address }}
{{ $brandSettings->telegram_link }}
{{ $brandSettings->support_link }}
```

### Layout

A shared master layout at `views/layouts/app.blade.php` is recommended but not required — each view can be a fully standalone HTML page. Use any CSS framework or JS library you prefer.

**Standard form submission:**

When a form is submitted, UddoktaPay returns validation and system error messages via Laravel's `$errors` collection. You must include logic to display these alerts either in your master layout (`layouts/app.blade.php`) or directly in each view.

Here are two examples of how to render them.

**Example 1: Using Toastr**
If your theme includes jQuery and Toastr, you can render notifications as toast alerts:

```blade
@if (isset($errors) && $errors->any())
    <script type="module">
        @foreach ($errors->unique() as $error)
            toastr.error("{{ __($error) }}");
        @endforeach
    </script>
@endif
```

**Example 2: Standard HTML Alerts**
You can write your own logic to render standard HTML `<div>` alerts instead:

```blade
@if (isset($errors) && $errors->any())
    <div class="alert alert-error">
        <ul>
            @foreach ($errors->unique() as $error)
                <li>{{ __($error) }}</li>
            @endforeach
        </ul>
    </div>
@endif
```

> [!NOTE]
> `$errors` is always available via Laravel's session, just check for it and render accordingly.

> [!WARNING]
> All forms that POST to UddoktaPay **must include `@csrf`**. Omitting it will result in a `419 Page Expired` error. This applies to every form in every view.

## Available View Data

All data is passed as flat scalar variables — no Eloquent model instances are exposed to views.

### Checkout Page (`checkout/checkout.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$customerName` | `string` | Customer full name |
| `$customerEmail` | `string` | Customer email address |
| `$customerPhone` | `string` | Customer phone number |
| `$amount` | `string` | Raw payment amount |
| `$amountFormatted` | `string` | Formatted amount with currency (e.g. `100.00 USD`) |
| `$currency` | `string` | Currency code |
| `$cancelUrl` | `string` | Cancel redirect URL |
| `$gateways` | `Collection` | All gateways |
| `$mfsGateways` | `Collection` | Mobile banking gateways |
| `$globalGateways` | `Collection` | Global/international gateways |
| `$bankGateways` | `Collection` | Bank transfer gateways |
| `$faqs` | `Collection` | FAQ entries |
| `$hasMfs` | `bool` | Whether MFS gateways exist |
| `$hasGlobal` | `bool` | Whether global gateways exist |
| `$hasBank` | `bool` | Whether bank gateways exist |
| `$isSingleCategory` | `bool` | True when only one category has gateways |

**Gateway item:**

```blade
@foreach ($gateways as $gateway)
    {{ $gateway->code }}        {{-- e.g. 'bkash_personal' --}}
    {{ $gateway->displayName }} {{-- e.g. 'bKash Personal' --}}
    {{ $gateway->logo }}        {{-- Full URL to gateway logo --}}
    {{ $gateway->url }}         {{-- Checkout initiation URL --}}
@endforeach
```

**FAQ item:**

```blade
@foreach ($faqs as $faq)
    {{ $faq->title }}
    {!! $faq->content !!}
@endforeach
```

**Rendering example:**

```blade
<h1>{{ $amountFormatted }}</h1>
<p>{{ $customerName }} &mdash; {{ $customerEmail }}</p>

@if ($hasMfs)
    <h2>Mobile Banking</h2>
    @foreach ($mfsGateways as $gateway)
        <a href="{{ $gateway->url }}">
            <img src="{{ $gateway->logo }}" alt="{{ $gateway->displayName }}" />
            {{ $gateway->displayName }}
        </a>
    @endforeach
@endif

@if ($hasGlobal)
    <h2>International</h2>
    @foreach ($globalGateways as $gateway)
        <a href="{{ $gateway->url }}">
            <img src="{{ $gateway->logo }}" alt="{{ $gateway->displayName }}" />
            {{ $gateway->displayName }}
        </a>
    @endforeach
@endif

@if ($hasBank)
    <h2>Bank Transfer</h2>
    @foreach ($bankGateways as $gateway)
        <a href="{{ $gateway->url }}">
            <img src="{{ $gateway->logo }}" alt="{{ $gateway->displayName }}" />
            {{ $gateway->displayName }}
        </a>
    @endforeach
@endif

@if ($faqs->isNotEmpty())
    <section>
        @foreach ($faqs as $faq)
            <details>
                <summary>{{ $faq->title }}</summary>
                {!! $faq->content !!}
            </details>
        @endforeach
    </section>
@endif
```

### MFS Gateway Page (`gateways/mfs.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$gatewayName` | `string` | Gateway display name (e.g. `bKash`) |
| `$gatewayLogo` | `string` | Full URL to gateway logo |
| `$gatewayDescription` | `string\|null` | Optional description |
| `$accountType` | `string` | Account type (e.g. `Personal`, `Agent`) |
| `$accountNumber` | `string` | Payment account number |
| `$hasQR` | `bool` | Whether a QR code is available |
| `$qrCode` | `string\|null` | Full URL to QR code image |
| `$pendingPaymentEnabled` | `bool` | Whether pending payment is allowed |
| `$numberInputEnabled` | `bool` | Whether sender phone input is shown |
| `$amount` | `string` | Raw amount |
| `$amountFormatted` | `string` | Formatted amount |
| `$mfsAmount` | `float` | MFS-formatted amount |
| `$currency` | `string` | Currency code |
| `$hasDiscount` | `bool` | Whether a discount applies |
| `$discount` | `string` | Raw discount |
| `$discountFormatted` | `string` | Formatted discount |
| `$hasFee` | `bool` | Whether a fee applies |
| `$fee` | `string` | Raw fee |
| `$feeFormatted` | `string` | Formatted fee |
| `$percentCharge` | `string` | Percent-based charge |
| `$fixedCharge` | `string` | Fixed charge |
| `$totalCharge` | `string` | Total charge |
| `$percentDiscount` | `string` | Percent-based discount |
| `$fixedDiscount` | `string` | Fixed discount |
| `$totalDiscount` | `string` | Total discount |
| `$gatewayHomeUrl` | `string` | Back to gateway selection URL |
| `$formActionUrl` | `string` | Form POST URL |
| `$gatewayCancelUrl` | `string` | Cancel URL |
| `$locale` | `string` | Current app locale |

**Required form:**

```blade
<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <input type="text" name="transaction_id" required />

    @if ($numberInputEnabled)
        <input type="text" name="phone_number" />
    @endif

    <button type="submit">Verify</button>
</form>
```

> [!TIP]
> Use `$hasQR` and `$qrCode` to optionally display a QR code image alongside the account number. Use `$hasDiscount` and `$hasFee` guards before rendering discount/fee values to avoid showing empty rows.

**Rendering example:**

```blade
<img src="{{ $gatewayLogo }}" alt="{{ $gatewayName }}" />
<h2>{{ $gatewayName }} — {{ $accountType }}</h2>
<p>Send <strong>{{ $mfsAmount }}</strong> {{ $currency }} to:</p>
<p>{{ $accountNumber }}</p>

@if ($hasQR && $qrCode)
    <img src="{{ $qrCode }}" alt="QR Code" />
@endif

@if ($gatewayDescription)
    <p>{{ $gatewayDescription }}</p>
@endif

@if ($hasDiscount)
    <p>Discount: {{ $discountFormatted }}</p>
@endif

@if ($hasFee)
    <p>Fee: {{ $feeFormatted }}</p>
@endif

<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <input type="text" name="transaction_id" placeholder="Transaction ID" required />

    @if ($numberInputEnabled)
        <input type="text" name="phone_number" placeholder="Your phone number" />
    @endif

    <button type="submit">Verify Payment</button>
</form>

<a href="{{ $gatewayHomeUrl }}">← Back</a>
<a href="{{ $gatewayCancelUrl }}">Cancel</a>
```

### Bank Gateway Page (`gateways/bank.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$gatewayLogo` | `string` | Full URL to gateway logo |
| `$gatewayDescription` | `string\|null` | Optional description (may contain HTML) |
| `$amount` | `string` | Raw amount |
| `$amountFormatted` | `string` | Formatted amount |
| `$currency` | `string` | Currency code |
| `$hasDiscount` | `bool` | Whether a discount applies |
| `$discountFormatted` | `string` | Formatted discount |
| `$hasFee` | `bool` | Whether a fee applies |
| `$feeFormatted` | `string` | Formatted fee |
| `$parameters` | `Collection` | Bank account details (key → value) |
| `$bankFormFields` | `Collection` | Dynamic form fields |
| `$gatewayHomeUrl` | `string` | Back to gateway selection URL |
| `$formActionUrl` | `string` | Form POST URL |
| `$gatewayCancelUrl` | `string` | Cancel URL |

**Bank parameters:**

```blade
@foreach ($parameters as $key => $value)
    <span>{{ key_to_word($key) }}</span>
    <span>{{ $value }}</span>
@endforeach
```

**Dynamic form fields:**

See [Dynamic Form Fields](#dynamic-form-fields) for details on styling and rendering these fields.

```blade
<x-forms.bank :fields="$bankFormFields" />
```

**Rendering example:**

```blade
<img src="{{ $gatewayLogo }}" alt="Bank Transfer" />

@if ($gatewayDescription)
    <div>{!! $gatewayDescription !!}</div>
@endif

<ul>
    @foreach ($parameters as $key => $value)
        <li>
            <span>{{ key_to_word($key) }}</span>
            <span>{{ $value }}</span>
        </li>
    @endforeach
</ul>

<p>Amount: {{ $amountFormatted }}</p>

@if ($hasDiscount)
    <p>Discount: {{ $discountFormatted }}</p>
@endif

@if ($hasFee)
    <p>Fee: {{ $feeFormatted }}</p>
@endif

<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <x-forms.bank :fields="$bankFormFields" />
    <button type="submit">Submit</button>
</form>

<a href="{{ $gatewayHomeUrl }}">← Back</a>
<a href="{{ $gatewayCancelUrl }}">Cancel</a>
```

### Binance Gateway Page (`gateways/binance.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$gatewayLogo` | `string` | Gateway logo URL |
| `$config` | `array` | Gateway config array |
| `$amount` | `string` | Raw amount |
| `$amountFormatted` | `string` | Formatted amount |
| `$currency` | `string` | Currency (e.g. `USDT`) |
| `$hasDiscount` | `bool` | Whether a discount applies |
| `$discountFormatted` | `string` | Formatted discount |
| `$hasFee` | `bool` | Whether a fee applies |
| `$feeFormatted` | `string` | Formatted fee |
| `$gatewayHomeUrl` | `string` | Back URL |
| `$formActionUrl` | `string` | Form POST URL |
| `$gatewayCancelUrl` | `string` | Cancel URL |

**Required form:**

```blade
<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <input type="text" name="order_id" required />
    <button type="submit">Verify</button>
</form>
```

**Rendering example:**

```blade
<img src="{{ $gatewayLogo }}" alt="Binance Pay" />
<p>Send <strong>{{ $amountFormatted }}</strong> to Binance ID:</p>
<p>{{ $config['binance_id'] }}</p>
<p>You have {{ $config['payment_timeout'] }} minutes to complete this payment.</p>

@if ($hasDiscount)
    <p>Discount: {{ $discountFormatted }}</p>
@endif

@if ($hasFee)
    <p>Fee: {{ $feeFormatted }}</p>
@endif

<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <input type="text" name="order_id" placeholder="Binance Order ID" required />
    <button type="submit">Verify Payment</button>
</form>

<a href="{{ $gatewayHomeUrl }}">← Back</a>
<a href="{{ $gatewayCancelUrl }}">Cancel</a>
```

### Success Page (`checkout/success.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$gatewayName` | `string` | Gateway used |
| `$sender` | `string\|null` | Sender phone number |
| `$transactionId` | `string\|null` | Raw transaction ID |
| `$transactionIdFormatted` | `string\|null` | Truncated transaction ID (20 chars) |
| `$amount` | `string` | Raw amount |
| `$amountFormatted` | `string` | Formatted amount |
| `$currency` | `string` | Currency code |
| `$status` | `string` | Raw status |
| `$statusFormatted` | `string` | Human-readable status |
| `$isCompleted` | `bool` | Payment completed |
| `$isPending` | `bool` | Payment pending |
| `$isRefunded` | `bool` | Payment refunded |
| `$isFailed` | `bool` | Payment failed |
| `$isCanceled` | `bool` | Payment cancelled |

> [!TIP]
> Use the `$isCompleted`, `$isPending`, `$isFailed`, etc. booleans to conditionally render different UI states on a single success page rather than duplicating markup across multiple views.

**Rendering example:**

```blade
@if ($isCompleted)
    <p>Payment confirmed! Transaction: {{ $transactionIdFormatted }}</p>
@elseif ($isPending)
    <p>Your payment is pending review.</p>
@elseif ($isFailed)
    <p>Payment failed. Please try again.</p>
@elseif ($isRefunded)
    <p>Your payment has been refunded.</p>
@elseif ($isCanceled)
    <p>Payment was cancelled.</p>
@endif

<ul>
    <li>Gateway: {{ $gatewayName }}</li>
    <li>Amount: {{ $amountFormatted }}</li>
    <li>Status: {{ $statusFormatted }}</li>
    @if ($sender)
        <li>Phone: {{ $sender }}</li>
    @endif
</ul>
```

### Pending Page (`checkout/pending.blade.php`)

Receives the same variables as the success page.

**Rendering example:**

```blade
<h1>Payment Pending</h1>
<p>Your payment is under review. Please wait while we verify your transaction.</p>

<ul>
    <li>Gateway: {{ $gatewayName }}</li>
    <li>Amount: {{ $amountFormatted }}</li>
    @if ($transactionIdFormatted)
        <li>Transaction: {{ $transactionIdFormatted }}</li>
    @endif
    @if ($sender)
        <li>Phone: {{ $sender }}</li>
    @endif
</ul>
```

### Cancel Page (`checkout/cancel.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |

**Rendering example:**

```blade
<h1>Payment Cancelled</h1>
<p>Your payment was cancelled. No charges were made.</p>
```

### Payment Link Page (`checkout/paymentlink.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$currency` | `string` | Currency code |
| `$productName` | `string` | Product name |
| `$productDescription` | `string` | Product description |
| `$formActionUrl` | `string` | Form POST URL |
| `$formFields` | `Collection` | Dynamic custom fields |

**Dynamic form fields:**

See [Dynamic Form Fields](#dynamic-form-fields) for details on styling and rendering these fields.

```blade
<x-forms.paymentlink :fields="$formFields" />
```

**Rendering example:**

```blade
<h1>{{ $productName }}</h1>
<p>{{ $productDescription }}</p>
<p>Currency: {{ $currency }}</p>

<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <x-forms.paymentlink :fields="$formFields" />
    <button type="submit">Pay Now</button>
</form>
```

### Default Payment Link Page (`checkout/default-paymentlink.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$currency` | `string` | Currency code |
| `$formActionUrl` | `string` | Form POST URL |

**Required form:**

```blade
<form method="POST" action="{{ $formActionUrl }}" enctype="multipart/form-data">
    @csrf
    <input type="hidden" name="currency" value="{{ $currency }}" />
    <input type="text" name="name" required />
    <input type="text" name="email" required />
    <input type="text" name="phone" required />
    <input type="text" name="amount" required />
    <input type="text" name="reference" />
    <button type="submit">Submit</button>
</form>
```

### Liquid Checkout Page (`checkout/liquid.blade.php`)

| Variable | Type | Description |
|----------|------|-------------|
| `$pageTitle` | `string` | Page title |
| `$formActionUrl` | `string` | Form POST URL |

**Required form:**

```blade
<form method="POST" action="{{ $formActionUrl }}">
    @csrf
    <input type="text" name="name" required />
    <input type="text" name="email" required />
    <input type="text" name="phone" required />
    <input type="text" name="reseller_id" required />
    <input type="text" name="amount" required />
    <input type="text" name="reference" />
    <button type="submit">Submit</button>
</form>
```

## Dynamic Form Fields

When building the Bank Gateway (`gateways/bank.blade.php`) or Payment Link (`checkout/paymentlink.blade.php`) pages, use the provided components to render dynamic fields configured by the merchant:

```blade
{{-- Bank gateway form fields --}}
<x-forms.bank :fields="$bankFormFields" />

{{-- Payment link form fields --}}
<x-forms.paymentlink :fields="$formFields" />
```

These components iterate over the available fields and resolve each one by looking for `components/fields/{type}.blade.php` in your theme, where `type` matches `$data->type` (e.g., `text`, `select`, `textarea`, `checkbox`, `radio`, `file`). If a specific type view is not found in your theme, it falls back to the default theme automatically.

To customise the HTML markup or styling for a specific field type, create the corresponding view in your theme's `components/fields/` directory. Each view receives a `$data` object containing:

```blade
{{ $data->name }}        {{-- Label (e.g. "Account Number") --}}
{{ $data->key }}         {{-- Input name attribute (e.g. "account_number") --}}
{{ $data->is_required }} {{-- boolean --}}
{{ $data->options }}     {{-- array, for select/checkbox/radio options --}}
{{ $data->extensions }}  {{-- array, for file input allowed extensions --}}
```

> [!NOTE]
> You only need to create the field type files you want to customise. Any type missing from your theme automatically falls back to the default implementation — you never need to create all six types.

## Troubleshooting

**Theme not appearing in the admin panel:**
- Verify `themes/MyTheme/` is PascalCase and the namespace in `Config.php` is `Themes\{ExactDirName}\Config`
- Ensure all required methods are implemented: `name()`, `description()`, `version()`, `author()`, `form()`

**Thumbnail not showing:**
- Place the thumbnail at `public/themes/{themeslug}/assets/thumbnail.png`
- Ensure `logo()` returns the correct relative path

**Views not loading:**
- Confirm the theme is activated in **Themes**
- Ensure view files are inside `themes/MyTheme/views/`

**`theme_asset()` returning a 404:**
- Verify files exist under `public/themes/{themeslug}/`

**Settings not available in views:**
- Always provide fallback values: `$themeSettings->button_color ?? '#000'`