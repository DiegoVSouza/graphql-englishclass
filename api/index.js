const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('graphql-tools')

const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolvers')

// const typeDefs = mergeTypeDefs([userSchema, produtoSchema]); caso precise de mais um schema

const typeDefs = [userSchema]
const resolvers = [userResolvers]
const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url})=>{
    console.log(`Servidor rodando na porta ${url}`)
})