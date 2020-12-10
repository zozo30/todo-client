import { useSelector } from 'react-redux'
import { todosItemsSelector } from '../redux/selectors/todoSelectors'

export default function TodoList() {
    const todos = useSelector(todosItemsSelector)
    
    return (
        <>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.description}
                    </li>
                ))}
            </ul>
        </>
    )
}


/*

const TodoList: React.FC = () => {

    const data = { todos: { items: [] } }

    return (
        <>
            {data ? (
                <ul className="todo-list">
                    {data.todos.items.map((todo: any) => (
                        <TodoItem onCompletedChange={(ev) => {
                            ev.preventDefault()
                        }} key={todo.id} {...todo} />
                    ))}
                </ul>
            ) : null
            }
        </>
    )
}

export default TodoList
*/