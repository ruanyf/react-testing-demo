This repo shows you how to test React component. It is loosely based on Jack Franklin's article ["Testing React Applications"](http://12devsofxmas.co.uk/2015/12/day-2-testing-react-applications/).

![](app/img/react.png)

## Introduction

We use two testing approaches.

- [React official Test Utilities](https://facebook.github.io/react/docs/test-utils.html)
- [Airbnb's Enzyme Library](https://github.com/airbnb/enzyme)

Each approaches have two ways to do the testing.

- **Shallow Rendering**: render the component into a React Object instance
- **DOM Rendering**: render the component into a real DOM node

We will cover all of these stuffs.

## Demo

We use a Todo app as the demo. You should install it.

```bash
$ git clone https://github.com/ruanyf/react-testing-demo.git
$ cd react-testing-demo && npm install
$ npm start
```

Now, you visit http://127.0.0.1:8080/, and see a Todo app.

![](app/img/demo.png)

It contains two components: `<TodoList/>` and `<AddTodo/>`.

```html
// app/components/App.jsx
<div>
  <h1>Todos</h1>
  <TodoList/>
  <AddTodo/>
</div>
```

It has some features.

1. Click the Todo item. A line strikes through it, which means it is done. Click again, the line disappear.
1. Click the Delete button. The Todo item is deleted.
1. Click the Add Todo button. A new Todo item is added.

## What to test

There are five test cases of the Todo app.

1. Expect App's title equals "Todos"
1. After initial loading, expect no 'todo-done' class in Todo item's classList
1. Click the Todo item, expect the Todo item shoule be striked through
1. Click the delete button, expect the Todo item should be deleted
1. Click the add Todo button, expect a new Todo item shoule be added into the TodoList

Now run the test, and see the result.

```bash
$ npm test
```

## React official Test Utilities

The official testing approach is to use [Test Utilities](https://facebook.github.io/react/docs/test-utils.html).

```javascript
import TestUtils from 'react-addons-test-utils';
```

The library provides many useful methods.

### Shallow Rendering

[Shallow Rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) just renders a component "one level deep" without worrying about the behavior of child components, and retures a React Object instance. It does not require a DOM, since the component will not be mounted into DOM.

```javascript
import TestUtils from 'react-addons-test-utils';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}
```

In the code above, we define a function `shallowRender` to return a component's shallow rendering.

The first test case is to test the title of `App`.

```javascript
it('App\'s title should be Todos', function () {
  const app = shallowRender(App);
  expect(app.props.children[0].props.children).to.equal('Todos');
})
```

You may feel `app.props.children[0].props.children` intimidating, but it is not. Each React component instance has a `props.children` property which contains its all children components. The first `props.children` of `App` is `h1` element whose `props.children` property is the text of the title.

The second test case is to test `TodoItem` has no `todo-done` class. This time, we modify the function `shallowRender` to accept properties.

```javascript
import TestUtils from 'react-addons-test-utils';

function shallowRender(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}
```

The following is the test case.

```javascript
import TodoItem from '../app/components/TodoItem';

let todoItemData = { id: 0, name: 'Todo one', done: false };

describe('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const todoItem = shallowRender(TodoItem, {todo: todoItemData});
    expect(todoItem.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});
```

## Licence

MIT
