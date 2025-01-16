const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('./db');
const User = require('./model/user');

sequelize.sync({ force: false })
  .then(() => console.log('Data synced and tables ready.'))
  .catch(err => console.log('Error syncing database:', err));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
