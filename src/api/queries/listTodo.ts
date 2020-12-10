
export const GetTodos = `
query getTodos($filters:TodoFilter){
        todos(filters:$filters){
            page
            pages
            total
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