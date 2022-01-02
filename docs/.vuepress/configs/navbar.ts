import type { NavbarConfig } from "@vuepress/theme-default";

export const content: NavbarConfig = [
    {
        text: "语言与框架", link: "/language/",
        children: [
            "/language/java.md",
            "/language/spring.md",
            "/language/vue.md",
            "/language/react.md"
        ],
    },
    {
        text: "数据结构与算法", link: "/algorithm/",
        children: [
            "/algorithm/array/",
            "/algorithm/tree/"
        ],
    },
];
