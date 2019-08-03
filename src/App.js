import React, { useState } from 'react';
import './App.scss';
import axios from 'axios'
import { Button, table, thead, tbody, columns, column} from "react-bulma-components/full"
import 'react-bulma-components/dist/react-bulma-components.min.css'

const Todo = ({todo, index, completeTodo, deleteTodo}) => {
  return  <div style={{testDecoration: todo.isCompleted ? 'line-through' : ''}}
    className="todo">
    {todo.text}

    </div>
}

const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text"
        className="input is-large is-focused"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a TODO Item" />
    </form>
  )
}

const App =() => {
  const [todos, setTodos] = useState([
    {
      text: 'React Hooks tutorial',
      isComplete: false
    },
    {
      text: 'Going the extra mile to add onto my react experience',
      isComplete: false
    },
    {
      text: 'Its time to move elsewhere',
      isComplete: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }


  return (
    <>
      <section className="section App">
        <div className="container">
          <h1 className="title">REACT TODO USING HOOKS TUTORIAL</h1>
          <div className="columns is-mobile">
            <div className="column column is-three-fifths is-offset-one-fifth">
              <table className="table is-mobile">
                <thead>
                  <tr>
                    <th><abbr title="title">Title</abbr></th>
                    <th><abbr title="action">Action</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => (
                    <tr key={index}>
                      <td><h3><Todo index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} /></h3></td>
                      <td><button onClick={() => completeTodo(index)} className="button is-info">Complete</button></td>
                      <td><button onClick={() => deleteTodo(index)} className="button is-danger">Delete</button></td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="columns is-mobile">
            <div className="column is-three-fifths is-offset-one-fifth">
              <TodoForm addTodo={addTodo}  />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
