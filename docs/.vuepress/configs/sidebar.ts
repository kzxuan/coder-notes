import type { SidebarConfig } from "@vuepress/theme-default";

export const content: SidebarConfig = {
  "/algorithm/string/": [
    {
        text: "字符串",
        children: [
          "/algorithm/string/sliding-window.md",
        ],
    },
  ],
  "/algorithm/array/": [
    {
      text: "数组",
      children: [
        "/algorithm/array/linked-list.md",
        "/algorithm/array/prefix-sum.md",
        "/algorithm/array/difference-array.md",
      ],
    },
  ],
  "/algorithm/tree/": [
    {
      text: "树",
      children: [
        "/algorithm/tree/binary-tree.md",
        "/algorithm/tree/binary-search-tree.md",
      ],
    },
  ],
};
