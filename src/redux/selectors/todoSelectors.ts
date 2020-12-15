import { State } from '.';

export const todosItemsSelector = (state: State) => state.todos.items
export const todosCurrentPageSelector = (state: State) => state.todos.page
export const todosMaxPagesSelector = (state: State) => state.todos.pages
export const todosTotalRecordsSelector = (state: State) => state.todos.total

export const todosIsPaginatingSelector = (state: State) => state.todos.isPaginate

export const todosIsItemUpdatingSelector = (state: State) => state.todos.isUpdating

export const todosCompletedFilterSelector = (state: State) => state.todos.completdFilter