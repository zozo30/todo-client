import { State } from '.';

export const todosItemsSelector = (state: State) => state.todos.todos.items
export const todosCurrentPageSelector = (state: State) => state.todos.todos.page
export const todosMaxPagesSelector = (state: State) => state.todos.todos.pages
export const todosTotalRecordsSelector = (state: State) => state.todos.todos.total