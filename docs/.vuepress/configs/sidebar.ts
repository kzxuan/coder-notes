import type { SidebarConfig } from "@vuepress/theme-default";

export const content: SidebarConfig = {
    "/algorithm/array/": [
        {
            text: "数组",
            children: [
                "/algorithm/array/linked-list.md",
                "/algorithm/array/difference-array.md"
            ]
        }
    ],
    "/algorithm/tree/": [
        {
            text: "树",
            children: [
                "/algorithm/tree/binary-tree.md"
            ]
        }
    ],
};
