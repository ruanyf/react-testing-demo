import React from 'react';
import App from '../app/components/App.jsx';

import TestUtils from 'react-addons-test-utils';

import { expect } from 'chai';

function shallowRenderTodo(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('Shallow测试', function () {
  it('App组件的标题正确渲染', function () {
    const result = shallowRenderTodo(App);
    // 每个React组件都有 props.children 属性
    expect(result.props.children[0].props.children).to.be.equal('Todos');
  })
})
