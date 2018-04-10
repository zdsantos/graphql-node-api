import { makeExecutableSchema } from 'graphql-tools';

// Mocks
const users = [
  {
    id: 1,
    name: 'John',
    email: 'john@email.com'
  },
  {
    id: 2,
    name: 'James',
    email: 'james@email.com'
  }
]


const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: (parent, args) => {
      const newuser = Object.assign({id: users.length + 1}, args);
      users.push(newuser);
      return newuser;
    }
  }
};

export default makeExecutableSchema({typeDefs, resolvers});