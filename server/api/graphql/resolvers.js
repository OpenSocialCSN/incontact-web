import { ObjectId } from "mongodb";

export const getResolvers = ({ Users, Contacts, Social }) => ({
  Query: {
    user: async (root, { _id }) => {
      return prepare(await Users.findOne(ObjectId(_id)));
    },
    users: async () => {
      return (await Users.find({}).toArray()).map(prepare);
    },
    contact: async (root, { _id }) => {
      return prepare(await Contacts.findOne(ObjectId(_id)));
    }
  },
  User: {
    accounts: async ({ _id }, { first = 0, skip = 0 }) => {
      const res = await Users.findOne(ObjectId(_id));
      const accounts = res && res.accounts ? res.accounts : [];
      return accounts;
    },
    contacts: async ({ _id }, { first = 0, skip = 0 }) => {
      return (await Contacts.find({ userId: _id })
        .limit(first)
        .skip(skip)
        .toArray()).map(prepare);
    }
  },
  Contact: {
    user: async ({ userId }) => {
      return prepare(await Users.findOne(ObjectId(userId)));
    },
    social: async ({ _id }) => {
      const res = await Social.findOne(ObjectId(_id));
      return res ? prepare(res) : null;
    }
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      const res = await Users.insertOne(args);
      return prepare(res.ops[0]);
    },
    updateUser: async (root, args) => {
      const query = { _id: ObjectId(args._id) };
      delete args._id;
      args.updatedOn = new Date().getTime();
      await Users.update(query, { $set: args });
      const updated = await Users.findOne(ObjectId(query._id));
      return updated;
    },
    addUserAccount: async (root, args) => {
      const _id = ObjectId(args.userId);
      const user = await Users.findOne(_id);
      if (user.accounts) {
        user.accounts.push(args);
      } else {
        user.accounts = [args];
      }
      const query = { _id: ObjectId(args.userId) };
      delete args.userId;
      await Users.update(query, { $set: user });
      return args;
    },
    createContact: async (root, args) => {
      const res = await Contacts.insert(args);
      return prepare(res.ops[0]);
    },
    updateContact: async (root, args) => {
      const query = { _id: ObjectId(args._id) };
      delete args._id;
      args.updatedOn = new Date().getTime();
      await Contacts.update(query, { $set: args });
      const updated = await Contacts.findOne(ObjectId(query._id));
      return updated;
    },
    addSocial: async (root, args) => {
      const _id = ObjectId(args.contactId);
      const existing = await Social.findOne(_id);
      args._id = _id;
      delete args.contactId;
      if (existing) {
        await Social.update({ _id }, { $set: args });
        return await Social.findOne(_id);
      } else {
        const res = await Social.insert(args);
        return prepare(res.ops[0]);
      }
    },
    deleteContact: async (root, args) => {
      const res = await Contacts.deleteOne({ _id: ObjectId(args._id) });
      // return delete count
      return res.result.n;
    },
    deleteAllContacts: async () => {
      const res = await Contacts.remove({});
      return res.result.n;
    },
    clearDatabase: async () => {
      await Contacts.remove({});
      await Social.remove({});
      await Users.remove({});
      return 200;
    }
  }
});

const prepare = o => {
  o._id = o._id.toString();
  return o;
};
