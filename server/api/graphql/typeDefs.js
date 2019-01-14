export const typeDefs = [
  `
type Query {
  user(_id: ID): User
  users: [User]
  contact(_id: ID): Contact
  contacts: [Contact]
}

type User {
  _id: ID
  createdAt:String
  updatedOn:String
  firstName: String
  lastName: String
  email: String
  contacts(skip:Int, first:Int): [Contact]
}

type Contact {
  _id: ID
  userId: ID!
  createdAt:String
  updatedOn:String
  user: User
  firstName: String
  lastName: String
  displayName: String
  email: String
  title: String
  organization:String
  workAddress:String
  homeAddress:String
  workPhone:String
  homePhone:String
  imageUrl:String
}

type Mutation {
  createUser(firstName: String, lastName: String, email: String): User
  createContact(userId: ID!, firstName: String, lastName: String, 
    displayName: String, email: String,
    title: String, organization:String, workAddress:String, homeAddress:String,
    workPhone:String, homePhone:String, imageUrl:String): Contact
  }

schema {
  query: Query
  mutation: Mutation
}
`
];
