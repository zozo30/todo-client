import { appReducer } from './appReducer'
import todoReducer from './todoReducer'
import { combineReducers, Reducer } from 'redux'
import { RootState } from '../types'

const rootReducer: Reducer<RootState> = combineReducers({
    app: appReducer,
    todos: todoReducer
})

export default rootReducer