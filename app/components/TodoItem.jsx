import React from 'react';
import TodoStore from '../stores/TodoStore';

export default class Todo extends React.Component {
  toggleDone(e) {
    e.preventDefault();
    TodoStore.toggleDone(this.props.todo.id);
    TodoStore.emitChange();
  }

  deleteTodo(e) {
    e.preventDefault();
    TodoStore.deleteTodo(this.props.todo.id);
    TodoStore.emitChange();
  }

  render() {
    const todo = this.props.todo;
    const todoDone = todo.done ? 'todo-done' : '';
    return (
      <li>
        <span className={`todo-text ${todoDone}`} onClick={this.toggleDone.bind(this)}>{todo.name}</span>
        <button className="delete" onClick={this.deleteTodo.bind(this)}> x </button>
      </li>
    );
  }
}
