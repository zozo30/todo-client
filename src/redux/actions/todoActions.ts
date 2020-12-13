import { Todo } from '../../interfaces/Todo'
import { TodoDeleteResult } from '../../interfaces/TodoDeleteResult'
import { TodoList } from '../../interfaces/TodoList'
import { TodoModifyResult } from '../../interfaces/TodoModifyResult'
import { TodoSetCompletedResponse } from '../../interfaces/TodoSetCompletedResponse'
import CompletedFilterType from '../../types/CompletedFilterType'
import { todoConstants } from '../constants'

const defaultError = 'Something went wrong!'

//create
export function todoCreateSuccess(todo: Todo) {
    return { type: todoConstants.TODO_CREATE_SUCCESS, payload: todo }
}

export function todoCreateFailure(error: string = defaultError) {
    return { type: todoConstants.TODO_CREATE_FAILURE, payload: error }
}

//list
export function todoGetAllSuccess(todos: TodoList) {
    return { type: todoConstants.TODO_GETALL_SUCCESS, payload: todos }
}

export function todoGetAllFailure(error: string = defaultError) {
    return { type: todoConstants.TODO_GETALL_FAILURE, payload: error }
}

//setcompleted
export function todoSetCompletedSuccess(payload: TodoSetCompletedResponse) {
    return { type: todoConstants.TODO_SETCOMPLETED_SUCCESS, payload }
}

export function todoSetCompletedFailure(error: string = defaultError) {
    return { type: todoConstants.TODO_SETCOMPLETED_FAILURE, payload: error }
}

//delete
export function todoDeleteSuccess(payload: TodoDeleteResult) {
    return { type: todoConstants.TODO_DELETE_SUCCESS, payload }
}

export function todoDeleteFailure(error: string = defaultError) {
    return { type: todoConstants.TODO_DELETE_FAILURE, payload: error }
}

//pagination
export function todoPaginationRequest() {
    return { type: todoConstants.TODO_PAGINATE_REQUEST }
}

export function todoPaginationEnd() {
    return { type: todoConstants.TODO_PAGINATE_END }
}

//filters
export function todoCompletedFilterChanged(filter: typeof CompletedFilterType) {
    return { type: todoConstants.TODO_COMPLETED_FILTER_CHANGED, payload: filter }
}

//modify
export function todoModifyRequest() {
    return { type: todoConstants.TODO_MODIFY_REQUEST }
}

export function todoModifySuccess(payload: TodoModifyResult) {
    return { type: todoConstants.TODO_MODIFY_SUCCESS, payload }
}

export function todoModifyFailure(error: string = defaultError) {
    return { type: todoConstants.TODO_MODIFY_FAILURE, payload: error }
}