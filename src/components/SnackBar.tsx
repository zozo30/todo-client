import React, { useEffect } from "react";
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import { ToastMessage } from "../types/ToastMessage";

interface SnackBarItemProps {
    useTimer: boolean
    message: string
    onClose: Function
    autoHideDuration: number | undefined
    type: string
}

const SnackBarItem = React.memo(function SnackBarItem({ useTimer, message, onClose, autoHideDuration, type }: SnackBarItemProps) {
    useEffect(() => {
        if (!useTimer) return
        const timer = setTimeout(() => {
            onClose()
        }, autoHideDuration);
        return () => clearTimeout(timer)
    }, [useTimer, onClose, autoHideDuration])

    return (
        <MuiAlert severity={type as Color} className="snack-bar-item" elevation={6} variant="filled">
            {message}
        </MuiAlert>
    )
})

interface SnackBarProps {
    autoHideDuration: number | undefined
    items: Array<ToastMessage>
    onClose: Function
}

function SnackBar({ autoHideDuration, items, onClose }: SnackBarProps) {
    return (
        <div className="snack-bar-container">
            {items.map((item: ToastMessage) => (
                <SnackBarItem
                    autoHideDuration={autoHideDuration}
                    onClose={onClose}
                    key={`alert-message-${item.id}`}
                    message={item.message}
                    type={item.type}
                    useTimer={autoHideDuration !== undefined}
                />
            ))}
        </div>
    )
}

export default React.memo(SnackBar)