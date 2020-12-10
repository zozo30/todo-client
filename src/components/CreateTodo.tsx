import { TextField, FormControl } from '@material-ui/core'

const CreateTodo: React.FC = () => {


    const handleCreate = (ev: any) => {
        ev.preventDefault()
        console.log(ev.target.elements.todo.value)
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