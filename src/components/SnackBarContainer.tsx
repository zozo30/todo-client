import SnackBar from './SnackBar'
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/redux/useActions'
import { snackBarMessagesSelector } from '../redux/selectors/appSelectors'
import SnackBarActionType from '../types/SnackBarActionType';
import SnackBarType from '../types/SnackBarType';

function SuccessSnackBar() {

    const snackBarMessages = useSelector(snackBarMessagesSelector)

    const { setSnackBar } = useActions()

    const handleClose = useCallback(() => {
        setSnackBar(SnackBarActionType.CLEAR, SnackBarType.SUCCESS)
    }, [setSnackBar])


    return (
        <SnackBar onClose={handleClose} autoHideDuration={4000} items={snackBarMessages} />
    )
}

export default React.memo(SuccessSnackBar)