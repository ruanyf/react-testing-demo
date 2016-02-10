import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import TodoItem from '../app/components/TodoItem';

function shallowRender(Component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

describe('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const todoItemData = { id: 0, name: 'Todo one', done: false };
    const todoItem = shallowRender(TodoItem, {todo: todoItemData});
    expect(todoItem.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});

