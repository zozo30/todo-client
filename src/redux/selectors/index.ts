import { TodoList } from "../../interfaces/TodoList";

export interface AppState {
    fetchingCount: number
}

export interface TodoState {
    todos: TodoList
}

export interface State {
    app: AppState
    todos: TodoState
}