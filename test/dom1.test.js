import React from 'react';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import App from '../app/components/App';

describe('DOM Rendering', function () {
  it('Click the delete button, the Todo item should be deleted', function () {
    const app = TestUtils.renderIntoDocument(<App/>);
    let todoItems = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    let todoLength = todoItems.length;
    let deleteButton = todoItems[0].querySelector('button');
    TestUtils.Simulate.click(deleteButton);
    let todoItemsAfterClick = TestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(todoItemsAfterClick.length).to.equal(todoLength - 1);
  });
});

