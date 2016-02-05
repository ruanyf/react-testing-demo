import React from 'react';
import {findDOMNode} from 'react-dom';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

import App from '../app/components/App';

describe('DOM Rendering', function (done) {
  it('When click the Todo item，it should become done', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appDOM = findDOMNode(app);
    const todoItem = appDOM.querySelector('li:first-child span');
    let isDone = todoItem.classList.contains('todo-done');
    TestUtils.Simulate.click(todoItem);
    expect(todoItem.classList.contains('todo-done')).to.be.equal(!isDone);
    // make the item returns to previous state
    TestUtils.Simulate.click(todoItem);
  });
});

