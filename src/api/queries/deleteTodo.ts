
export const DeleteTodo = `
mutation deleteTodo($id:Int!){
    removeTodo(id:$id){
       id,
       removed
    }
}
`