import { useSelector } from 'react-redux'
import { todosItemsSelector } from '../redux/selectors'
import TodoItem, { TodoItemProps } from './TodoItem'
import TodoListPaginator from './TodoListPaginator'
import CompletedFilter from './CompletedFilter'
import { Grid } from '@material-ui/core'
import React from 'react'

function TodoList() {
    const todos = useSelector(todosItemsSelector)

    return (
        <>
            <Grid className="fluid pagination" alignItems="center" container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <CompletedFilter />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TodoListPaginator />
                </Grid>
            </Grid>

            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} {...todo as TodoItemProps} />
                ))}
            </ul>
        </>
    )
}

export default React.memo(TodoList)