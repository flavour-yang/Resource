## VuePress

::: tip
默认的主题提供了一个首页（Homepage）的布局 (用于 这个网站的主页)。想要使用它，需要在你的根级 README.md 的 YAML front matter 指定 home: true。以下是一个如何使用的例子：
:::

```javascript
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
```

你可以将相应的内容设置为 `null` 来禁用标题和副标题。

任何 `YAML front matter` 之后额外的内容将会以普通的 `markdown` 被渲染，并插入到 `features` 的后面。

### 富文本 footer
你还可以使用 `Markdown Slot Syntax` 来设置 `footer`，以支持富文本：



::: slot footer
MIT Licensed | Copyright © 2018-present [Evan You](https://github.com/yyx990803)
:::
### 导航栏
导航栏可能包含你的页面标题、搜索框、 导航栏链接、多语言切换、仓库链接，它们均取决于你的配置。

### 导航栏 Logo
你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在公共文件目录：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```
### 导航栏链接
你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```


外部链接 `<a> 标签的特性将默认包含target="_blank" rel="noopener noreferrer"，你可以提供 target 与 rel，它们将被作为特性被增加到 <a> `标签上：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```
当你提供了一个 `items` 数组而不是一个单一的 link 时，它将显示为一个 下拉列表 ：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```
此外，你还可以通过嵌套的 `items` 来在 下拉列表 中设置分组：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```
### 禁用导航栏
你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```
你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏：


### 侧边栏
想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```
你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 `header`，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

### 嵌套的标题链接
默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 themeConfig.sidebarDepth 来修改它的行为。默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。

也可以使用 `YAML front matter` 来为某个页面重写此值：