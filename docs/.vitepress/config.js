import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { readdirSync, statSync, readFileSync } from 'fs'
import matter from 'gray-matter'
let sidebar = {}
const path = resolve(__dirname, `../`)
const f = ['.DS_Store', '.vitepress', 'dome', 'index.md', 'public']
const list = readdirSync(path).filter(item => !f.includes(item))
list.forEach((key) => {
  const p = `${path}/${key}`
  const dir = readdirSync(p)
  let obj = {
    text: '',
    items: []
  }
  for (let i = 0; i < dir.length; i++) {
    const item = dir[i]
    const temp = readFileSync(`${p}/${item}`,{
      encoding: 'utf-8',
      flag: 'as+'
    })
    const { data } =  matter(temp)
    if (item === 'index.md') {
      obj.text = data.title || key
      obj.items.push({
        text: data.text || '导读',
        link: `/${key}/`,
        ctime: 0
      })
    } else {
      const fileName = item.replace(/\.md$/, '')
      const stat = statSync(p + '/' + item)
      obj.items.push({
        ...data,
        text: data.text || fileName,
        link:  `/${key}/${item.replace(/\.md$/, '.html')}`,
        ctime: Math.round(new Date(stat.ctime).valueOf() / 1000)
      })
    }
  }
  obj.items.sort((a,b) => a.ctime - b.ctime)
  sidebar[`${key}`] = [obj]
})

let config = defineConfig({
  base: '/blog/',
  lang: 'zh',
  title: 'dgex',
  description: '前端工程师',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }]],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '📖 文章',
        link: '/article/'
      },
      {
        text: '⭐ 关于',
        link: '/about/'
      }
    ],
    sidebar,
    footer: {
      copyright:
        'Copyright © 2023-present <a href="https://github.com/lidexun">dgex</a>'
    },
    outlineTitle: '这页有啥',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdatedText: '更新时间',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部'
  },
})

export default config
