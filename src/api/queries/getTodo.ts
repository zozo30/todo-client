
export const GetTodo = `
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