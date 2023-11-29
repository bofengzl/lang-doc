import { defineConfig, type DefaultTheme } from 'vitepress'
import { SOCIAL_LINKS_ICON, SOCIAL_LINKS_VALUE } from './config/constant'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "STUDY-LANG",
  description: "a study lang site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: sidebar(),
    socialLinks: socialLinks()
  }
})

/** 导航栏 */
function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Go', link: '/go/inter', activeMatch: '/go/' },
    { text: 'Nest', link: '/nest/inter', activeMatch: '/nest/' },
    { text: 'Vue', link: '/vue/inter', activeMatch: '/vue/' },
    { text: 'Template', link: '/template/inter', activeMatch: '/template/' },
    { text: 'Examples', link: '/example/markdown-examples', activeMatch: '/example/' },
    {
      text: 'case',
      items: [
        { text: 'Official website', link: 'https://www.bfengzl.com' },
        { text: 'Clock Small program Source code', link: 'https://github.com/zf100599/wx_clock' }
      ]
    }
  ]
}

/** 外链 */
function socialLinks(): DefaultTheme.SocialLink[] {
  return [
    { icon: SOCIAL_LINKS_ICON.GITHUB, link: SOCIAL_LINKS_VALUE.GITHUB }
  ]
}

/** 侧边栏菜单 */
function sidebar(): DefaultTheme.Sidebar {
  return {
    '/go/': { base: '/go/', items: sidebargo() },
    '/nest/': { base: '/nest/', items: sidebarNest() },
    '/vue/': { base: '/vue/', items: sidebarVue() },
    '/template/': { base: '/template/', items: sidebarTemplate() },
    '/example/': { base: '/example/', items: sidebarExamples() },
  }
}

/** Go目录 */
function sidebargo(): DefaultTheme.SidebarItem[] {
  return [

  ]
}

/** Next目录 */
function sidebarNest(): DefaultTheme.SidebarItem[] {
  return [

  ]
}

/** Vue目录 */
function sidebarVue(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Vue3',
      link: 'vue3_know'
    },
    {
      text: 'Vue2',
      link: 'vue2_know'
    }
  ]
}

/** 模板目录 */
function sidebarTemplate(): DefaultTheme.SidebarItem[] {
  return [

  ]
}

/** 案例目录 */
function sidebarExamples(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' }
      ]
    }
  ]
}