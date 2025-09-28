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
        collapsed: false,
        items: [
          { text: 'Overview', link: '/payments/overview' },
          { text: 'List', link: '/payments/list' },
          { text: 'View Payment', link: '/payments/view' },
          { text: 'Actions', link: '/payments/actions' },
          { text: 'Best Practices', link: '/payments/best-practices' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uddoktapay' },
      { icon: 'facebook', link: 'https://facebook.com/uddoktapay' }
    ]
  }
})
