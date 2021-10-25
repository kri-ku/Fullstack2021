module.exports = `
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    books: [Book!]
  }

  type Query {
    authorCount: Int!,
    allAuthors: [Author!]!,
  }

  type Mutation {
    editAuthor(
      name: String!,
      setBornTo: Int!,
    ): Author
  }
`

