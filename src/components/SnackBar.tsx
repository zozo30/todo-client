import React, { useEffect } from "react";
import MuiAlert from '@material-ui/lab/Alert';

interface SnackBarItemProps {
    useTimer: boolean
    message: string
    onClose: Function
    autoHideDuration: number | undefined
    id: string
}

const MemoizedItem = React.memo(function SnackBarItem({ useTimer, message, onClose, autoHideDuration }: SnackBarItemProps) {
    useEffect(() => {
        if (useTimer) {
            const timer = setTimeout(() => {
                onClose()
            }, autoHideDuration);
            return () => clearTimeout(timer)
        }
    }, [useTimer, onClose, autoHideDuration])

    return (
        <MuiAlert className="snack-bar-item" elevation={6} variant="filled">
            {message}
        </MuiAlert>
    )
})

interface SnackBarProps {
    autoHideDuration: number | undefined
    items: Array<any>
    onClose: Function
}

function SnackBar({ autoHideDuration, items, onClose }: SnackBarProps) {
    return (
        <div className="snack-bar-container">
            {items.map((item: any) => (
                <MemoizedItem
                    id={item.id}
                    autoHideDuration={autoHideDuration}
                    onClose={onClose}
                    key={`alert-message-${item.id}`}
                    message={item.message}
                    useTimer={autoHideDuration !== undefined}
                />
            ))}
        </div>
    )
}

export default React.memo(SnackBar)