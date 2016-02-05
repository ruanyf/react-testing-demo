import React from 'react';
import todoStore from '../stores/todoStore';

export default class Todo extends React.Component {
  toggleDone(e) {
    e.preventDefault();
    todoStore.toggleDone(this.props.todo.id);
    todoStore.emitChange();
  }

  deleteTodo(e) {
    e.preventDefault();
    todoStore.deleteTodo(this.props.todo.id);
    todoStore.emitChange();
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
