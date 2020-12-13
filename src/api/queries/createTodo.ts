
export const CreateTodo = `
mutation createTodo($input:TodoInput!){
    createTodo(input:$input){
        id,
        createdAt
        updatedAt
        description
        completed
    }
}
`