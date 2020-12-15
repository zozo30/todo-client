import { Button, Grid, Paper, Checkbox, TextField, FormControl, ClickAwayListener } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { useCallback, useState } from "react";
import { useApi } from "../hooks/graphql/useApi";
import { useActions } from "../hooks/redux/useActions";
import { formatDate } from '../utils/formatters'
import { todosIsItemUpdatingSelector } from '../redux/selectors/todoSelectors'
import { useSelector } from "react-redux";
import SnackBarActionType from "../types/SnackBarActionType";
import SnackBarType from "../types/SnackBarType";
import React from "react";

export interface TodoItemProps {
    id: string
    createdAt: string
    updatedAt: string
    description: string
    completed: boolean
}

enum ItemUIStateTypes {
    DISPLAY,
    EDIT
}

function TodoItem({ id, createdAt, updatedAt, completed, description }: TodoItemProps) {

    const api = useApi()
    const { todoUpdateItem, todoRemoveItem, setSnackBar } = useActions()

    const [uiState, setUIState] = useState(ItemUIStateTypes.DISPLAY)
    const [editText, setEditText] = useState(description)

    const isUpdating = useSelector(todosIsItemUpdatingSelector)

    const handleCompletedChange = useCallback((ev: any) => {
        api.setTodoCompleted(id, ev.target.checked).then(res => {
            todoUpdateItem(res.setCompleted)
            setSnackBar(SnackBarActionType.SHOW, SnackBarType.SUCCESS, 'Completed flag changed successfully')
        }).catch(() => { })
    }, [todoUpdateItem, setSnackBar, api, id])

    const handleDelete = useCallback(() => {
        api.deleteTodo(id).then(res => {
            if (res.removed) {
                todoRemoveItem(res)
                setSnackBar(SnackBarActionType.SHOW, SnackBarType.SUCCESS, 'Todo deleted')
            } else {

            }
        }).catch(er => { })
    }, [todoRemoveItem, setSnackBar, api, id])

    const handleEdit = useCallback(() => {
        setUIState(ItemUIStateTypes.EDIT)
    }, [])

    const handleCancelEdit = useCallback(() => {
        setUIState(ItemUIStateTypes.DISPLAY)
    }, [])

    const handleClickAway = useCallback(() => {
        setUIState(ItemUIStateTypes.DISPLAY)
    }, [])

    const handleUpdate = useCallback(() => {

        api.modifyTodo(id, editText).then((data) => {
            todoUpdateItem(data)
            setUIState(ItemUIStateTypes.DISPLAY)
            setSnackBar(SnackBarActionType.SHOW, SnackBarType.SUCCESS, 'Todo update completed')
        }).catch(() => {
        })

    }, [todoUpdateItem, setSnackBar, api, id, editText])

    const handleEditInputChange = useCallback((ev: any) => {
        setEditText(ev.target.value)
    }, [])

    return (
        <>
            <li key={id} className="todo-item">
                <Paper>
                    <Grid alignItems="center" container spacing={2}>
                        <Grid item xs={1}>
                            <Checkbox onChange={handleCompletedChange} checked={completed} />
                        </Grid>
                        <Grid item xs={9}>
                            {uiState === ItemUIStateTypes.DISPLAY ?
                                <p onClick={handleEdit} className="description">{description}</p>
                                :
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows={4}
                                            autoFocus={true}
                                            id="editInput"
                                            onChange={handleEditInputChange}
                                            defaultValue={description} />
                                    </FormControl>
                                </ClickAwayListener>
                            }
                        </Grid>
                        <Grid item xs={1}>
                            {uiState === ItemUIStateTypes.DISPLAY ?
                                <Button
                                    onClick={handleDelete}
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                            </Button>
                                :
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="default"
                                            disabled={isUpdating}
                                            onClick={handleCancelEdit}
                                            startIcon={<CancelPresentationIcon />}
                                        >
                                            Cancel
                                    </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            disabled={isUpdating}
                                            onClick={handleUpdate}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                    </Button>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
                <Grid className="date-container">
                    created: {formatDate(createdAt)} | updated: {formatDate(updatedAt)}
                </Grid>
            </li>
        </>
    )
}

export default React.memo(TodoItem)