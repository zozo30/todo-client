import SnackBarActionType from '../../types/SnackBarActionType';
import SnackBarType from '../../types/SnackBarType';
import ToggleFetchType from '../../types/ToggleFetchType';
import { apiConstants } from '../constants'
import shortid from 'shortid'

interface ToastMessage {
    id: string
    message: string
}

export default function appReducer(state = {
    fetchingCount: 0,
    successMessages: [] as Array<ToastMessage>,
    failureMessages: [] as Array<ToastMessage>,
}, action: any) {
    switch (action.type) {
        case apiConstants.SET_TOGGLE_FETCH:
            return { ...state, fetchingCount: action.payload.type === ToggleFetchType.FETCHING ? state.fetchingCount + 1 : state.fetchingCount - 1 }
        case apiConstants.SET_SNACKBAR:
            switch (action.payload.action as SnackBarActionType) {
                case SnackBarActionType.SHOW:
                    switch (action.payload.type) {
                        case SnackBarType.SUCCESS:
                            return { ...state, successMessages: [...state.successMessages, { id: shortid.generate(), message: action.payload.message }] }
                        case SnackBarType.ERROR:
                            return { ...state, failureMessages: [...state.failureMessages, { id: shortid.generate(), message: action.payload.message }] }
                    }
                    break
                case SnackBarActionType.CLEAR:
                    switch (action.payload.type) {
                        case SnackBarType.SUCCESS:
                            return { ...state, successMessages: state.successMessages.filter((_v, i) => i !== 0) }
                        case SnackBarType.ERROR:
                            return { ...state, failureMessages: state.failureMessages.filter((_v, i) => i !== 0) }
                    }
                    break
            }
            break;
        default:
            return state;
    }
}

