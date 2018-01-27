import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
      }
    }
  })
})

const rootValue = {
  hello() { return 'world in the rootValue' }
}

graphql(schema, `{ hello }`, rootValue).then(console.log, console.error)
