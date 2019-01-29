import { executeQuery, generateArgs } from "../helpers/graphqlHelpers";

export const getUserById = userId => {
  const query = `
      query GetUserById {
        user(_id:"${userId}"){
          _id
          createdAt
          firstName
          lastName
          email
          accounts {
            _id
            serviceName
            accountName
            url
            apiToken
            syncStatus
          }
          contacts {
            _id
            homeEmail
            workEmail
            firstName
            lastName
            workPhone
            homePhone
            homeAddress
            workAddress
            imageUrl
            social {
              linkedin
              facebook
              skype
              instagram
              twitter
              webpage
            }
          }
        }
      }`;

  return executeQuery(query);
};

export const createUser = (email, password) => {
  if (!email) throw new Error("Bad args @ createUser");

  const args = `email:"${email}"`;
  const query = `
      mutation CreateUser {
        createUser(${args}){
          _id
        }
      }`;

  return executeQuery(query);
};

export const addUserAccount = args => {
  args.syncStatus = "UNAUTHED";
  const inlineArgs = generateArgs(args);
  const query = `
      mutation AddIntegration {
        addUserAccount(${inlineArgs}){
          _id
          serviceName
          syncStatus
          url
          accountName
        } 
      }`;
  return executeQuery(query);
};

export const deleteUserIntegrationAccount = args => {
  const inlineArgs = generateArgs(args);
  const query = `
      mutation DeleteIntegration {
        deleteUserAccount(${inlineArgs}) 
      }`;
  return executeQuery(query);
};
