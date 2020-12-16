import { useSelector } from "react-redux"
import { todosCompletedFilterSelector } from '../redux/selectors'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import CompletedFilterType from '../types/CompletedFilterType'
import React, { useCallback } from "react"
import { useApi } from "../hooks/graphql/useApi"
import { useActions } from "../hooks/redux/useActions"

function CompletedFilter() {

    const api = useApi()
    const { setTodoFilter, setTodoItems } = useActions()

    const actualFilterType = useSelector(todosCompletedFilterSelector)

    const handleChange = useCallback((ev: any) => {
        api.getTodos(ev.target.value === CompletedFilterType.ALL ? {} : (ev.target.value === CompletedFilterType.COMPLETED ? { completed: true } : { completed: false }))
            .then((data) => {
                setTodoItems(data)
                setTodoFilter(ev.target.value)
            })
    }, [api, setTodoItems, setTodoFilter])

    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Filter by completed todo's</InputLabel>
                <Select
                    id="completed-filter"
                    onChange={handleChange}
                    value={actualFilterType}
                >
                    <MenuItem value={CompletedFilterType.ALL}>
                        <em>Show all</em>
                    </MenuItem>
                    <MenuItem value={CompletedFilterType.COMPLETED}>Show completed's</MenuItem>
                    <MenuItem value={CompletedFilterType.NON_COMPLETED}>Show not completed's</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default React.memo(CompletedFilter)