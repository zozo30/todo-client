import ToggleFetchType from '../../types/ToggleFetchType';
import * as ActionTypes from '../constants'
import SnackBarActionType from '../../types/SnackBarActionType';
import SnackBarType from '../../types/SnackBarType';
import { Reducer } from 'redux'
import { Action, AppState } from '../types';


export const appReducer: Reducer<AppState> = (state = {
    fetchingCount: 0,
    messages: [],
}, action) => {
    switch ((action as Action).type) {
        case ActionTypes.SET_TOGGLE_FETCH:
            return {
                ...state,
                fetchingCount: action.payload === ToggleFetchType.FETCHING ? state.fetchingCount + 1 : state.fetchingCount - 1
            }
        case ActionTypes.SET_SNACKBAR:
            if (action.payload.action === SnackBarActionType.SHOW)
                return {
                    ...state,
                    messages: [...state.messages,
                    { id: action.payload.id, message: action.payload.message, type: action.payload.type === SnackBarType.SUCCESS ? "success" : "error" }]
                }

            if (action.payload.action === SnackBarActionType.CLEAR)
                return { ...state, messages: state.messages.slice(1) }

            return state;
        default:
            return state
    }
}