import React from "react";

export function TodoItem({ todo, toggleTodo, deleteTodo }) {
  const { id, name, completed } = todo;

  const handlerTodoClick = () => {
      toggleTodo(id);
  }

  const handlerDeleteTodoClick = () => {
    deleteTodo(id);
  }

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handlerTodoClick}/>
      {name}
      <button onClick={handlerDeleteTodoClick}>-</button>
    </li>
  );
}
