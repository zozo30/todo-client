export const ModifyTodo = `
mutation modifyTodo($input:TodoModifyInput!){
    modifyTodo(input:$input){
        id,
        description
        updatedAt
        createdAt
        completed
    }
}
`