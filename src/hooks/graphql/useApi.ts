import { useMemo } from 'react';
import * as queries from '../../api/queries'
import { useGraphQL } from './useGraphQL'

export function useApi() {
    const graphQL = useGraphQL();

    return useMemo(() => ({
        getTodo: (id: string) => graphQL(queries.GetTodo, { id }).then(res => res.todo),
        getTodos: (filters: any) => graphQL(queries.GetTodos, { filters }).then(res => res.todos),
        setTodoCompleted: (id: string, completed: boolean) => graphQL(queries.SetTodoCompletedField, { input: { id, completed } }).then(res => res),
        createTodo: (description: string) => graphQL(queries.CreateTodo, { input: { description } }).then(res => res.createTodo),
        deleteTodo: (id: string) => graphQL(queries.DeleteTodo, { id }).then(res => res.removeTodo),
        modifyTodo: (id: string, description: string) => graphQL(queries.ModifyTodo, { input: { id, description } }).then(res => res.modifyTodo)
    }), [graphQL]);
}