import { todoConstants } from '../constants'

export function todoSetItems(payload: any) {
    return { type: todoConstants.TODO_SET_ITEMS, payload }
}

export function todoAddItem(payload: any) {
    return { type: todoConstants.TODO_ADD_ITEM, payload }
}

export function todoUpdateItem(payload: any) {
    return { type: todoConstants.TODO_UPDATE_ITEM, payload }
}

export function todoRemoveItem(payload: any) {
    return { type: todoConstants.TODO_REMOVE_ITEM, payload }
}

export function todoSetFilter(payload: any) {
    return { type: todoConstants.TODO_SET_FILTER, payload }
}