import { useCallback } from "react";
import axios from 'axios'
import { useActions } from "../redux/useActions";
import ToggleFetchType from "../../types/ToggleFetchType";
import { useSnackBar } from "../redux/useSnackBar";
import SnackBarActionType from "../../types/SnackBarActionType";
import SnackBarType from "../../types/SnackBarType";

export function useGraphQL() {
    const { setToggleFetch } = useActions()
    const snackBar = useSnackBar()

    return useCallback(async (query = '', variables = {}) => {
        setToggleFetch(ToggleFetchType.FETCHING)
        try {
            const res = await axios.post(`${process.env.REACT_APP_GRAPHQL_PATH}`, { query, variables })
            return res.data.data
        } catch (error) {
            snackBar(SnackBarActionType.SHOW, SnackBarType.ERROR, error.response.data.errors.map((er: any) => er.message))
            throw new Error('GraphQL Error')
        } finally {
            setToggleFetch(ToggleFetchType.FETCHING_END)
        }
    }, [setToggleFetch, snackBar]);
}