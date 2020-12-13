import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo'
import { useEffect } from 'react';
import './assets/style/App.scss'
import { useApi } from './hooks/graphql/useApi';
import { Header } from './components'
import { useActions } from './hooks/redux/useActions';
import { Container } from '@material-ui/core';

export default function App() {

  const api = useApi()
  const { todoGetAllSuccess, todoGetAllFailure } = useActions()

  useEffect(() => {
    api.getTodos({}).then((data) => {
      todoGetAllSuccess(data)
    }).catch(() => {
      todoGetAllFailure()
    })
  }, [api, todoGetAllSuccess, todoGetAllFailure])

  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <CreateTodo />
        <TodoList />
      </Container>
    </div>
  );
}