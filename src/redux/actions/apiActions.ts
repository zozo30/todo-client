import SnackBarActionType from '../../types/SnackBarActionType'
import SnackBarType from '../../types/SnackBarType'
import { createAction } from '../types'
import * as ActionTypes from '../constants'

export const setToggleFetch = (type: number) =>
    createAction(ActionTypes.SET_TOGGLE_FETCH, type)

export const setSnackBar = (id: string, action: SnackBarActionType, type: SnackBarType, message?: string) =>
    createAction(ActionTypes.SET_SNACKBAR, { id, action, type, message })
