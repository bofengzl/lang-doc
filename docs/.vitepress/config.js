import { defineConfig } from 'vitepress'
import { SOCIAL_LINKS_ICON, SOCIAL_LINKS_VALUE } from '../config/themeConfig'
import { LOCALES } from '../config/lang'
// import { generateDirectory } from '../config/generateDirectory'

export default defineConfig({
  title: 'LANG-DEV',
  outDir: "../dist",
  head: [["meta", { name: "keywords", content: "HTML, CSS, JavaScript" }]],
  lastUpdated: true,
  markdown: {
    math: true
  },
  // 国际化
  locales: {
    "/": {
      lang: "zh-CN",
      title: "自定义的title",
      description: "自定义的description"
    },
    "/en/": {
      lang: "en-US",
      title: "Custom title",
      description: "Custom description"
    }
  },
  themeConfig: {
    // logo:'',
    // 导航栏
    nav: [
      { text: 'GOLANG', link: '/go-lang/introduction', activeMatch: '/go-lang' },
      { text: 'NEST', link: '/nest/introduction', activeMatch: '/nest' },
      {
        text: '案例',
        items: [
          { text: 'WebSite', link: 'https://www.bfengzl.com' },
          { text: '打卡小程序', link: 'https://github.com/zf100599/wx_clock' }
        ]
      }
    ],
    // 社交链接-导航栏
    // icon：discord facebook github instagram linkedin slack twitter youtube 或者 svg 字符串
    // link：跳转链接。
    socialLinks: [{ icon: SOCIAL_LINKS_ICON.GITHUB, link: SOCIAL_LINKS_VALUE.GITHUB }],
    // 侧边栏导航
    // sidebar: [
    //   { text: 'Golang', items: sidebarGolang() },
    //   { text: 'Nest', items: sidebarNext() }
    // ],
    sidebar: {
      '/go-lang/': sidebarGolang(),
      '/nest/': sidebarNext()
    },
    // 配置页尾文字
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // 在 Github 编辑此页 可以通过 editLink 来进行配置
    // editLink: {
      // pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      // text: 'Edit this page on GitHub'
    // },
    // lastUpdatedText: "最近更新时间",
    footer: {
      message: 'Record Daily Knowledge And Bug.',
      copyright: 'Copyright © 2023-present bfengzl.com 赣ICP备2023003147号-1'
    },
    localeLinks: {
      items: [
        { text: '中文', link: '/' },
        { text: 'English', link: '/en/' }
      ]
    },
    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    }
  }
})

function sidebarGolang() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: '', link: '/go-lang/introduction' },
        { text: '', link: 'getting-started' },
        { text: '', link: 'routing' },
        { text: '', link: 'deploy' }
      ]
    }
  ];
}

function sidebarNext() {
  return [
    {
      text: 'Introduction',
      // collapsed: false,
      items: [
        { text: 'What is VitePress?', link: '/nest/introduction' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
        { text: 'Deploy', link: 'deploy' }
      ]
    },
    { text: '快速开始', link: '/guide/getting-started' },
    { text: '配置', link: '/guide/configuration' },
    { text: '发布', link: '/guide/deploying' }
  ]
}