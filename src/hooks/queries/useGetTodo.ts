import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { Todo } from "../../interfaces/Todo";

const GET_TODO = gql`
    query getTodos($id:Int!){
        todo(id:$id){
            id,
            createdAt,
            updatedAt,
            description,
            completed
        }
    }
`

export function GetTodo(id: number): Todo {
    const { data } = useQuery(GET_TODO, {
        variables: { id }
    })
    return data?.todo
}