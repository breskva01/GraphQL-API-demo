require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sequelize = require('./db');

sequelize.sync({ force: false })
  .then(() => console.log('Data synced and tables ready.'))
  .catch(err => console.log('Error syncing database:', err));

const PORT = process.env.SERVER_PORT || 4000;

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.error('Internal error:', err);

    return {
      message: err.message,
      code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
