import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { TodoInput } from "../../interfaces/TodoInput";

const CREATE_TODO = gql`
    mutation createTodo($input:TodoInput!){
        createTodo(input:$input){
            id,
            createdAt,
            updatedAt,
            description,
            completed
        }
    }
`

export function CreateTodo(input: TodoInput): any {
    const [mutate] = useMutation(CREATE_TODO, { variables: { input } })
    return mutate
}