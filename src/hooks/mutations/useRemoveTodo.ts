import { gql } from "@apollo/client/core";

export const REMOVE_TODO = gql`
    mutation setCompleted($id:Int!){
        removeTodo(id:$id)
    }
`