
export const GetTodos = `
query getTodos($filters:TodoFilter){
        todos(filters:$filters){
            total
            skip
            take
            items {
              id
              createdAt
              updatedAt
              description
              completed
            }
        }
    }
`