This repo shows you how to test React component. It is loosely based on Jack Franklin's article ["Testing React Applications"](http://12devsofxmas.co.uk/2015/12/day-2-testing-react-applications/).

![](app/img/react.png)

## Demo

We use a Todo app as the demo. You should install it.

```bash
$ git clone https://github.com/ruanyf/react-testing-demo.git
$ cd react-testing-demo && npm install
$ npm start
```

Now, you visit http://127.0.0.1:8080/, and see a Todo app.

![](app/img/demo.png)

There are 5 places we want to test.

> 1. App's title should be "Todos"
> 1. After initial loading, none of Todo items should be done
> 1. Click a Todo item, it should become to be done
> 1. Click a Delete button, the Todo item should be deleted
> 1. Click the Add Todo button, a new Todo item shoule be added into the TodoList

All [test cases](https://github.com/ruanyf/react-testing-demo/tree/master/test) are written. Run the tests, and see the result.

```bash
$ npm test
```

## Testing Library

To test React, you have to use [offical Test Utilities](https://facebook.github.io/react/docs/test-utils.html). But this tool only provides low-level API, as a result, some third-party test libraries are built based on it. Airbnb's [Enzyme library](https://github.com/airbnb/enzyme) is the easiest one to use among them.

Every test case thus has two ways to write.

> - Test Utilities' way
> - Enzeym's way

This repo will show you both of them.

## React official Test Utilities

Since a React component could be rendered into either a virtual DOM object in memory (`React.Component`'s instance) or a real DOM node, Test Utilities library gives you two testing choices.

- **Shallow Rendering**: testing a virtual DOM object
- **DOM Rendering**: testing a real DOM node

### Shallow Rendering

[Shallow Rendering](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) just renders a component "one level deep" without worrying about the behavior of child components, and retures a virtual DOM object. It does not require a DOM, since the component will not be mounted into DOM.

At first, import the Test Utilities in your test case script.

```javascript
import TestUtils from 'react-addons-test-utils';
```

Then, write a Shallow Rendering function.

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

### renderIntoDocument

Test Utilities' `renderIntoDocument` method renders a component into a detached DOM node in the document.

```javascript
import TestUtils from 'react-addons-test-utils';
import App from '../app/components/App';

const app = TestUtils.renderIntoDocument(<App/>);
```

`renderIntoDocument` method requires a DOM. Before running the test case, DOM environment (includes `window`, `document` and `navigator` Object) should be available. So we use [jsdom](https://github.com/tmpvar/jsdom) to implement the DOM environment.

```javascript
var jsdom = require("jsdom");

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
```

We save the code above into `setup.js`. Then modify `package.json`.

```javascript
{
  "scripts": {
    "test": "mocha --compilers js:babel-core/register --require ./test/setup.js",
  },
}
```

Now every time we run `npm test`, the file of `setup.js` would be run at first.

The third test case is to test the delete button.

```javascript
it('Click the delete button, the Todo item should be deleted', function () {
  const app = TestUtils.renderIntoDocument(<App/>);
  let todoItems = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
  let todoLength = todoItems.length;
  let deleteButton = todoItems[0].querySelector('button');
  TestUtils.Simulate.click(deleteButton);
  let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
  expect(todoItemsAfterClick.length).to.equal(todoLength - 1);
});
```

In the code above, first, `scryRenderedDOMComponentsWithTag` method finds all `li` elements of the `app` component. Next, get out `todoItems[0]` and find the delete button from it. Then use `TestUtils.Simulate.click` to simulate the click action upon it. Last, expect the new number of all `li` elements should be less one than the old number.

Test Utilities provides many methods to find elements from a React component.

- [scryRenderedDOMComponentsWithClass](https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithclass): Finds all instances of components in the rendered tree that are DOM components with the class name matching className.
- [findRenderedDOMComponentWithClass](https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithclass): Like scryRenderedDOMComponentsWithClass() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.
- [scryRenderedDOMComponentsWithTag](https://facebook.github.io/react/docs/test-utils.html#scryrendereddomcomponentswithtag): Finds all instances of components in the rendered tree that are DOM components with the tag name matching tagName.
- [findRenderedDOMComponentWithTag](https://facebook.github.io/react/docs/test-utils.html#findrendereddomcomponentwithtag): Like scryRenderedDOMComponentsWithTag() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.
- [scryRenderedComponentsWithType](https://facebook.github.io/react/docs/test-utils.html#scryrenderedcomponentswithtype): Finds all instances of components with type equal to componentClass.
- [findRenderedComponentWithType](https://facebook.github.io/react/docs/test-utils.html#findrenderedcomponentwithtype): Same as scryRenderedComponentsWithType() but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.
- [findAllInRenderedTree](https://facebook.github.io/react/docs/test-utils.html#findallinrenderedtree): Traverse all components in tree and accumulate all components where test(component) is true.

These methods is hard to spell. Luckily, we have another way to find DOM node from React component.

### findDOMNode

If this component has been mounted into the DOM, ReactDOM module's `findDOMNode` method returns the corresponding native browser DOM element.

We use it to write the fourth test case. It is to test the toggle action when click the Todo item.

```javascript
import { findDOMNode } from 'react-dom';

describe('DOM Rendering', function (done) {
  it('When click the Todo item，it should become done', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    const todoItem = appDOM.querySelector('li:first-child span');
    let isDone = todoItem.classList.contains('todo-done');
    TestUtils.Simulate.click(todoItem);
    expect(todoItem.classList.contains('todo-done')).to.be.equal(!isDone);
  });
});
```

The fifth test case is to test adding a new Todo item.

```javascript
it('Add an new Todo item, when click the new todo button', function () {
  const app = TestUtils.renderIntoDocument(<App/>);
  const appDOM = findDOMNode(app);
  let todoItemsLength = appDOM.querySelectorAll('.todo-text').length;
  let addInput = appDOM.querySelector('input');
  addInput.value = 'Todo four';
  let addButton = appDOM.querySelector('.add-todo button');
  TestUtils.Simulate.click(addButton);
  expect(appDOM.querySelectorAll('.todo-text').length).to.be.equal(todoItemsLength + 1);
});
```

## Airbnb's Enzyme Library

[Enzyme](https://github.com/airbnb/enzyme) is a library mimicking jQuery's API to provide an intuitive and flexible way to test React component.

It has three way to do the test.

- shallow
- render
- mount

### shallow

[shallow](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) is a wrapper of Test Utilities' shallow rendering.

```javascript
import {shallow} from 'enzyme';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
};
```

### render

[`render`](https://github.com/airbnb/enzyme/blob/master/docs/api/render.md) is used to render react components to static HTML and analyze the resulting HTML structure. It returns a wrapper very similar to `shallow`; however, render uses a third party HTML parsing and traversal library Cheerio. This means it returns a CheerioWrapper.

```javascript
import {render} from 'enzyme';

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
    let app = render(<App/>);
    expect(app.find('.todo-done').length).to.equal(0);
  });
});
```

### mount

[`mount`](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) is the method to mount your React component into a real DOM node.

```javascript
describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).to.equal(todoLength - 1);
  });

  it('Turning a Todo item into Done', function () {
    let app = mount(<App/>);
    let todoItem = app.find('.todo-text').at(0);
    todoItem.simulate('click');
    expect(todoItem.hasClass('todo-done')).to.equal(true);
  });

  it('Add a new Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    let addInput = app.find('input').get(0);
    addInput.value = 'Todo Four';
    app.find('.add-button').simulate('click');
    expect(app.find('li').length).to.equal(todoLength + 1);
  });
});
```

## Licence

MIT
