import { apiConstants } from '../constants'
import ToggleFetchType from '../../types/ToggleFetchType'
import SnackBarType from '../../types/SnackBarType'
import SnackBarActionType from '../../types/SnackBarActionType'

export function setToggleFetch(type: ToggleFetchType) {
    return { type: apiConstants.SET_TOGGLE_FETCH, payload: type }
}

export function setSnackBar(action: SnackBarActionType, type: SnackBarType, message?: string) {
    return { type: apiConstants.SET_SNACKBAR, payload: { type, action, message } }
}