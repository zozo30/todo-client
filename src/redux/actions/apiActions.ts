import { apiConstants } from '../constants'

export function fecthingStart() {
    return { type: apiConstants.FETCHING_START }
}

export function fetchingEnd() {
    return { type: apiConstants.FETCHING_END }
}