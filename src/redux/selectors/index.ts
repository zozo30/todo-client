import { createSelector } from 'reselect';
import rootReducer from '../reducers';

type State = Readonly<ReturnType<typeof rootReducer>>

const fetchingCountSelector = (state: State) => state.app.fetchingCount;
export const isFetchingSelector = createSelector(fetchingCountSelector, (fetchingCount) => fetchingCount > 0)
export const snackBarMessagesSelector = (state: State) => state.app.messages


export const todosItemsSelector = (state: State) => state.todos.items
export const todosFilterTakeSelector = (state: State) => state.todos.take
export const todosFilterSkipSelector = (state: State) => state.todos.skip
export const todosTotalRecordsSelector = (state: State) => state.todos.total
export const todosCompletedFilterSelector = (state: State) => state.todos.completdFilter

export const todosActualPageSelector = createSelector(
    todosFilterTakeSelector,
    todosFilterSkipSelector,
    (take, skip) => Math.floor(skip / take) + 1
)

export const todosMaxPageSelector = createSelector(
    todosTotalRecordsSelector,
    todosFilterTakeSelector,
    (total, take) => Math.ceil(total / take)
)