import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { TodoFilter } from "../../interfaces/TodoFilter";

export const GET_TODOS = gql`
    query getTodos($filters:TodoFilter!){
        todos(filters:$filters){
            page,
            pages,
            total,
            items{
                id,
                createdAt,
                updatedAt,
                description,
                completed
            }
        }
    }
`

export function GetTodos(filters: TodoFilter = {}) {
    const mutation = useQuery(GET_TODOS, {
        variables: { filters }
    })
    return mutation
}