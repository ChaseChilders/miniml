import React from "react";
import { GrAdd, GrCheckmark, GrClose, GrEdit } from "react-icons/gr";
import "../stylesheets/Todo.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Todolist() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  function inputTextHandler(e) {
    setTodoText(e.target.value);
  }
  function addTodo(e) {
    e.preventDefault();
    if (todoText === "") {
      alert("Please Enter a Todo");
      return;
    }
    const newTodos = [...todoList, { id: uuidv4(), todoText: todoText, isDone: false }];
    setTodoList(newTodos);
    console.log(todoList);
  }
  function removeTodo(id) {
    const removeItem = todoList.filter((todo) => {
      // return the rest of the todos that don't match the item we are deleting
      return todo.id !== id;
    });
    setTodoList(removeItem);
  }
  function completeTodo(id) {
    const newTodos = [...todoList].map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodoList(newTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todoList].map((todo) => {
      if (editingText === "") {
        alert("Please enter editing text");
        return;
      }
      if (todo.id === id) {
        todo.todoText = editingText;
      }
      return todo;
    });
    setTodoList(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }
  return (
    <div className="todoContainer">
      <div className="todoTitle">Chase's Todo List</div>
      <div className="todoForm">
        <form>
          <label className="todoInputLabel">Type Todo:</label>
          <input type="text" for="todoText" className="todoInputBar" onChange={inputTextHandler} setTodoText={setTodoText}></input>
          <button className="todoAddButton" onClick={addTodo}>
            <GrAdd></GrAdd>
          </button>
        </form>
      </div>
      <div className="todoListContainer">
        <ul className="todoList">
          {todoList.map((todo) => (
            <div className="wholeListItem">
              <div style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
                <li key={todo.id} className="todoItem">
                  {todo.todoText}
                </li>
                {todoEditing === todo.id ? (
                  <div>
                    <input type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText}></input>
                    <button onClick={() => editTodo(todo.id)}>Submit Edits</button>
                  </div>
                ) : (
                  todo.text
                )}
              </div>
              <div className="todoItemButtons">
                <button className="todoCompleteButton" onClick={() => completeTodo(todo.id)}>
                  <GrCheckmark></GrCheckmark>
                </button>
                <button className="todoDeleteButton" onClick={() => removeTodo(todo.id)}>
                  <GrClose></GrClose>
                </button>
                <button className="todoEditButton" onClick={() => setTodoEditing(todo.id)}>
                  <GrEdit></GrEdit>
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todolist;
