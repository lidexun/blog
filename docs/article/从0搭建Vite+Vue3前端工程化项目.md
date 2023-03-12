---
outline: deep
---
# 从0到1搭建Vite+Vue3前端工程化项目
## 项目搭建
本项目使用 Vite 构建工具，Vite 需要 Node.js 版本 14.18+，16+
查看 Node.js 版本：
```sh
node -v
# v14.18.2
```
如果版本过低时用nvm将node.js 升级到最新的稳定版本
```sh
nvm install v14
# or
nvm use v14 
```
### 快速初始化项目雏形
使用 PNPM:
```sh
pnpm create vite
# or 
pnpm create vite vite-vue3-template -- --template vue-ts
# 安装依赖
pnpm install
# 启动项目
pnpm dev
```
接下来就需要集成Vue全家桶Vue Router+Pinia，UI库，规范，工程化一些库
```
├── build/                         // 构建相关
├── public/
└── src/
    ├── api/                       // 接口请求
    ├── assets/                    // 静态资源
    ├── components/                // 公共组件
    ├── router/                    // 路由配置
    ├── store/                     // 状态管理
    ├── style/                     // 通用CSS 
    ├── utils/                     // 工具函数
    ├── pages/                     // 路由页面
    ├── App.vue
    ├── main.ts
    ├── vite-env.d.ts
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```

## 集成 Vue Router
### 安装依赖
```sh
pnpm add vue-router
```
创建 `src/router/index.ts` 文件
```
 └── src/
     ├── router/
         ├── index.ts  // 路由配置文件
```
代码如下：
```js
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'logon',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```
### 挂载路由
`main.ts` 文件中挂载路由配置
```js
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```
## 集成 Pinia 全局状态管理工具
### 安装依赖
```sh
pnpm i pinia
```
### 创建仓库配置文件
```
└── src/
    ├── store/
    	├── modules/  // 仓库模块
        ├── index.js  // 仓库配置文件
```
```js
import { createPinia } from 'pinia';
// 模块化导入
import { useAppStore } from './modules/app';

const pinia = createPinia();

export { useAppStore }
export default pinia
```
拆分到不同的`modules`好处区分不同状态数据清晰/明确
### 挂载 Pinia 配置
```js
import { createApp } from 'vue'

import router from './router/index'
import store from './store/index'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
```
### 数据持久化之pinia-plugin-persistedstate
本质上是利用localStorage/sessionStorage将数据保存在本地,保证刷新/关闭页面后不会重置原有状态数据,[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)就是帮忙处理这一块

store/index.ts
```js
import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

export { useAppStore }
export default pinia
```
modules/app.ts
```js
import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: '',
  }),
  getters: {},
  actions: {
    toggleTheme(dark: boolean) {
      this.theme = dark ? 'dark' : 'light';
      document.documentElement.classList[dark ? 'add': 'remove']('dark');
    },
  },
  // 配置theme数据持久化
  persist: [
    {
      paths: ['theme'],
      key: 'theme',
      storage: localStorage,
    }
  ]
})
```
## 集成 Arco Design UI库
可以选择其他UI库element-plus,ant.design vue,等等
### 安装依赖
```sh
pnpm i @arco-design/web-vue
```
### 基础使用
```js
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```
### 按需引入
使用 unplugin-vue-components 和 unplugin-auto-import 来实现自动导入
```sh
pnpm i unplugin-vue-components unplugin-auto-import -D
```
按需加载（模板）
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ]
});
```
arco design[定制主题](https://arco.design/vue/docs/theme)
## 集成 HTTP 工具 Axios
```
pnpm i axios
```
### 配置 Axios
Axios 作为 HTTP 工具，我们在 utils 目录下创建 axios.ts 作为 Axios 配置文件：
```
└── src/
    ├── utils/
        ├── axios.ts  // Axios 配置文件
```
```js
import axios from 'axios'
import { Message } from '@arco-design/web-vue';
const baseURL = import.meta.env.VITE_API_URL

// 创建请求实例
const instance = axios.create({
  baseURL,
  // 请求超时 20s
  timeout: 20 * 1000
})
// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (response) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     * const token = localstorage.getItem(token) or ###
     * if (token) {
     *  config.headers.token = token
     * }
     */
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      Message.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      Message.error(`${error}`)
    }
    return Promise.reject(error)
  },
);
export default instance
```
### 使用 Axios
需要统一规范管理API，目录下创建相关的api参考如下：
```sh
└── src/
    ├── api/         // 统一管理
        ├── user.ts  // 用户相关api
