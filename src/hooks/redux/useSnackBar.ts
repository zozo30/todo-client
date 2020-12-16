import { useCallback } from "react";
import shortid from "shortid";
import SnackBarActionType from "../../types/SnackBarActionType";
import SnackBarType from "../../types/SnackBarType";
import { useActions } from "./useActions";

export const useSnackBar = () => {

    const { setSnackBar } = useActions()

    return useCallback((action: SnackBarActionType, type: SnackBarType, message?: string) => {
        setSnackBar(shortid.generate(), action, type, message)
    }, [setSnackBar])

}