import SnackBarActionType from '../../types/SnackBarActionType';
import SnackBarType from '../../types/SnackBarType';
import ToggleFetchType from '../../types/ToggleFetchType';
import { apiConstants } from '../constants'
import shortid from 'shortid'
import { ToastMessage } from '../../types/ToastMessage';


export default function appReducer(state = {
    fetchingCount: 0,
    messages: [] as Array<ToastMessage>,
}, action: any) {
    switch (action.type) {
        case apiConstants.SET_TOGGLE_FETCH:
            return { ...state, fetchingCount: action.payload.type === ToggleFetchType.FETCHING ? state.fetchingCount + 1 : state.fetchingCount - 1 }
        case apiConstants.SET_SNACKBAR:
            switch (action.payload.action as SnackBarActionType) {
                case SnackBarActionType.SHOW:
                    return { ...state, messages: [...state.messages, { id: shortid.generate(), message: action.payload.message, type: action.payload.type === SnackBarType.SUCCESS ? 'success' : 'error' }] }
                case SnackBarActionType.CLEAR:
                    return { ...state, messages: state.messages.filter((_v, i) => i !== 0) }

            }
            break
        default:
            return state;
    }
}