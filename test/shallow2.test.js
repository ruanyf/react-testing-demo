import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Todo from '../app/components/TodoItem.jsx';

let todoItem = { id: 0, name: 'Todo one', done: false };

function shallowRenderTodo(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('Shallow测试', function () {
  it('TodoItem组件的class属性正确渲染', function () {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Todo todo={todoItem}/>);
    const result = renderer.getRenderOutput()
    // 每个React组件都有 props.children 属性
    expect(result.props.children[0].props.className.indexOf('todo-done')).to.be.equal(-1);
  });
});

