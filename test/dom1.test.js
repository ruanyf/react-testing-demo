import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import TodoList from '../app/components/TodoList';

describe('模拟DOM测试', function (done) {
  it('点击删除按钮，删除Todo', function () {
    const todoList = TestUtils.renderIntoDocument(
      <TodoList/>
    );
    let todoItems = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');
    let todoLength = todoItems.length;
    let deleteButton = todoItems[0].querySelector('button');
    TestUtils.Simulate.click(deleteButton);
    let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'li');
    expect(todoItemsAfterClick.length).to.be.equal(todoLength - 1);
  });
});


