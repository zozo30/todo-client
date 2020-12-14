import { useCallback } from "react";
import axios from 'axios'
import { useActions } from "../redux/useActions";
import ToggleFetchType from "../../types/ToggleFetchType";

export function useGraphQL() {
    const { setToggleFetch } = useActions()

    return useCallback(async (query = '', variables = {}) => {
        setToggleFetch(ToggleFetchType.FETCHING)
        try {
            const res = await axios.post(`${process.env.REACT_APP_GRAPHQL_PATH}`, { query, variables })
            return { success: true, data: res.data.data }
        } catch (error) {
            return { success: false, error }
        } finally {
            setToggleFetch(ToggleFetchType.FETCHING_END)
        }
    }, [setToggleFetch]);
}