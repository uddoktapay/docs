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
                    { text: 'What is UddoktaPay?', link: '/guide/what-is-uddoktapay' },
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
                    { text: 'List', link: '/payments/list' },
                    { text: 'View Payment', link: '/payments/view' },
                    { text: 'Actions', link: '/payments/actions' },
                    { text: 'Best Practices', link: '/payments/best-practices' },
                ]
            },
            {
                text: 'Gateways',
                collapsed: true,
                items: [
                    { text: 'Overview', link: '/gateways/overview' },
                    { text: 'List', link: '/gateways/list' },
                    { text: 'Reorder', link: '/gateways/reorder' },
                    { text: 'Create (Automatic / API, MFS)', link: '/gateways/create' },
                    { text: 'Create (Manual Bank)', link: '/gateways/create-bank' },
                    { text: 'User Input Fields', link: '/gateways/user-input-fields' },
                    { text: 'Edit & Configure', link: '/gateways/edit' },
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
                    { text: 'bKash', link: '/gateways/guides/bkash' },
                    { text: 'bKash API (Checkout)', link: '/gateways/guides/bkash-checkout' },
                    { text: 'bKash API (Tokenized)', link: '/gateways/guides/bkash-tokenized' },
                    { text: 'Nagad', link: '/gateways/guides/nagad' },
                    { text: 'Nagad API', link: '/gateways/guides/nagad-api' },
                    { text: 'Rocket', link: '/gateways/guides/rocket' },
                    { text: 'EPS (Easy Payment System)', link: '/gateways/guides/eps' },
                    { text: 'Bank Gateways (Manual)', link: '/gateways/guides/bank' }
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/uddoktapay' },
            { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
        ]
    }
})
