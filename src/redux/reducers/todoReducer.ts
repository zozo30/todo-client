import { todoConstants } from '../constants'

export default function todoReducer(state = {
    todos: {
        page: 0,
        pages: 0,
        total: 0,
        items: []
    }
}, action: any) {
    switch (action.type) {
        case todoConstants.TODO_GETALL_SUCCESS:
            return { ...state, todos: action.payload }
        default:
            return state
    }
}