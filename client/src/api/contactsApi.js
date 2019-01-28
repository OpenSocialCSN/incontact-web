import { executeQuery, generateArgs } from "./graphqlHelpers";

export const createContact = (contact, userId) => {
  if (!contact) throw new Error("Bad arg @ createContact:", contact);
  const args = `userId:"${userId}", ${generateArgs(contact)}`;
  const query = `
      mutation CreateContact {
        createContact(${args}){
          _id
        }
      }`;
  return executeQuery(query);
};

export const updateContact = contact => {
  if (!contact || !contact._id)
    throw new Error("Bad arg @ updateContact:", contact);
  const args = generateArgs(contact);

  const query = `
      mutation UpdateContact {
        updateContact(${args}){
          _id
        }
      }`;

  return executeQuery(query);
};

export const deleteContactById = contactId => {
  if (!contactId) throw new Error("No id passed @ deleteContact");

  const query = `
      mutation DeleteContact{
        deleteContact(_id:"${contactId}")
      }`;

  return executeQuery(query);
};
