import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(_source, _args, context) {
          return `my master, ${context.owner.name}`
        }
      }
    }
  })
})

// 君のご主人様が誰であるか教えてあげよう (*˘꒳˘*) ふふ
const context = {
  owner: {
    name: 'asa-taka',
    favoriteThings: ['wasabi', 'katsuo-bushi'],
  }
}

// rootValue は一旦おやすみ (*˘꒳˘*) ｽﾔｧ...
const rootValue = undefined

graphql(schema, '{ hello }', rootValue, context)
  .then(console.log, console.error)