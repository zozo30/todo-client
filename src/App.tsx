/*
import React from 'react';
import { Container } from '@material-ui/core'
import CreateTodo from './components/CreateTodo'
*/
import TodoList from './components/TodoList';
import { useEffect } from 'react';
import './assets/style/App.scss'
import { useApi } from './hooks/graphql/useApi';
import { Header } from './components'
import { useActions } from './hooks/redux/useActions';

function App() {

  const api = useApi()
  const { todoGetAllSuccess } = useActions()

  useEffect(() => {
    api.getTodos({}).then((data) => {
      todoGetAllSuccess(data)
    })
  }, [api, todoGetAllSuccess])

  function onClick() {
    api.getTodo(3483)
  }

  return (
    <div className="App">
      <Header />
      <TodoList />
      <button onClick={onClick}>get</button>
    </div>
  );
}

export default App;
/*
<Container maxWidth="md">
          <CreateTodo />
          <TodoList />
        </Container>
*/