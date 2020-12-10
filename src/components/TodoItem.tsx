import React from "react"
import { formatDate } from '../utils/formatters'
import { Checkbox, Paper, Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

interface CheckboxProps {
    checked: boolean
    onChange(ev: any): void
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export interface TodoItemProps {
    id: number
    createdAt: string
    updatedAt: string
    description: string
    completed: boolean
    onCompletedChange(ev: any): void
}

export const TodoItem =
    ({ id, createdAt, updatedAt, description, completed, onCompletedChange }: TodoItemProps) => {

        const handleDelete = () => {
            
        }

        return (
            <>
                <li key={id} className="todo-item">
                    <Paper>
                        <Grid alignItems="center" container spacing={2}>
                            <Grid item xs={1}>
                                <GreenCheckbox onChange={onCompletedChange} checked={completed} />
                            </Grid>
                            <Grid item xs={9}>
                                <p className="description">{description}</p>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    onClick={handleDelete}
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                            </Button>
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