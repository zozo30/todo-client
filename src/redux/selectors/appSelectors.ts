import { createSelector } from 'reselect'
import { State } from './index';

const fetchingCountSelector = (state: State) => state.app.fetchingCount;

export const isFetchingSelector = createSelector(fetchingCountSelector, (fetchingCount) => fetchingCount > 0)
export const snackBarMessagesSelector = (state: State) => state.app.messages