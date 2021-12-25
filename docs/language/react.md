# React

## 目录文件

### react-app-env.d.ts
[react-app-env.d.ts的作用以及如何生成的？](https://segmentfault.com/a/1190000038874526)

- 在使用 `create-react-app xxx --typescript` 生成一个 React TS 项目时，在 `src` 目录下会生成一个 `react-app-env.d.ts` 类型声明文件。
- 三斜线指令是包含单个 `XML` 标签的单行注释，注释的内容会做为编译器指令使用，仅可放在包含它的文件的最顶端。
- **三斜线引用告诉编译器在编译过程中要引入的额外的文件。**
- 三斜线指令中有 `types` 和 `path` 两种不同的属性，`types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。

```ts
/// <reference types="react-scripts" />
/// <reference types="react" />

declare module '*.gif' {
  const src: string;
  export default src;
}
```

### reportWebVitals.ts
[React：项目下的reportWebVitals.js文件](https://www.jianshu.com/p/9d75592edb9e)

## JSX

- 在 `JSX` 语法中，可以在大括号内放置任何有效的 JS 表达式。
- 在编译之后，`JSX` 表达式会被转为普通 JS 函数调用，并且对其取值后得到 JS 对象。
- 由于 `JSX` 会编译为 `React.createElement` 调用形式，所以 React 库必须包含在 `JSX` 代码作用域内。

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
- 可以使用展开运算符 `...` 来在 `JSX` 中传递整个 `props` 对象。
  也可以通过这种方式过滤出当前组件和子组件的 `props`，例如 `const { kind, ...other } = props`。
- `false` `null` `undefined` 和 `true` 是合法的子元素。但它们并不会被渲染。
  必要时，它们应该被转换为字符串 `{String(null)}`。

```js
function App() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## 元素渲染

- 元素是构成 React 应用的最小砖块。
- React 元素是不可变对象。更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。
- React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

```js
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## 组件

- 组件允许将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。
- **函数组件**接收唯一带有数据的 `props`（代表属性）对象与并返回一个 React 元素。**Class 组件**与之等效。
- 如果没给某个 `prop` 赋值，它的默认值是 `true`。
- 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

::: tip
- 组件名称**必须以大写字母开头**，React 会将以小写字母开头的组件视为原生 DOM 标签。
- 即使用 js 将 `JSX` 组件添加进数组或对象中，调用时仍需重新将类型赋值给一个大写字母开头的变量。
:::

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Class 组件

- 向组件内添加局部的 `state` 来承载数据。
- 使用 `constructor(props) {}` 作为组件的构造函数，并可以为 `this.state` 赋初值。
- 在组件内可以使用**生命周期方法**，`componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行，`componentWillUnmount()` 方法在组件移出时执行。
- 使用 `setState()` 修改 `state`，直接修改会导致组件渲染不生效。
- `state` 的更新可能是异步的，因此需要让 `setState()` 接收一个函数而不是一个对象。
- 数据是自上而下**单向流动**的。任何的 `state` 总是所属于特定的组件，而且从该 `state` 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
- 可以通过在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState` 的比较逻辑解决。

```js
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

## 事件

- React 事件的命名采用小驼峰式，事件应该是一个函数。
- 在 JS 中，`class` 的方法默认不会绑定 `this`，需要手动添加 `this.handleClick = this.handleClick.bind(this);`。
  如果将方法设计为箭头函数，或者在事件回调中使用箭头函数，可以避免手动绑定。

```js
class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }
}

class LoggingButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

## 条件

- 使用运算符 `if` 来返回不同的组件。
- 通过花括号包裹 `&&` 运算符和元素，来控制 `&&` 右侧的元素渲染。
- 使用三目运算符 `condition ? true : false` 控制条件后的元素渲染。
- 让 render 方法直接返回 `null` 不进行任何渲染。

```js
function Mailbox(props) {
  const messages = props.messages;
  return (
    <div>
      <h1>Hello!</h1>
      {messages.length > 0 &&
        <h2>{messages.length} messages.</h2>
      }
    </div>
  );
}

```

## 循环

- 使用 `map()` 方法来遍历数组，为数组中的每个元素添加标签。
- 但通过循环创建元素时，必须包括一个特殊的 `key` 属性。`key` 帮助识别哪些元素改变了，比如被添加或删除。因此应当给数组中的每一个元素赋予一个确定的标识。
- 如果列表项目的顺序可能会变化，不建议使用**索引**来用作 `key` 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
- 指定 `key` 需要放在就近的数组上下文中才有意义，而不可以放在被循环元素的内部。
- `key` 会传递信息给 React ，但不会传递给组件。如果组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值。

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>{listItems}</ul>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()} value={number} />
      )}
    </ul>
  );
}
```

## 表单

- 使用 `state` 成为表单元素的“唯一数据源”，并用渲染表单的组件控制用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做**受控组件**。
- `<input type="text">`, `<textarea>` 和 `<select>` 之类的标签都非常相似，它们都接受一个 `value` 属性，可以使用它来实现受控组件。
- 当需要处理多个 `input` 元素时，可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

```js
handleInputChange(event) {
  const target = event.target;
  const value = target.name === 'isGoing' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}
```

## 状态提升

- 为元素提供诸如 `onInfoChange={this.handleInfoChange}` 的方法，使元素可以在其内部调用 `this.props.onInfoChange(e.target.value)` 以将内部状态变化提升至父级。
- 任何可变数据应当只有一个相对应的唯一“数据源”。通常，`state` 都是首先添加到需要渲染数据的组件中去。如果其他组件也需要这个 `state`，那么可以将它提升至这些组件的最近共同父组件中。

```js
class TemperatureInput extends React.Component {
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    return (
      <input value={temperature} onChange={this.handleChange} />
    );
  }
}

class Calculator extends React.Component {
  handleChange = (temperature) => {
  }

  render() {
    return (
      <TemperatureInput temperature={t} onTemperatureChange={this.handleChange} />
    );
  }
}
```

## 组合

- 有些组件无法提前知晓它们子组件的具体内容，可以使用一个特殊的 `props.children` 来将他们的子组件传递到渲染（类似于插槽，属性名称可以自定义），这属于**包含关系**。
- 通过包含关系，将某一个组件扩展出特殊实例并定制部分属性，可以视为**特例关系**。
- `props` 和组合提供了清晰而安全地定制组件外观和行为的灵活方式。

::: tip
组件可以接受任意 `props`，包括基本数据类型，React 元素以及函数。
:::

```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

## 代码分割

- 引入代码分割的最佳方式是通过动态 `import()` 语法。

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

- `React.lazy` 函数能像渲染常规组件一样处理动态引入（的组件）。
- 使用 `Suspense` 组件，可以在等待加载 `lazy` 组件时做优雅降级（如 loading 指示器等）。

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

## 路由

- 使用 [**React Router**](https://react-router.docschina.org/web/guides/philosophy) 来配置基于路由的代码分割。

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Context

- `context` 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。
- `context` 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
  如果只是想避免层层传递一些属性，[组件组合](#组合)有时候是一个更好的解决方案。
- 每个 `context` 对象都会返回一个 `Provider` 组件，它允许消费组件订阅 `context` 的变化。
  `Provider` 接收一个 `value` 属性，传递给消费组件。
  一个 `Provider` 可以和多个消费组件有对应关系。
- 当渲染一个订阅了 `context` 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的值。只有当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。

```js
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

- 可以将 `context` 挂载到 `class` 上，例如 `MyClass.context = ThemeContext;`。
  使用 `this.context` 在任何生命周期中都可以访问到 `context` 函数中，包括 render 函数中。
  也可以使用 `static` 这个类属性来初始化 `contextType`。
- 和 `Provider` 对应，使用 `Consumer` 来订阅到 `context` 变更。
  这需要函数作为子元素这种做法，这个函数接收当前的 `context` 值，返回一个 React 节点。

```js
class MyClass extends React.Component {
  // 用法一
  static contextType = MyContext;
  componentDidMount() {
    let value = this.context;
  }
  render() {
    let value = this.context;
  }
}
// 用法二
MyClass.contextType = MyContext;
// 用法三
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

- `context` 对象接受一个名为 `displayName` 的属性，类型为字符串。React DevTools 使用该字符串来确定 `context` 要显示的内容。

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
```

- `Provider` 绑定的 `value` 属性可以是一个**动态值**。
- 可以通过 `context` 传递一个函数，使得 `Consumers` 组件利用这个函数来更新 `context`。
- 多个 `Provider` 也可以嵌套使用，当数据名称出现重复时，里层的会覆盖外层的数据。

```js
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

## 错误边界

- 错误边界是一种组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JS 错误，并且，它会**渲染出备用 UI**。
- 错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
- 如果一个 `class` 组件中定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 这两个生命周期方法中的任意一个时，那么它就变成一个错误边界。
  当抛出错误后，请使用 `getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息。
- 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
  如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

## Refs

- 帮助在某些情况下，需要在典型数据流之外强制修改子组件。
- `Refs` 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素上。
- 当 `ref` 被传递给 render 中的元素时，对该节点的引用可以在 `ref` 的 `current` 属性中被访问。
- `ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。
- `ref` 转发使组件可以像暴露自己的 `ref` 一样暴露子组件的 `ref`，但不推荐这样使用。

::: tip
不能在函数组件上直接使用 `ref` 属性，因为它们没有实例。
但可以在函数组件内部使用 `ref` 属性，只要它指向一个 DOM 元素或 class 组件。
:::

```js
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  focusTextInput() {
    this.myRef.current.focus();
  }

  render() {
    return <input ref={this.myRef} />;
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

- **回调 refs** 能更精细地控制何时 `refs` 被设置和解除。
- 不同于传递 `createRef()` 创建的 `ref` 属性，**回调 refs**需要传递一个函数。

## Refs 转发

- Ref 转发是一个可选特性，其允许某些组件接收 `ref`，并将其向下传递给子组件。
- 参数 `ref` 只在使用 `React.forwardRef` 定义组件时存在。
  常规函数和 class 组件不接收 `ref` 参数，且 `props` 中也不存在 `ref`。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

## Fragments

- 当组件需要返回一个子元素列表，但不能在列表外包裹其它元素的时候，则可以用 `<React.Fragment>` 来包裹。
- 当遇到循环的时候，可以将 `key` 传递给 `<React.Fragment>`，这是它可以接收的唯一属性。
- `<>` `</>` 是新的简短的语法，但不支持 `key` 或其它属性。

```js
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

## 高阶组件

- **高阶组件（HOC）**是 React 中用于**复用组件逻辑**的一种高级技巧。
- 高阶组件是**参数为组件、返回值为新组件**的**函数**。
- HOC 尝试在一个地方定义抽象逻辑，并在许多组件之间共享它。
- 不要试图在 HOC 中修改组件原型。
- 将不相关的 props 传递给被包裹的组件。
- 用 HOC 包住被包装组件的显示名称。

::: tip
组件是将 `props` 转换为 UI，而高阶组件是将组件转换为另一个组件。
:::

```js
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

## Hook

### 动机

- `Hook` 是 React 16.8 的新增特性。
  它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。
- `Hook` 用以解决在组件之间复用状态逻辑很难、复杂组件变得难以理解等问题。

### 概览

- `Hook` 是一些可以在**函数组件**里“钩入” React `state` 及生命周期等特性的函数。
- 只能在函数最外层调用 `Hook`。
  不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中或自定义的 `Hook` 中调用 `Hook`。

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

::: warning Hook规则
- 只在最顶层使用 Hook。
- 只在 React 函数中调用 Hook。
:::

### State Hook

- `useState` 唯一的参数就是初始 `state`，它会返回一对值：当前状态和一个更新它的函数。
  函数类似 `class` 组件的 `this.setState`，但是它不会把新的 `state` 和旧的 `state` 进行合并。
- 不同于 `class` 的是，可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。
  使用变量时，则可以直接使用，不需要通过 `this.state`。
  更新 `state` 变量总是替换它而不是合并它。

### Effect Hook

- `useEffect` 给函数组件增加了操作副作用的能力。
  它跟 `class` 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。
- `useEffect` 会在**第一次渲染之后**和**每次更新之后**都会执行。
- 和 `class` 组件中的方法不同，使用 `useEffect` 调度的 `effect` 不会阻塞浏览器更新屏幕，这让应用看起来响应更快。
- 如果 `effect` 返回一个函数，React 会在组件卸载的时候执行清除操作，即调用它。
- 如果某些特定值在两次重渲染之间没有发生变化，可以通知 React 跳过对 `effect` 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可。

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

::: tip
- 使用多个 `effect` 实现关注点分离，将不相关逻辑分离到不同的 `effect` 中。
- 如果想执行只运行一次的 `effect`（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
:::

### 自定义 Hook

- `Hook` 是一种复用状态逻辑的方式，它不复用 `state` 本身。
- 自定义 `Hook` 更像是一种约定而不是功能。
  如果函数的名字以 `use` 开头并调用其他 `Hook`，就说这是一个自定义 `Hook`。

### Hook API

#### useContext

- 不使用组件嵌套就可以订阅 React 的 `Context`。
- 接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值。
- 当前的 `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` 属性决定。

```js
const value = useContext(MyContext);
```

- `useReducer`：通过 `reducer` 来管理组件本地的复杂 `state`。
- `useCallback`：把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 `memoized` 版本，该回调函数仅在某个依赖项改变时才会更新。
- `useMemo`：把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 `memoized` 值，这种优化有助于避免在每次渲染时都进行高开销的计算。
- `useRef`：`useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数。
- `useImperativeHandle`：`useImperativeHandle` 可以在使用 `ref` 时自定义暴露给父组件的实例值。
  它应当与 `forwardRef` 一起使用。
- `useLayoutEffect`：其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 `effect`。
  可以使用它来读取 DOM 布局并同步触发重渲染。
- `useDebugValue`：可用于在 React 开发者工具中显示自定义 hook 的标签。