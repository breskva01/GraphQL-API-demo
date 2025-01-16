const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users(name: String, email: String): [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;