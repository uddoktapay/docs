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
            { text: 'Getting Started', link: '/' },
            { text: 'System Requirements', link: '/system-requirements' },
            {
                text: 'Installation Guide',
                collapsed: false,
                items: [
                    { text: 'cPanel', link: '/installation/cpanel' },
                    { text: 'Hostinger', link: '/installation/hostinger' },
                    { text: 'CloudPanel', link: '/installation/cloudpanel' },
                    { text: 'aaPanel', link: '/installation/aapanel' },
                    { text: 'CyberPanel', link: '/installation/cyberpanel' },
                    { text: 'VPS (Ubuntu)', link: '/installation/vps' },
                    { text: 'Docker', link: '/installation/docker' },
                ]
            },
            { text: 'Payments', link: '/payments' },
            { text: 'Gateways', link: '/gateways' },
            { text: 'Customers', link: '/customers' },
            { text: 'Invoices', link: '/invoices' },
            { text: 'Payment Link', link: '/payment-links' },
            {
                "text": "Brand Settings",
                "collapsed": true,
                "items": [
                    { "text": "Overview", "link": "/brand-settings/overview" },
                    { "text": "General", "link": "/brand-settings/general" },
                    { "text": "Logo & Favicon", "link": "/brand-settings/logo" },
                    { "text": "API Settings", "link": "/brand-settings/api" },
                    { "text": "Mail Settings", "link": "/brand-settings/mail" },
                    { "text": "Notifications Channels", "link": "/brand-settings/notifications" },
                    { "text": "Themes", "link": "/brand-settings/themes" },
                    { "text": "Text File", "link": "/brand-settings/text-file" },
                    { "text": "FAQ", "link": "/brand-settings/faq" },
                    { "text": "SEO", "link": "/brand-settings/seo" }
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
                            { "text": "Overview", "link": "/system-settings/overview" },
                            { "text": "General", "link": "/system-settings/general" },
                            { "text": "Cron Job", "link": "/system-settings/cron-job" },
                            { "text": "Staff Management", "link": "/system-settings/staff-management" },
                            { "text": "Access Roles", "link": "/system-settings/access-roles" },
                            { "text": "Addons", "link": "/system-settings/addons" },
                            { "text": "System Update", "link": "/system-settings/system-update" }
                        ]
                    }
                ]
            },
            {
                text: 'Developer Guides',
                collapsed: true,
                items: [
                    { text: 'Custom Gateways', link: '/developers/custom-gateways' },
                    { text: 'Notification Channels', link: '/developers/notification-channels' },
                    { text: 'Custom Themes', link: '/developers/custom-themes' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/uddoktapay' },
            { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
        ]
    }
})