```
```js
import http from '@/utils/axios'
export function login(params) {
  return http.post('/login', params)
}
```
```html
<script setup lang="ts">
import { login } from '@/api/user'

login({
  username: '',
  code: ''
}).then(res => {
  console.log(res);
})
</script>
```
## 集成 CSS 预处理器 Less
本项目使用 CSS 预处理器 Less，直接安装为开发依赖即可。
<!-- Arco -->
Vite 内部已帮我们集成了相关的 [loader](https://cn.vitejs.dev/guide/features.html#css-pre-processors)，不需要额外配置。
### 安装依赖
```sh
pnpm i less -D
```
### 如何使用
<!-- 在 <style></style> 样式标签中引用 lang="less" 即可。 -->
```html
<style lang="less"></style>
```
CSS 命名规范推荐 BEM 命名规范[参考说明](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
样式穿透Vue3[文档说明](https://cn.vuejs.org/api/sfc-css-features.html)
<!-- 
至此，一个基于 TypsScript + Vite + Vue3 + Vue Router + Pinia + Axios + Less 的前端项目开发环境搭建完毕。 -->
## 一些配置上的简单优化
- Vue API自动导入
- Vue 路由自动生成
- Pinia数据持久化
### API自动导入 [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)
```sh
pnpm i unplugin-auto-import -D
```
在vite.config.ts配置
```js
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  base: './',
  plugins: [
    AutoImport({
      // auto-imports.d.ts
      dts: true,
      // 注册全局API
      imports: ['vue', 'vue-router', 'pinia']
    }),
  ]
  ...
)}
```
为了正确提示自动导入的 API 的类型 tsconfig.json需要
```js
{
  "include": [
    "./auto-imports.d.ts" // 加入这行
  ],
}
```
如何使用
```html
<script setup lang="ts">
// 不需要手动导入 import { ref } from 'vue'
const a = ref(1)
</script>

<template>
  <div>{{ a }}</div>
</template>
```
### 自动生成路由[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages#vue-1)
为什么需要自动生成路由
- 方便后期维护
- 减少手动导入
```sh
pnpm i vite-plugin-pages -D
```
添加配置：`vite.config.js`
```js
import Pages from 'vite-plugin-pages'

export default {
  plugins: [
    // ...
    Pages({
      importMode: 'async',
      // 路由风格nuxtjs
      routeStyle: 'nuxt',
      // 排除components下的路由
      exclude: ['**/components/*.vue']
    }),
  ],
}
```
默认情况下，页面是从目录中的src/pages生成
```js
import { createRouter } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  // ...
  routes,
})
// ts添加已下
// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />
```
关于[Route Data](https://github.com/hannoeru/vite-plugin-pages#sfc-custom-block-for-route-data)，提供已下方法生成
```js
// JSON/JSON5：
<route>
{
  name: "name-override",
  meta: {
    requiresAuth: false
  }
}
</route>
// YAML
<route lang="yaml">
name: name-override
meta:
  requiresAuth: true
</route>
```
## 代码规范ESLint与Prettier
- ESLint 运行代码前就可以发现一些语法错误和潜在bug，目标是保证团队代码的一致性和避免错误
- Prettier 代码格式化工具，用于检测代码中的格式问题，比如单行代码长度、tab长度、空格、逗号表达式

区别和联系: ESLint 偏向于把控项目的代码质量，而 Prettier 更偏向于统一项目的编码风格，ESLint有小部分的代码格式化功能，一般和Prettier结合使用
<!-- https://cn.vuejs.org/guide/scaling-up/tooling.html#linting -->
<!-- ### 安装依赖 -->

<!-- ```sh
# eslint
pnpm i -D eslint eslint-plugin-vue eslint-plugin-import vite-plugin-eslint
# prettier
pnpm i -D prettier eslint-config-prettier 
``` -->

### ESLint
- ESLint - ESLint 本体
- eslint-define-config - 改善 ESLint 规范编写体验
- eslint-plugin-vue - 适用于 Vue 文件的 ESLint 插件
- vue-eslint-parser - 使用 eslint-plugin-vue 时必须安装的 ESLint 解析器
- vite-plugin-eslint - 让vite得到eslint支持，开发中代码不符合规范第一时间看到提示
#### 安装依赖
```sh
pnpm i -D eslint eslint-plugin-vue eslint-plugin-import vite-plugin-eslint vite-plugin-eslint
```
#### 创建配置文件
根目录创建`.eslintrc.json`文件，并填入以下内容
```json
{
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended",
      "./.eslintrc-auto-import.json",
      "prettier"
    ],
    "overrides": [],
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "parser": "@typescript-eslint/parser",
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "tsx": true,
        "jsx": true
      }
    },
    "plugins": ["vue", "@typescript-eslint"],
    "rules": {
      "no-var": ["warn"],
      "vue/multi-word-component-names": [
        "error",
        {
          "ignores": ["index"] // 需要忽略的组件名
        }
      ]
    }
  }
