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
        case todoConstants.TODO_GETALL_SUCCESS:
            return { ...state, ...action.payload }
        case todoConstants.TODO_SETCOMPLETED_SUCCESS:
            return { ...state, items: state.items.map((todo: Todo) => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo) }
        case todoConstants.TODO_CREATE_SUCCESS:
            return { ...state, items: [action.payload, ...state.items] }
        case todoConstants.TODO_DELETE_SUCCESS:
            return { ...state, items: state.items.filter((todo: Todo) => todo.id !== action.payload.id) }
        case todoConstants.TODO_PAGINATE_REQUEST:
            return { ...state, isPaginate: true }
        case todoConstants.TODO_PAGINATE_END:
            return { ...state, isPaginate: false }
        case todoConstants.TODO_MODIFY_REQUEST:
            return { ...state, isUpdating: true }
        case todoConstants.TODO_MODIFY_FAILURE:
            return { ...state, isUpdating: false }
        case todoConstants.TODO_MODIFY_SUCCESS:
            return { ...state, items: state.items.map((todo: Todo) => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo), isUpdating: false }
        case todoConstants.TODO_COMPLETED_FILTER_CHANGED:
            return { ...state, completdFilter: action.payload }
        default:
            return state
    }
}