import { Todo } from '../../interfaces/Todo'
import CompletedFilterType from '../../types/CompletedFilterType'
import { todoConstants } from '../constants'

export default function todoReducer(state = {
    page: 0,
    pages: 0,
    total: 0,
    items: [],
    isPaginate: false,
    isUpdating: false,
    completdFilter: CompletedFilterType.ALL
}, action: any) {
    switch (action.type) {
        case todoConstants.TODO_SET_ITEMS:
            return { ...state, ...action.payload }
        case todoConstants.TODO_ADD_ITEM:
            return { ...state, items: [action.payload, ...state.items] }
        case todoConstants.TODO_REMOVE_ITEM:
            return { ...state, items: state.items.filter((todo: Todo) => todo.id !== action.payload.id) }
        case todoConstants.TODO_UPDATE_ITEM:
            return { ...state, items: state.items.map((todo: Todo) => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo) }
        case todoConstants.TODO_SET_FILTER:
            return { ...state, completdFilter: action.payload }
        default:
            return state

    }
}