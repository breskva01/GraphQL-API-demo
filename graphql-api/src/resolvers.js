const userRepo = require('./repo/userRepo');

const resolvers = {
    Query: {
      users: async () => {
        try {
          return await userRepo.getUsers();
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
          return await userRepo.addUser(name, email);
        }
        catch (err) {
          throw new Error(err.message);
        }
      }
    }
  };
  
  module.exports = resolvers;
  