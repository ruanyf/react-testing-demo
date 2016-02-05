import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount, describeWithDOM} from 'enzyme';
import { expect } from 'chai';
import App from '../app/components/App';

function setupDom() {
  if (typeof document !== 'undefined') {
    return;
  }

  global.document = jsdom.jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = window.navigator;
};

describe('Shallow测试', function () {
  let result;

  before(function () {
    result = shallow(<App/>);
  });

  it('App组件的标题正确渲染', function () {
    expect(result.find('h1').text()).to.be.equal('Todos');
  });

  it('默认状态下没有已完成的组件', function () {
    expect(result.hasClass('todo-done')).to.be.equal(false);
  });
});

describe('DOM测试', function () {
  let result;

  beforeEach(function () {
    result = mount(<App/>);
  });

  afterEach(function () {
    result.unmount();
  });

  it('Delete Todo', function () {
    let todoLength = result.find('li').length;
    result.find('button.delete').at(0).simulate('click');
    expect(result.find('li').length).to.be.equal(todoLength - 1);
  });

  it('Turning a Todo into Done', function () {
    let todoItem = result.find('.todo-text').at(0);
    todoItem.simulate('click');
    expect(todoItem.hasClass('todo-done')).to.be.equal(true);
  });

  it('Add a new Todo', function () {
    let todoLength = result.find('li').length;
    let addInput = result.find('input').get(0);
    addInput.value = 'Todo Four';
    result.find('.add-button').simulate('click');
    expect(result.find('li').length).to.be.equal(todoLength + 1);
  });
});
