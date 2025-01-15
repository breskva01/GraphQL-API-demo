const userRepo = require('./repo/userRepo');

const resolvers = {
    Query: {
      users: () => userRepo.getUsers(),
    },
    Mutation: {
      addUser: (parent, args) => {
        const {name, email} = args;
        return userRepo.addUser(name, email);
      }
    }
  };
  
  module.exports = resolvers;
  