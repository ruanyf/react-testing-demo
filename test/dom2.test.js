import React from 'react';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import TodoList from '../app/components/TodoList';

function setupDom() {
  if (typeof document !== 'undefined') {
    return;
  }

  global.document = jsdom.jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
};

describe('模拟DOM测试', function (done) {
  it('点击Todo，改变完成状态', function () {
    setupDom();
    const todoList = TestUtils.renderIntoDocument(
      <TodoList/>
    );
    const todoItems = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');
    const todoText = todoItems[0].querySelector('span');
    let isDone = todoText.classList.contains('todo-done');
    TestUtils.Simulate.click(todoText);
    expect(todoText.classList.contains('todo-done')).to.be.equal(!isDone);
  });
});


