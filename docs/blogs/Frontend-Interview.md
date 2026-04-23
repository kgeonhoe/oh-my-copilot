---
title: Senior Front-end Engineer Interview
date: 2026-04-20 23:10:14
tags: 面经
---

## Pure Tech

### Eventloop

1. During the lifecycle, browser keeps delivery sync tasks, including

#### Quiz

[Mutation, Promise, Script, setTimeout and EventListener](/demos/event-loop)

### Browser Cache Control

#### Force

#### djd

### `this` of Function

- #### General Function & Method

It depends on how the function was excuted.

```js
if (`func = _func.bind(obj)`) {
  if (func is called with `call` or `apply`) {
    return the first arg of `call` or `apply`
  }else {
    return the first arg of `bind`
  }
}else {
  if(`obj.func()`) {
    return `obj`
  }else {
    return window
  }
}
```

##### Quiz

```js
window.a = 1;
const obj = {
  a: 2,
  func1() {
    console.log(this.a);
    const a = 0;
    function _func1() {
      console.log(this.a);
    }
    _func1();
  },
};
obj.func2 = obj.func1.bind({ a: 4 });
const func3 = obj.func1;
obj.func1();
obj.func2();
obj.func2.call({ a: 3 });
func3.call({ a: 4 });
func3();
```

- #### Arrow Function

Always points at `this` of scope where the arrow function was created.

```js
window.a = 1;
const obj = {
  a: 2,
  func1: () => console.log(this.a),
  createFunc2: () => () => console.log(this.a),
  createFunc3() {
    return () => console.log(this.a);
  },
};
const func2 = obj.createFunc2();
const func3 = obj.createFunc3();

obj.func1(); // 1
func2(); // 1
func3(); // 2
```

1. `obj.func1` was created in `Window`.
2. `func2` was created in `obj.createFunc2()`, which is an arrow function.`obj.createFunc2` was created in `Window`, so `this` in `obj.createFunc2()` is `Window`.
3. `func3` was created with `obj.createFunc3()`, which is a general function called by `obj.func()`, so `this` is `obj`

Tips: Before creating the arrow function, print `this`, which is exactly `this` of the arrow function.

```js
window.a = 1;
console.log("before creating func1", this);
console.log("before creating createFunc2", this);
const obj = {
  a: 2,
  func1: () => console.log(this.a),
  createFunc2: () => {
    console.log("before creating func2", this);
    return () => console.log(this.a);
  },
  createFunc3() {
    console.log("before creating func3", this);
    return () => console.log(this.a);
  },
};
```

### Centering Child Element (unknown size)

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

Consider flex, grid, margin, absolute
[Centering Child Element (unknown size)](/demos/centering-child-element)

## Engineer Ability

### 中台前端架构设计（扩展性、可观测性）

包括主题、组件库、埋点、性能监控

### 性能卡点排查

分析瓶颈类型，如网络、主线程、渲染、接口串行、第三方脚本等，采用不同工具链，进行路由级代码分割排查。

### 灰度发布和回滚方案

### 前端安全风险

### 后端接口频繁变更治理

### AI 发展应对方案与工程化经验
