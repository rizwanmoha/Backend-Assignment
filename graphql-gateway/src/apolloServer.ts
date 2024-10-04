import { ApolloServer } from '@apollo/server';
import typeDefs from './typedef';
import mutations from './mutations';
import queries from './queries';
import { resolvers } from './resolvers';

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
           ${typeDefs}

           type Query {
             ${queries}
           }

           type Mutation {
             ${mutations}
           }
        `,
    resolvers: {
      Query: {
        ...resolvers.queries
      },
      Mutation: {
        ...resolvers.mutations
      }
    }
  });


  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
