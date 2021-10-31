import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import { navbar, sidebar } from "./configs";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/coder-notes/",
  lang: "zh-CN",
  title: "Coder Notes",
  description: "Coder notes.",
  head: [["link", { rel: "icon", href: "/logo.png" }]],

  themeConfig: {
    logo: "/logo.png",
    logoDark: "/logo-dark.png",
    repo: "https://github.com/kzxuan/coder-notes",
    editLink: false,
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
    tip: "提示",
    warning: "注意",
    danger: "警告",
    navbar: navbar.content,
  },
});
