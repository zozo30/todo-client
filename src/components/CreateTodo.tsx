import { TextField, FormControl } from '@material-ui/core'
import { useApi } from '../hooks/graphql/useApi';
import { useActions } from '../hooks/redux/useActions';
import SnackBarActionType from '../types/SnackBarActionType';
import SnackBarType from '../types/SnackBarType';

export default function CreateTodo() {

    const api = useApi()
    const { todoAddItem, setSnackBar } = useActions()

    const handleCreate = (ev: any) => {
        ev.preventDefault()

        const description = ev.target.elements.todo.value;
        if (description === '')
            return

        api.createTodo(description).then((res) => {
            ev.target.elements.todo.value = ''
            todoAddItem(res)
            setSnackBar(SnackBarActionType.SHOW, SnackBarType.SUCCESS, 'Todo created')
        }).catch((er) => {

        })
    }

    return (
        <form className="fluid" onSubmit={handleCreate}>
            <FormControl fullWidth>
                <TextField
                    id="todo"
                    label="Create Todo"
                    variant="filled"
                />
            </FormControl>
        </form>
    )
}