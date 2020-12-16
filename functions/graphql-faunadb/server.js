//https://github.com/apollographql/apollo-server/issues/1989

const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require('faunadb'),
  q = faunadb.query;


const typeDefs = gql`
type Query {
  books: [Book]!
}

type Book {
  id: ID!
  title: String!
  url: String!
  about: String!
}

type Mutation {
  addBook(title: String!, url: String!, about: String!): Todo  
  deleteBook(id: ID!): Todo
}
`;


const books = {};
//let todoIndex = 0;
var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });

const resolvers = {
  Query: {
    
    books: async (parent, args, context) => {
      try {
        
        let result = await client.query(
          //q.Get(q.Map(q.Collection('todos')))
          q.Paginate(q.Match(q.Index("booksList")))
        );
        //console.log('this is ',result);
        return result.data.map(([ref, id, title, url, about]) => ({
          id: ref.id,          
          title,
          url,
          about
        }));
    } catch (err) {
      return err.toString();
    }
  }
  
  },


  Mutation: {
    addBook: async (_, { title, url, about }) => {
      try {        
        const result = await client.query(
          q.Create(q.Collection("books"), {
            data: {
              title,
              url,
              about,
            },
          })
        );
        // console.log(result.data.task);
        return { ...result.data,
          id: result.ref.id}
      } catch (error) {
        return error.toString();
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        
        const result = await client.query(
          q.Delete(q.Ref(q.Collection("books"), id))
        );
        console.log("after delete" ,result);
        return result.data;
      } catch (error) {
        return error;
      }
    },
    
  },
};
  

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

exports.handler = server.createHandler();





