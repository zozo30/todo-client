import SnackBar from './SnackBar'
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'
import { snackBarMessagesSelector } from '../redux/selectors'
import SnackBarActionType from '../types/SnackBarActionType';
import SnackBarType from '../types/SnackBarType';
import { useSnackBar } from '../hooks/redux/useSnackBar';

function SuccessSnackBar() {

    const snackBarMessages = useSelector(snackBarMessagesSelector)

    const snackBar = useSnackBar()

    const handleClose = useCallback(() => {
        snackBar(SnackBarActionType.CLEAR, SnackBarType.SUCCESS)
    }, [snackBar])


    return (
        <SnackBar onClose={handleClose} autoHideDuration={4000} items={snackBarMessages} />
    )
}

export default React.memo(SuccessSnackBar)