```
#### 创建过滤规则
在项目根目录添加一个 `.eslintignore` 文件，内容如下：
```json
auto-imports.d.ts
components.d.ts
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode 
.idea 
dist 
/public 
/docs 
.husky 
/bin 
.eslintrc
.eslintrc.json
.eslintrc.js
.prettierrc
prettier.config.js
/src/mock/* 
# Logs 
logs 
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

/cypress/videos/	
/cypress/screenshots/	

# Editor directories and files	
.vscode	
!.vscode/extensions.json	
.idea	
*.suo	
*.ntvs*	
*.njsproj	
*.sln
*.sw?	
```
#### 在vite.config.ts中加入配置
```js
import eslintPlugin from 'vite-plugin-eslint'
export default defineConfig({
  base: './',
  plugins: [
    AutoImport({
      dts: true,
      resolvers: [ArcoResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      // 配置eslint
      eslintrc: {
        enabled: true, // <-- this
      }
    }),
    eslintPlugin()
  ]
})
```
- 关于更多配置项信息，请前往 [ESLint 官网](http://eslint.cn/docs/user-guide/configuring) 查看
### Prettier
在.eslintrc.json中配置
#### 安装依赖
```sh
pnpm i -D prettier eslint-config-prettier eslint-plugin-prettier
```
在.eslintrc.json中加入配置
```json
{
  "extends": [
    ...
    "eslint-plugin-prettier",
    "prettier"
  ]
}
```
#### 创建配置文件
根目录创建`.prettierrc.json`文件，并填入以下内容
```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "endOfLine": "auto"
}
```
#### 创建过滤规则
创建`.prettierignore`文件,过滤不需要格式化的文件
```json
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```
- 自动格式化VS Code中settings.json设置文件中，增加以下代码：
  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll": true,
      "source.fixAll.eslint": true
    }
  }
  ```
- 关于更多配置项信息,请前往 [Prettier 官网](https://prettier.io/docs/en/options.html) 查看
## husky与lint-staged功能添加
husky是一个为 git 客户端增加 hook 的工具, 在一	些git操作前 自动触发的函数; https://typicode.github.io/	
husky/#/; 如果我们希望在检测错误的同时，自动修复eslint 语法错误,就可以通过后面钩子实现
lint-staged 过滤出 Git 代码暂存区文件(被 git ado d 的文件)的工具,将所有暂存文件的列表传递给任务

### 安装
```sh
pnpm i lint-staged husky -D
```
```sh
# 编辑脚本并运行一次：package.json > prepare
npm pkg set scripts.prepare="husky install"
npm run prepare
# or
# package.json添加以下脚本
# scripts: {
# 	"prepare": "husky install",
# }
# 初始化git
git init
# 添加钩子：
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit
```
package.json根节点中添加以下内容
```json
{
  "lint-staged": {
    "*.{js,ts,tsx,vue,json}": [
      "prettier --write"
    ],
    "*.{js,ts,tsx,vue}": [
      "eslint --fix"
    ]
  },
}
```

`pre-commit` `hook `文件作用是：当执行`git commit -m "xxx" 时`，会先对 src 目录下所有的 `js,ts,tsx,vue` 文件执行 `eslint --fix` 就会修复此次写的代码，而不去影响其他的代码
## commitlint 规范提交代码
### 安装
- @commitlint/cli - Commitlint 本体
- @commitlint/config-conventional - 通用提交规范
```sh
pnpm add @commitlint/config-conventional @commitlint/cli -D
```
添加到git钩子里	
```sh
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
```
新建`.commitlintrc.json`配置
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "format",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "update",
        "husky"
      ]
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
}
```

### 文章总结
本文从技术选项到架构搭建、从代码规范约束到提交信息规范约束，一步一步带领大家如何从一个最简单的前端项目骨架到规范的前端工程化环境，基本涵盖前端项目开发的整个流程，特别适合刚接触前端工程化的同学学习。