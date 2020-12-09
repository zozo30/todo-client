import React from "react"
import { formatDate } from '../utils/formatters'
import { Checkbox, Paper, Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import { REMOVE_TODO } from '../hooks/mutations/useRemoveTodo'
import { gql, Reference, StoreObject, useMutation } from "@apollo/client";
import { GET_TODOS } from "../hooks/queries";

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

        const [deleteMutation, { loading }] = useMutation(REMOVE_TODO)

        const handleDelete = () => {
            deleteMutation({
                variables: { id },
                update: (cache) => {
                    console.log('update')
                    /*
                    cache.modify({
                        id: cache.identify({ id }),
                        fields: {
                            todos(existingTodos = [], { readField }) {
                                console.log('itt')
                                existingTodos.forEach(((todoRef: any) => {
                                    console.log(readField('id',todoRef))
                                }))
                                return existingTodos.filter((todoRef: StoreObject | Reference | undefined) => `Todo:${id}` !== readField('id', todoRef))
                            }
                        }
                    })
                    */

                    const todos: any = cache.readQuery({ query: GET_TODOS, variables: { filters: {} } })

                    const data = JSON.parse(JSON.stringify(todos))

                    data.todos.items = data.todos.items.filter((t: { id: number; }) => {
                        return t.id !== id;
                    })

                    cache.writeQuery({ query: GET_TODOS, data })

                    //console.log('after items:', data)

                    /*
                    const todo = cache.readFragment({
                        id: `Todo:${id}`,
                        fragment: gql`
                            fragment MyTodo on Todo {
                            id
                            completed
                            }
                        `,
                    });
                    */

                    //console.log(todo)
                    /*
                    const todos = cache.readQuery({ query: GET_TODOS, variables: { filters: {} } })
         
                    console.log(todos);
                    */
                    /*
                    cache.modify({
                        id: cache.identify({ id }),
                        fields: {
                            todos(existingTodos = [], { readField }) {
                                return existingTodos.filter((todoRef: StoreObject | Reference | undefined) => id !== readField('id', todoRef))
                            }
                        }
                    })
                    */

                }
            })
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
                                    disabled={loading}
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