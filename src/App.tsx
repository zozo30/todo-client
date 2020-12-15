import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo'
import SnackBarContainer from './components/SnackBarContainer'
import { useEffect } from 'react';
import './assets/style/App.scss'
import { useApi } from './hooks/graphql/useApi';
import { Header } from './components'
import { useActions } from './hooks/redux/useActions';
import { Container } from '@material-ui/core';

export default function App() {

  const api = useApi()
  const { todoSetItems } = useActions()

  useEffect(() => {
    api.getTodos({}).then((data) => {
      todoSetItems(data)
    }).catch(() => {

    })
  }, [api, todoSetItems])

  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <CreateTodo />
        <TodoList />
      </Container>
      <SnackBarContainer />
    </div>
  );
}