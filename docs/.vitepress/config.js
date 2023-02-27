import { defineConfig } from 'vitepress'

export default defineConfig({
  lang:'zh',
  title: 'dgex',
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
