import React from 'react';
import todoStore from '../stores/todoStore';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = todoStore.getAll();
  }

  componentDidMount() {
    todoStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(todoStore.getAll());
  }

  render() {
    const TodoItemList = this.state.todos.map(todo => {
      return (
        <TodoItem key={todo.id} todo={todo}/>
      );
    });
    return (
      <ul>{TodoItemList}</ul>
    );
  }
}
