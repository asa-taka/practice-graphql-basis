import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

const PresentPlannerType = new GraphQLObjectType({
  name: 'PresentPlanner',
  fields: {
    plans: {
      type: new GraphQLList(GraphQLString),
      resolve(_source, _args, context) {
        return context.owner.favoriteThings
      }
    },
    bestOne: {
      type: GraphQLString,
      resolve(source) {
        return source.plans[0]
      }
    },
    randomOne: {
      type: GraphQLString,
      resolve(source) {
        return source.plans[0] // ランダマイズコードを適当に...
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(_source, _args, context) {
          return `my master, ${context.owner.name}`
        }
      },
      present: {
        type: PresentPlannerType,
        resolve(source, args, context) {
          return {}
        }
      }
    }
  }),
  types: [PresentPlannerType]
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
graphql(schema, '{ present { plans bestOne } }', rootValue, context)
  .then(console.log, console.error)