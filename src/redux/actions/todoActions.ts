import { Todo } from '../../interfaces/Todo'
import { TodoList } from '../../interfaces/TodoList'
import * as ActionTypes from '../constants'
import { createAction } from '../types'


export const setTodoItems = (items: TodoList) => createAction(ActionTypes.SET_TODO_ITEMS, items)
export const addTodoItem = (item: Todo) => createAction(ActionTypes.ADD_TODO_ITEM, item)
export const updateTodoItem = (item: Todo) => createAction(ActionTypes.UPDATE_TODO_ITEM, item)
export const removeTodoItem = (item: Todo) => createAction(ActionTypes.REMOVE_TODO_ITEM, item)
export const setTodoFilter = (filter: number) => createAction(ActionTypes.SET_TODO_FILTER, filter)