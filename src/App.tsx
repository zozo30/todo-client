import React from 'react';
import { GetTodos, GetTodo } from './hooks/queries'
import { CreateTodo } from './hooks/mutations'
import { Container } from '@material-ui/core'
import TodoList from './components/TodoList';
import './assets/style/App.scss'

const CreateComponent: React.FunctionComponent = () => {
  return (
    <div>
      <button onClick={CreateTodo({ description: 'hhh' })}>csináld meg</button>
    </div>
  )
}


function App() {

  const todos = GetTodos()
  console.log(todos)
  const todo = GetTodo(1)
  console.log('todo:', todo)


  return (
    <div className="App">
      <header className="App-header">

        <CreateComponent />
        <Container maxWidth="md">
          <TodoList />
        </Container>
      </header>
    </div>
  );
}

export default App;
