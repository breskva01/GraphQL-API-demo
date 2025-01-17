const userRepo = require('./repo/userRepo');
const emailValidator = require('./service/emailValidator');
const{ mapUserToGraphQL } = require('./service/userMapper');
const { GraphQLError } = require('graphql');

const resolvers = {
    Query: {
      users: async (parent, args) => {
        try {
          const {name, email} = args;
          const users = await userRepo.getUsers(name, email);
          return users.map(mapUserToGraphQL);
        }
        catch (err) {
          throw new Error('Failed to fetch users');
        }
      },
    },
    Mutation: {
      addUser: async (parent, args) => {
        try {
          const {name, email} = args;
          if (!emailValidator.isValid(email)) {
            throw new GraphQLError('Invalid email', {
              extensions: {
                  code: 'INVALID_INPUT',
              },
          });
          }
          const newUser = await userRepo.addUser(name, email);
          return mapUserToGraphQL(newUser);
        }
        catch (err) {
          if (err instanceof GraphQLError) {
            throw err;
        }
          throw new Error(err.message);
        }
      },
      deleteUser: async  (parent, args) => {
        try {
          const {id} = args;
          const deletedUser = await userRepo.deleteUser(id);
          return mapUserToGraphQL(deletedUser);
        }
        catch (err) {
          throw new Error(err.message);
        }
      }
    }
  };
  
  module.exports = resolvers;
  