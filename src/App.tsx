import React from 'react';
import { Container } from '@material-ui/core'
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo'
import './assets/style/App.scss'


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <CreateTodo />
          <TodoList />
        </Container>
      </header>
    </div>
  );
}

export default App;
