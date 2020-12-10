import { Todo } from "./Todo";

export interface TodoList {
    page: number
    pages: number
    total: number
    items: Todo[]
}