# Vue

## 模板语法

- **`v-bind`** 表示插值绑定。如果绑定的值是 `null` 或 `undefined`，那么该属性将不会被包含在渲染的元素上。
- **`v-on`** 负责监听 DOM 事件。
- **`v-if`** 将根据表达式的值的真假来插入或移除对应元素。
- **`v-once`** 表示一次性插值，即数据改变时，双大括号内的插值不会变化。
- **`v-html`** 表示使用真正的 HTML 语言，忽略数据绑定。
- **`动态参数`** 表示在指令中绑定 JS 表达式，需要使用方括号包裹，例如 `v-bind:[param]` 或 `v-on:[event]`。
- **`修饰符`** 表示指令绑定的特殊方式，例如 `v-on:change.native`。



![vue-lifecycle](./images/vue-lifecycle.svg)