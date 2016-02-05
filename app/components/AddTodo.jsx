import React from 'react';
import todoStore from '../stores/todoStore';

export default class AddTodo extends React.Component {
  addTodo() {
    // e.preventDefault();
    const newTodoName = this.refs.todoTitle.value;
    if (newTodoName) {
      todoStore.addNewTodo({
        name: newTodoName
      });
      todoStore.emitChange();
      this.refs.todoTitle.value = '';
    }
  }

  render() {
    return (
      <div className="add-todo">
        <input type="text" placeholder="Todo four" ref="todoTitle" />
        <button className="add-button" onClick={this.addTodo.bind(this)}>
          Add Todo
        </button>
      </div>
    );
  }
}
