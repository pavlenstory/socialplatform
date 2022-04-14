const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const {MONGODB} = require('./config');
const resolvers = require('./graphql/resolvers/index');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected')
    return server.listen({port:5002})
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
})