import { useMemo } from 'react';
import * as queries from '../../api/queries'
import { useGraphQL } from './useGraphQL'

export function useApi() {
    const graphQL = useGraphQL();

    return useMemo(() => ({
        getTodo: (id: string) => graphQL(queries.GetTodo, { id }).then(res => res.data.todo),
        getTodos: (filters: any) => graphQL(queries.GetTodos, { filters }).then(res => res.data.todos),
        setTodoCompleted: (id: string, completed: boolean) => graphQL(queries.SetTodoCompletedField, { input: { id, completed } }).then(res => res.data),
        createTodo: (description: string) => graphQL(queries.CreateTodo, { input: { description } }).then(res => res.data.createTodo),
        deleteTodo: (id: string) => graphQL(queries.DeleteTodo, { id }).then(res => res.data.removeTodo),
        modifyTodo: (id: string, description: string) => graphQL(queries.ModifyTodo, { input: { id, description } }).then(res => res.data.modifyTodo)
    }), [graphQL]);
}