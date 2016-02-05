import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoList/>
        <AddTodo/>
      </div>
    );
  }
}
