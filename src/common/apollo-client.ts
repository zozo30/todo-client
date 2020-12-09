import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Todo: {
                keyFields: ['id']
            }
        }
    })
})

export default client