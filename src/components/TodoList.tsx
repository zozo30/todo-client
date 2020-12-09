import React from "react"
import { GetTodos } from '../hooks/queries'
import { TodoItem } from './TodoItem'
import { gql, useMutation } from "@apollo/client"

const TodoList: React.FC = () => {
    const { data, loading, error } = GetTodos({})

    const SET_COMPLETED = gql`
    mutation setCompleted($input:TodoCompletedInput!){
        setCompleted(input:$input)
    }
`
    const [updateMutation] = useMutation(SET_COMPLETED)

    if (loading) return <p>Loading list...</p>
    if (error) return <p>Something went wrong!</p>

    return (
        <>
            {data ? (
                <ul className="todo-list">
                    {data.todos.items.map((todo: any) => (
                        <TodoItem onCompletedChange={(ev) => {
                            ev.preventDefault()

                            updateMutation({
                                variables: {
                                    input: {
                                        id: todo.id,
                                        completed: ev.target.checked
                                    }
                                }, update: (cache, result) => {
                                    cache.modify({
                                        id: cache.identify(todo),
                                        fields: {
                                            completed(cachedCompleted) {
                                                return !cachedCompleted
                                            }
                                        }
                                    })

                                }

                            })
                        }} key={todo.id} {...todo} />
                    ))}
                </ul>
            ) : null
            }
        </>
    )
}

export default TodoList