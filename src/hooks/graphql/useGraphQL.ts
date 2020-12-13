import { useCallback } from "react";
import axios from 'axios'
import { useActions } from "../redux/useActions";

export function useGraphQL() {
    const { fecthingStart, fetchingEnd } = useActions()

    return useCallback(async (query = '', variables = {}) => {
        fecthingStart()
        try {
            const res = await axios.post(`${process.env.REACT_APP_GRAPHQL_PATH}`, { query, variables })
            return { success: true, data: res.data.data }
        } catch (error) {
            return { success: false, error }
        } finally {
            fetchingEnd()
        }
    }, [fecthingStart, fetchingEnd]);
}