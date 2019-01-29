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
  integrations:[UserIntegration]
}

type UserIntegration {
  _id: ID
  serviceName:String # 'google', 'outlook', etc.
  accountName:String # 'email@url.com' or screen name
  url:String         # 'linkedin.com/mypage' and the like
  apiToken:String    # token for accessing service's api
  syncStatus: String # UNAUTHED | SYNCED | ERR_DUPLICATE_ACCOUNT 
}

type Social {
  _id: ID
  linkedin:String
  twitter:String
  facebook:String
  instagram:String
  skype:String
  webpage:String
}

type Contact {
  _id: ID
  userId: ID!
  createdAt:String
  updatedOn:String
  user: User
  firstName: String
  lastName: String
  title: String
  homeEmail: String
  workEmail: String
  organization:String
  workAddress:String
  homeAddress:String
  workPhone:String
  homePhone:String
  imageUrl:String
  note:String
  birthday:String
  social:Social
}

type Mutation {
  createUser(firstName: String, lastName: String, email: String): User
  updateUser(_id: ID!, 
    firstName: String, 
    lastName: String,
    email: String,
  ): User
  addUserIntegration(userId:ID!,
    serviceName:String,
    accountName:String,
    url:String,
    apiToken:String,
    syncStatus: String): UserIntegration
  deleteUserIntegration(_id:ID!, userId:ID!): Int
  updateUserIntegration(_id:ID!,
    userId:ID!,
    serviceName:String,
    accountName:String,
    url:String,
    apiToken:String,
    syncStatus: String): UserIntegration
  createContact(userId: ID!, firstName: String, lastName: String, homeEmail: String,
    workEmail: String, title: String, organization:String, workAddress:String, homeAddress:String,
    workPhone:String, homePhone:String, imageUrl:String, birthday:String, note:String): Contact
  updateContact(_id: ID!, firstName: String, lastName: String, homeEmail: String,
    workEmail: String, title: String, organization:String, workAddress:String, 
    homeAddress:String, workPhone:String, homePhone:String, imageUrl:String, birthday:String, note:String): Contact
  addSocial(contactId:ID!,
    linkedin:String,
    twitter:String,
    facebook:String,
    instagram:String,
    skype:String,
    webpage:String): Social
  deleteContact(_id:ID!): Int
  deleteAllContacts(confirm:Boolean): Int
  clearDatabase(confirm:Boolean): Int
}

schema {
  query: Query
  mutation: Mutation
}
`
];
