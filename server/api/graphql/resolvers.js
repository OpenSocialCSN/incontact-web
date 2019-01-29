export const getResolvers = ({ Users, Contacts }) => ({
  Query: {
    user: Users.getUser,
    users: Users.getUsers,
    contact: Contacts.getContact,
    contacts: Contacts.getContacts
  },
  User: {
    integrations: Users.getIntegrations,
    contacts: Contacts.getContactsForUser
  },
  Contact: {
    user: ({ userId: _id }) => Users.getUser(null, { _id }),
    social: Contacts.getSocialForContact
  },
  Mutation: {
    //USERS
    createUser: Users.createUser,
    updateUser: Users.updateUser,
    addUserIntegration: Users.addUserIntegration,
    updateUserIntegration: Users.updateUserIntegration,
    deleteUserIntegration: Users.deleteUserIntegration,
    //CONTACTS
    createContact: Contacts.createContact,
    updateContact: Contacts.updateContact,
    addSocial: Contacts.addSocial,
    deleteContact: Contacts.deleteContact,
    deleteAllContacts: Contacts.deleteAllContacts,

    clearDatabase: async () => {
      await Contacts.clearCollection();
      await Users.clearCollection();
      return 200;
    }
  }
});
