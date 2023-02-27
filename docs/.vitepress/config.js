import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/blog/',
  lang:'zh',
  title: 'dgex',
  description: '前端工程师',
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "logo.svg" }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '⭐ 关于',
        link: '/about/' 
        // items: [
        //   { text: '👤 作者', link: '/about/' },
        //   { text: '🌈 我的项目', link: '/about/project' },
        // ]
      }
    ],
    sidebar: [
      {
        text: '⭐ 关于',
        items: [
          { text: '👤 作者', link: '/about/' },
          { text: '🌈 我的项目', link: '/about/project' },
        ]
      }
    ],
    footer: {
      copyright: 'Copyright © 2023-present <a href="https://github.com/lidexun">dgex</a>'
    }
  }
})
