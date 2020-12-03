import React from "react"
import { formatDate } from '../utils/formatters'
import { Checkbox, Paper, Divider, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

interface CheckboxProps {
    checked: boolean
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
}


export const TodoItem: React.FC<TodoItemProps> =
    ({ id, createdAt, updatedAt, description, completed }) => {
        return (
            <>
                <li key={id} className="todo-item">
                    <Paper>
                        <Grid container alignItems="center">
                            <div className="date-container">
                                <p>createdAt:</p>
                                <p>{formatDate(createdAt)}</p>
                            </div>

                            <Divider orientation="vertical" flexItem />
                            <div className="date-container">
                                <p>updatedAt:</p>
                                <p>{formatDate(updatedAt)}</p>
                            </div>
                        </Grid>

                        <div className="flex">
                            <p className="description">{description}</p>
                            <GreenCheckbox checked={completed} />
                        </div>
                    </Paper>
                </li>
            </>
        )
    }