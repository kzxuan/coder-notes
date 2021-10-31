import type { NavbarConfig } from "@vuepress/theme-default";

export const content: NavbarConfig = [
  {
    text: "语言与框架",
    link: "/language/",
    children: [
        "/language/vue.md"
    ],
  },
  {
    text: "数据结构与算法",
    link: "/algorithm/",
    children: [
      "/algorithm/array & list.md",
    ],
  },
];
