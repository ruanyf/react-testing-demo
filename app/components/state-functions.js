export function toggleDone(state, id) {
  const todos = state.todos.map((todo) => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }

    return todo;
  });

  return { todos };
}

export function addTodo(state, todo) {
  if (state.todos.length !== 0) {
    const lastTodo = state.todos[state.todos.length - 1];
    todo.id = lastTodo.id + 1;
  } else {
    todo.id = 0;
  }
  todo.done = false;

  return {
    todos: state.todos.concat([todo])
  };
}

export function deleteTodo(state, id) {
  return {
    todos: state.todos.filter((todo) => todo.id !== id)
  };
}
