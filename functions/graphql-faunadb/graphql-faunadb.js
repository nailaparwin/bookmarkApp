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
  addBook(title: String!, url: String!, about: String!): Book  
  deleteBook(id: ID!): Book
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
         
        q.Map(
          q.Paginate(q.Match(q.Index("booksList"))),
          q.Lambda((x) => q.Get(x))
        )
        );
        console.log('this is ',result.data);
        result.data.map(d => console.log(d.ref.id))
        return result.data.map((d) => ({
          id: d.ref.id,          
          title: d.data.title,
          url: d.data.url,
          about: d.data.about
        
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





