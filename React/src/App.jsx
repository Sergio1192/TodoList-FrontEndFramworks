import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([]);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));

    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const handleTodoAdd = () => {
    const name = todoTaskRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => {
      let id = 1;
      if (prevTodos.length >= id)
        id = prevTodos[prevTodos.length - 1].id + 1;

      return [...prevTodos, { id, name, completed: false }]
    });

    todoTaskRef.current.value = null;
  }

  const handleTodoDeleteCpmpleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    
    todo.completed = !todo.completed;
    
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleTodoDeleteCpmpleted}>-</button>
      <div>Te quedan {todos.filter(todo => !todo.completed).length} tareas por terminar</div>
    </>
  );
}
