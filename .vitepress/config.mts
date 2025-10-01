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

        aside: false,

        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

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
            { text: 'Payments', link: '/payments' },
            { text: 'Gateways', link: '/gateways' },
            { text: 'Customers', link: '/customers' },
            { text: 'Invoices', link: '/invoices' },
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
                    { "text": "Connect device", "link": "/devices/connect" },
                    { "text": "Balance verification", "link": "/devices/balance-verification" },
                    { "text": "Best practices", "link": "/devices/best-practices" }
                ]
            },
            {
                "text": "Brand Settings",
                "collapsed": true,
                "items": [
                    { "text": "General", "link": "/brand-settings/general" },
                    { "text": "Logo & Favicon", "link": "/brand-settings/logo" },
                    { "text": "API Settings", "link": "/brand-settings/api" },
                    { "text": "Mail Settings", "link": "/brand-settings/mail" },
                    {
                        "text": "Notifications",
                        "collapsed": true,
                        "items": [
                            { "text": "Overview", "link": "/brand-settings/notifications/index.md" },
                            { "text": "Developer Guide", "link": "/brand-settings/notifications/developer-guide" },
                        ]
                    },
                    {
                        "text": "Themes",
                        "collapsed": true,
                        "items": [
                            { "text": "Overview", "link": "/brand-settings/themes/index.md" },
                            { "text": "Customization", "link": "/brand-settings/themes/customization" },
                            { "text": "Developer Guide", "link": "/brand-settings/themes/developer-guide" },
                        ]
                    },
                    { "text": "SEO", "link": "/brand-settings/seo" },
                    { "text": "FAQ", "link": "/brand-settings/faq" },
                    { "text": "Upload Text File", "link": "/brand-settings/text-file" }
                ]
            },
            {
                "text": "Administration",
                "collapsed": true,
                "items": [
                    { "text": "Brands", "link": "/administration/brands" },
                    { "text": "License", "link": "/administration/license" },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/uddoktapay' },
            { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
        ]
    }
})
