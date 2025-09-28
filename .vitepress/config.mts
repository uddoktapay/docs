import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "UddoktaPay",
    description: "Simplify Your Payment Management",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/assets/images/logo.png',
        siteTitle: false,
        nav: [
            { text: 'Home', link: 'https://uddoktapay.com' },
            { text: 'Client Area', link: 'https://my.uddoktapay.com' }
        ],

        sidebar: [
            {
                text: 'Guide',
                collapsed: false,
                items: [
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'System Requirements', link: '/guide/system-requirements' },
                    { text: 'Installation', link: '/guide/installation' },
                ]
            },
            {
                text: 'Payments',
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/payments/overview' },
                    { text: 'Actions', link: '/payments/actions' },
                    { text: 'Best Practices', link: '/payments/best-practices' },
                ]
            },
            {
                text: 'Gateways',
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/gateways/overview' },
                    { text: 'Reorder', link: '/gateways/reorder' },
                    { text: 'Create Automatic Gateway', link: '/gateways/create' },
                    { text: 'Create Bank Gateway', link: '/gateways/create-bank' },
                    { text: 'User Input Fields', link: '/gateways/user-input-fields' },
                    { text: 'Best Practices', link: '/gateways/best-practices' }
                ]
            },
            {
                text: 'Gateway Guides',
                collapsed: true,
                items: [
                    { text: 'PayPal', link: '/gateways/guides/paypal' },
                    { text: 'Stripe', link: '/gateways/guides/stripe' },
                    { text: 'Paddle', link: '/gateways/guides/paddle' },
                ]
            },
            {
                text: 'Customers',
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/customers/overview' },
                    { text: 'Create & Edit', link: '/customers/create-edit' },
                    { text: 'Import & Export', link: '/customers/import-export' },
                    { text: 'Best Practices', link: '/customers/best-practices' },
                ]
            },
            {
                "text": "Invoices",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/invoices/overview" },
                    { "text": "Create", "link": "/invoices/create" },
                    { "text": "Actions", "link": "/invoices/actions" },
                    { "text": "Best Practices", "link": "/invoices/best-practices" }
                ]
            },
            {
                "text": "Payment Link",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/payment-links/overview" },
                    { "text": "Create a payment link", "link": "/payment-links/create" },
                    { "text": "Default link", "link": "/payment-links/default-link" },
                    { "text": "User input fields", "link": "/payment-links/user-input-fields" },
                    { "text": "Expiry & status", "link": "/payment-links/expiry-status" },
                    { "text": "Best Practices", "link": "/payment-links/best-practices" }
                ]
            },
            {
                "text": "Reports",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/reports/overview" },
                    { "text": "Date ranges", "link": "/reports/date-ranges" },
                    { "text": "Metrics", "link": "/reports/metrics" },
                    { "text": "Best practices", "link": "/reports/best-practices" }
                ]
            },
            {
                "text": "SMS Data",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/sms-data/overview" },
                    { "text": "Automatic entry", "link": "/sms-data/automatic" },
                    { "text": "Manual entry", "link": "/sms-data/manual" },
                    { "text": "Best practices", "link": "/sms-data/best-practices" }
                ]
            },
            {
                "text": "Devices",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/devices/overview" },
                    { "text": "Device list", "link": "/devices/list" },
                    { "text": "Connect device", "link": "/devices/connect" },
                    { "text": "Balance verification", "link": "/devices/balance-verification" },
                    { "text": "Best practices", "link": "/devices/best-practices" }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/uddoktapay' },
            { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
        ]
    }
})
