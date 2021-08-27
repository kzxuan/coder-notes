import type { NavbarConfig } from "@vuepress/theme-default";

export const content: NavbarConfig = [
  {
    text: "语言",
    link: "/language/",
    children: [
      "/language/python"
    ]
  },
  {
    text: "算法",
    link: "/algorithm/",
    children: [
      "/algorithm/string"
    ]
  },
];
