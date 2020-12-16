import { TextField, FormControl } from '@material-ui/core'
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../hooks/graphql/useApi';
import { useActions } from '../hooks/redux/useActions';
import { useSnackBar } from '../hooks/redux/useSnackBar';
import useDebouncedCallback from '../hooks/ui/useDebounce';
import { todosCompletedFilterSelector } from '../redux/selectors';
import CompletedFilterType from '../types/CompletedFilterType';
import SnackBarActionType from '../types/SnackBarActionType';
import SnackBarType from '../types/SnackBarType';

function CreateTodo() {

    const api = useApi()
    const { addTodoItem, setTodoItems } = useActions()

    const snackBar = useSnackBar()

    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false)

    const actualFilterType = useSelector(todosCompletedFilterSelector)

    const handleDebounceSearch = useCallback((value: any) => {
        setIsSearching(true)

        api.getTodos({
            search: value,
            ...actualFilterType === CompletedFilterType.ALL ? {} :
                (actualFilterType === CompletedFilterType.COMPLETED ? { completed: true } : { completed: false })
        }).then((data) => {
            setIsSearching(false)
            setTodoItems(data)
        })
    }, [setIsSearching, api, actualFilterType, setTodoItems])

    const debouncedSearch = useDebouncedCallback(handleDebounceSearch, 1000);

    const handleChange = useCallback((ev) => {
        setSearchTerm(ev.target.value)
        debouncedSearch(ev.target.value)
    }, [setSearchTerm, debouncedSearch])

    const handleCreate = useCallback((ev) => {
        ev.preventDefault()
        if (!searchTerm)
            return

        api.createTodo(searchTerm).then((res) => {
            setSearchTerm(null)
            addTodoItem(res)
            snackBar(SnackBarActionType.SHOW, SnackBarType.SUCCESS, 'Todo created')
        })

    }, [api, addTodoItem, setSearchTerm, searchTerm, snackBar])

    return (
        <form className="fluid" onSubmit={handleCreate}>
            <FormControl fullWidth>
                <TextField
                    id="todo"
                    defaultValue={searchTerm}
                    disabled={isSearching}
                    onChange={handleChange}
                    label="Create or Search ..."
                    variant="filled"
                />
            </FormControl>
        </form>
    )
}

export default React.memo(CreateTodo)