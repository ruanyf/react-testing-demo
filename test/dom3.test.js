import React from 'react';
import jsdom from 'jsdom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';

import App from '../app/components/App';
import AddTodo from '../app/components/AddTodo';
require('react/node_modules/fbjs/lib/ExecutionEnvironment').canUseDOM = true;
function setupDom() {
  // if (typeof document !== 'undefined') {
  //   return;
  // }

  global.document = jsdom.jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
};
// setupDom();

describe('模拟DOM测试', function (done) {
  it('添加新的Todo', function () {
    const app = TestUtils.renderIntoDocument(
      <App/>
    );
    let todoItems = TestUtils.scryRenderedDOMComponentsWithClass(app, 'todo-text');
    let todoItemsLength = todoItems.length;
    let addTodo = TestUtils.findRenderedDOMComponentWithClass(app, 'add-todo');
    // let addTodo = TestUtils.findRenderedComponentWithType(app, AddTodo);
    let addButton = addTodo.querySelector('button');
    // let addButton = TestUtils.scryRenderedDOMComponentsWithTag(app, 'button')[3];
    // let addInput = addTodo.querySelector('input');
    let addInput = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    addInput.value = '4th Todo';
    // TestUtils.Simulate.change(addInput);
    // TestUtils.Simulate.keyDown(addInput, {key: "Enter", keyCode: 13, which: 13});
    TestUtils.Simulate.click(addButton);
    let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithClass(app, 'todo-text');
    expect(todoItemsAfterClick.length).to.be.equal(todoItemsLength + 1);
  });
});


