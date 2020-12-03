import React from "react"
import { GetTodos } from '../hooks/queries'
import { TodoItem } from './TodoItem'

const TodoList: React.FC = () => {
    const { data, loading, error } = GetTodos({})

    if (loading) return <p>Loading list...</p>
    if (error) return <p>Something went wrong!</p>

    return (
        <>
            {data ? (
                <ul>
                    {data.todos.items.map((todo: any) => (
                        <TodoItem key={todo.id} {...todo} />
                    ))}
                </ul>
            ) : null
            }
        </>
    )
}

export default TodoList