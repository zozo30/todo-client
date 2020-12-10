import { useMemo } from 'react';
import * as queries from '../../api/queries'
import { useGraphQL } from './useGraphQL'

export function useApi() {
    const graphQL = useGraphQL();

    return useMemo(() => ({
        getTodo: (id: number) => graphQL(queries.GetTodo, { id }).then(data => data.data.todo),
        getTodos: (filters: any) => graphQL(queries.GetTodos, { filters }).then(data => data.data.data.todos)
    }), [graphQL]);
}