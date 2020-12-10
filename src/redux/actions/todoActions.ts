import { Todo } from '../../interfaces/Todo'
import { TodoList } from '../../interfaces/TodoList'
import { todoConstants } from '../constants'

export function todoCreateSuccess(todo: Todo) {
    return { type: todoConstants.TODO_CREATE_SUCCESS, payload: todo }
}

export function todoCreateFailure(error: string) {
    return { type: todoConstants.TODO_CREATE_FAILURE, payload: error }
}

export function todoGetAllSuccess(todos: TodoList) {
    return { type: todoConstants.TODO_GETALL_SUCCESS, payload: todos }
}

export function todoGetAllFailure(error: string) {
    return { type: todoConstants.TODO_GETALL_FAILURE, payload: error }
}