import { Todo } from "../../interfaces/Todo"
import CompletedFilterType from "../../types/CompletedFilterType"
import { ToastMessage } from "../../types/ToastMessage"
import * as actions from '../actions'
import * as ActionTypes from '../constants'

export type AppState = {
    fetchingCount: number,
    messages: Array<ToastMessage>
}

export type TodoState = {
    take: number,
    skip: number,
    total: number,
    items: Todo[],
    completdFilter: CompletedFilterType
}

export type RootState = {
    app: AppState,
    todos: TodoState
}

export type Actions = typeof actions
export type Action = ReturnType<Actions[keyof Actions]>

export const createAction = <T extends keyof typeof ActionTypes, P>(type: T, payload?: P) => ({ type, payload: payload! })