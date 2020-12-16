import { Reducer } from 'redux'
import { Todo } from '../../interfaces/Todo'
import CompletedFilterType from '../../types/CompletedFilterType'
import * as ActionTypes from '../constants'
import { Action, TodoState } from '../types'

const todoReducer: Reducer<TodoState> = (state = {
    take: 10,
    skip: 0,
    total: 0,
    items: [],
    completdFilter: CompletedFilterType.ALL
}, action: any) => {
    switch ((action as Action).type) {
        case ActionTypes.SET_TODO_ITEMS:
            return { ...state, ...action.payload }
        case ActionTypes.ADD_TODO_ITEM:
            return { ...state, items: [action.payload, ...state.items] }
        case ActionTypes.REMOVE_TODO_ITEM:
            return { ...state, items: state.items.filter((todo: Todo) => todo.id !== action.payload.id) }
        case ActionTypes.UPDATE_TODO_ITEM:
            return { ...state, items: state.items.map((todo: Todo) => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo) }
        case ActionTypes.SET_TODO_FILTER:
            return { ...state, completdFilter: action.payload }
        default:
            return state
    }
}

export default todoReducer