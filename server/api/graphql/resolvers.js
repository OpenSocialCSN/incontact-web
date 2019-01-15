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
    }
  }
});

const prepare = o => {
  o._id = o._id.toString();
  return o;
};
