import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

const SET_COMPLETED = gql`
    mutation setCompleted($input:TodoCompletedInput!){
        setCompleted(input:$input)
    }
`

export function SetCompleted(input: any): any {
    const [mutate] = useMutation(SET_COMPLETED)
    return mutate({ variables: { input } })
}