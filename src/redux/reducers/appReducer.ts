import { apiConstants } from '../constants'

export default function appReducer(state = {
    fetchingCount: 0,
}, action: any) {
    switch (action.type) {
        case apiConstants.FETCHING_START:
            return { ...state, fetchingCount: state.fetchingCount + 1 }
        case apiConstants.FETCHING_END:
            return { ...state, fetchingCount: state.fetchingCount - 1 }
        default:
            return state;
    }
}