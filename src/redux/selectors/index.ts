import { Todo } from "../../interfaces/Todo";
import CompletedFilterType from "../../types/CompletedFilterType";

export interface AppState {
    fetchingCount: number
}

export interface TodoState {
    page: number,
    pages: number,
    total: number,
    items: Todo[],
    isPaginate: boolean,
    isUpdating: boolean,
    completdFilter: CompletedFilterType
}

export interface State {
    app: AppState
    todos: TodoState
}