
export const SetTodoCompletedField = `
mutation setTodoCompletedField($input:TodoCompletedInput!){
    setCompleted(input:$input){
        id,
        completed
    }
}
`