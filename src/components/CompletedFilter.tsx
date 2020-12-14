import { useSelector } from "react-redux"
import { todosCompletedFilterSelector } from '../redux/selectors/todoSelectors'
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import CompletedFilterType from '../types/CompletedFilterType'
import React from "react"
import { useApi } from "../hooks/graphql/useApi"
import { useActions } from "../hooks/redux/useActions"

export default function CompletedFilter() {

    const api = useApi()
    const { todoSetFilter, todoSetItems } = useActions()

    const actualFilterType = useSelector(todosCompletedFilterSelector)

    const handleChange = (ev: any) => {
        const filters: any = {}
        switch (ev.target.value) {
            case CompletedFilterType.COMPLETED:
                filters.completed = true
                break
            case CompletedFilterType.NON_COMPLETED:
                filters.completed = false
                break
        }

        api.getTodos(filters).then((data) => {
            todoSetFilter(ev.target.value)
            todoSetItems(data)
        }).catch(() => {
        })
    }

    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Filter by completed todo</InputLabel>
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