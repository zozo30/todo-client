import { Button, Grid, Paper, Checkbox, TextField, FormControl, ClickAwayListener } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { useRef, useState } from "react";
import { useApi } from "../hooks/graphql/useApi";
import { useActions } from "../hooks/redux/useActions";
import { formatDate } from '../utils/formatters'
import { todosIsItemUpdatingSelector } from '../redux/selectors/todoSelectors'
import { useSelector } from "react-redux";

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

export default function TodoItem({ id, createdAt, updatedAt, completed, description }: TodoItemProps) {

    const api = useApi()
    const { todoSetCompletedSuccess, todoDeleteSuccess, todoDeleteFailure, todoSetCompletedFailure, todoModifyRequest, todoModifySuccess, todoModifyFailure } = useActions()

    const [uiState, setuiState] = useState(ItemUIStateTypes.DISPLAY)
    const isUpdating = useSelector(todosIsItemUpdatingSelector)

    const updateInputRef = useRef<HTMLInputElement>(null)

    const handleCompletedChange = (ev: any) => {
        api.setTodoCompleted(id, ev.target.checked).then(res => todoSetCompletedSuccess(res.setCompleted)).catch(er => todoSetCompletedFailure())
    }

    const handleDelete = () => {
        api.deleteTodo(id).then(res => res.removed ? todoDeleteSuccess(res) : todoDeleteFailure()).catch(er => todoDeleteFailure())
    }

    const handleEdit = () => {
        setuiState(ItemUIStateTypes.EDIT)
    }

    const handleCancelEdit = () => {
        setuiState(ItemUIStateTypes.DISPLAY)
    }

    const handleClickAway = () => {
        setuiState(ItemUIStateTypes.DISPLAY)
    }

    const handleUpdate = () => {
        if (updateInputRef.current) {
            todoModifyRequest()
            api.modifyTodo(id, updateInputRef.current.value).then((data) => {
                todoModifySuccess(data)
                setuiState(ItemUIStateTypes.DISPLAY)
            }).catch(() => {
                todoModifyFailure()
            })
        }
    }

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
                                            inputRef={updateInputRef}
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