import React, { useState, useEffect } from "react";
import "./App.css";

function TodoList({ todo, index, editTodo, completeTodo, removeTodo, editValue }) {
  return (
    <div
      className="todo"
      style={
        {
          textDecoration: todo.isCompleted ? "line-through" : "",
          opacity: todo.isCompleted ? "0.5" : ""
        }
      }>

      {!todo.isEdit && (
        <div>{todo.text}</div>
      )}

      {todo.isEdit && (
        <input type="text" value={todo.text} onChange={e => editValue(e.target.value, index)} />
      )}
      <div>
        <button className="complete-btn" disabled={todo.isEdit} onClick={() => completeTodo(index)}>{todo.isCompleted ? 'Uncheck' : 'Check'}</button>
        <button className="edit-btn" disabled={todo.isCompleted} onClick={() => editTodo(index)}>{todo.isEdit ? 'OK' : 'Edit'}</button>
        <button className="delete-btn" disabled={todo.isEdit} onClick={() => removeTodo(index)}>Delete</button>
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
      isCompleted: false,
      isEdit: false
    },
    {
      text: "Enjoy eating",
      isCompleted: false,
      isEdit: false
    },
    {
      text: "Wake up",
      isCompleted: true,
      isEdit: false
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

  const editTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isEdit = !newTodos[index].isEdit;
    setTodos(() => {
      window.localStorage.setItem("todoList", JSON.stringify(newTodos));
      return newTodos
    });
  };

  const editValue = (text, index) => {
    const newTodos = [...todos];
    newTodos[index].text = text;
    setTodos(() => {
      window.localStorage.setItem("todoList", JSON.stringify(newTodos));
      return newTodos
    });
  };


  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
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
              editTodo={editTodo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              editValue={editValue}
            />
          ))}

        </div>
      </div>

    </div>
  );
}

export default App;