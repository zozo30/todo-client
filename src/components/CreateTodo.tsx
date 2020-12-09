import { gql, useMutation } from '@apollo/client'
import { TextField, FormControl } from '@material-ui/core'
import { GET_TODOS } from '../hooks/queries/useGetTodos'

const CreateTodo: React.FC = () => {
    const CREATE_TODO = gql`
        mutation createTodo($input:TodoInput!){
            createTodo(input:$input){
                id,
                createdAt,
                updatedAt,
                description,
                completed
            }
        }
    `

    const [createTodo, { loading, error }] = useMutation(CREATE_TODO)

    const handleCreate = (ev: any) => {
        ev.preventDefault()
        console.log(ev.target.elements.todo.value)
        createTodo({
            variables: { input: { description: ev.target.elements.todo.value } },
            refetchQueries: [{
                query: GET_TODOS,
                variables: {
                    filters: {}
                }
            }]
        }).then(() => ev.target.elements.todo.value = '')
    }

    return (
        <form className="fluid" onSubmit={handleCreate}>
            <FormControl fullWidth>
                <TextField id="todo" label="Create Todo" variant="filled" />
            </FormControl>
        </form>
    )
}

export default CreateTodo