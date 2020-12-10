import appReducer from './appReducer'
import todoReducer from './todoReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    app: appReducer,
    todos: todoReducer
})

export default rootReducer