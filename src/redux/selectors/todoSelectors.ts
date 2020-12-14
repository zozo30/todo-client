import { createSelector } from 'reselect';
import { State } from '.';
import CompletedFilterType from '../../types/CompletedFilterType';

export const todosItemsSelector = (state: State) => state.todos.items
export const todosCurrentPageSelector = (state: State) => state.todos.page
export const todosMaxPagesSelector = (state: State) => state.todos.pages
export const todosTotalRecordsSelector = (state: State) => state.todos.total

export const todosIsPaginatingSelector = (state: State) => state.todos.isPaginate

export const todosIsItemUpdatingSelector = (state: State) => state.todos.isUpdating

export const todosCompletedFilterSelector = (state: State) => state.todos.completdFilter

export const todosFilterSelector = createSelector(
    todosCompletedFilterSelector,
    (completedfilter: CompletedFilterType) => completedfilter === CompletedFilterType.ALL ? {} : (completedfilter === CompletedFilterType.COMPLETED ? { completed: true } : { completed: false })
)