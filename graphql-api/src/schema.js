const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;

