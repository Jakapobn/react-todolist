import React, { useState, useEffect } from "react";
import "./App.css";

function TodoList({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={
        {
          textDecoration: todo.isCompleted ? "line-through" : "",
          opacity: todo.isCompleted ? "0.5" : ""
        }
      }>
      {todo.text}
      <div>
        <button className="complete-btn" disabled={todo.isCompleted} onClick={() => completeTodo(index)}>Complete</button>
        <button className="delete-btn" onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

function InputForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <div className="input-todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          placeholder="Add a someting .. and enter"
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Relax and Sleep",
      isCompleted: false
    },
    {
      text: "Enjoy eating",
      isCompleted: false
    },
    {
      text: "Wake up",
      isCompleted: true
    }
  ]);

  useEffect(async () => {
    let localList = JSON.parse(localStorage.getItem("todoList"));
    if (localList.length > 0) {
      setTodos(localList);
    }
  }, []);

  const addTodo = text => {
    const newTodos = [{ text }, ...todos];
    setTodos(() => {
      window.localStorage.setItem("todoList", JSON.stringify(newTodos));
      return newTodos
    });
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(() => {
      window.localStorage.setItem("todoList", JSON.stringify(newTodos));
      return newTodos
    });
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(() => {
      window.localStorage.setItem("todoList", JSON.stringify(newTodos));
      return newTodos
    });
  };

  return (
    <div className="app">
      <header>
        <h3>Welcome!</h3>
        <h4>get started , add some items to your list:)</h4>
      </header>

      <div className="todo-box">
        <div className="todo-list">
          <InputForm addTodo={addTodo} />

          {todos.map((todo, index) => (
            <TodoList
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}

        </div>
      </div>

    </div>
  );
}

export default App;