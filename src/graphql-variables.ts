import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        args: {
          me: { type: GraphQLString }
        },
        resolve(_, args) {
          return args.me || 'world'
        }
      }
    }
  })
})

const requestString = `
  # 引数を使用しないパターン
  query greeting {
    hello
  }

  # 引数がクエリ内に固定されたパターン
  query greetingForMe {
    hello(me: "asa-taka")
  }

  # 引数を実行時に受け取るパターン
  query greetingFor($me: String) {
    hello(me: $me)
  }
`

// operationName と variables を指定して好みのクエリを実行 (*˘꒳˘*) えらべるしあわせ
const operationName = 'greetingFor'
const variables = { me: 'asa-taka in variables' }

// rootValue と context は一旦おやすみ (*˘꒳˘*) ｽﾔｧ...
const rootValue = undefined
const context = undefined

graphql(schema, requestString, rootValue, context, variables, operationName)
  .then(console.log, console.error)