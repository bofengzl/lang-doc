// 中文
const getChineseThemeConfig = () => {
  return {

  }
}
// 英文
const getEnglishThemeConfig = () => {
  return {
    nav: [{ text: "Guide", link: "/en/guide/what-is-vitepress", activeMatch: "/en/guide/" }],
    sidebar: {
      "/en/guide/": [
        {
          text: "Description",
          items: [{ text: "What is VitePress", link: "/en/guide/what-is-vitepress" }],
          collapsible: true
        }
      ]
    }
  }
}

export const LOCALES = {
  '/': getChineseThemeConfig(),
  '/en/': getEnglishThemeConfig()
}
