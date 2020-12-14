import { createSelector } from 'reselect'
import { State } from './index';

const fetchingCountSelector = (state: State) => state.app.fetchingCount;

export const isFetchingSelector = createSelector(fetchingCountSelector, (fetchingCount) => fetchingCount > 0)
export const snackBarSuccessMessagesSelector = (state: State) => state.app.successMessages
export const snackBarFailureMessagesSelector = (state: State) => state.app.failureMessages

export const snackBarSuccessOpenSelector = createSelector(snackBarSuccessMessagesSelector, (messages) => messages.length > 0)
export const snackBarFailureOpenSelector = createSelector(snackBarFailureMessagesSelector, (messages) => messages.length > 0)