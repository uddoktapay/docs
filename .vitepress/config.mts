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
            { text: 'Payment Link', link: '/payment-links' },
            { text: 'Reports', link: '/reports' },
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
                "text": "MFS Automation",
                "collapsed": true,
                "items": [
                    { "text": "SMS Data", "link": "/sms-data" },
                    { "text": "Devices", "link": "/devices" },
                ]
            },
            {
                "text": "Administration",
                "collapsed": true,
                "items": [
                    { "text": "Brands", "link": "/administration/brands" },
                    { "text": "License", "link": "/administration/license" },
                    {
                        "text": "System Settings",
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
                    }
                ]
            },
            {
                text: 'Gateway Guides',
                collapsed: true,
                items: [
                    { text: 'PayPal', link: '/gateways/paypal' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/uddoktapay' },
            { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
        ]
    }
})
