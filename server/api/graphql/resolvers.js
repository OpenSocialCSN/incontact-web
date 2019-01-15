import { ObjectId } from "mongodb";

export const getResolvers = ({ Users, Contacts }) => ({
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
    }
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      const res = await Users.insertOne(args);
      return prepare(res.ops[0]);
    },
    createContact: async (root, args) => {
      args.displayName = generateDisplayName(args);
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
    deleteContact: async (root, args) => {
      let x = await Contacts.deleteOne({ _id: ObjectId(args._id) });
      // return delete count
      return x.result.n;
    }
  }
});

const prepare = o => {
  o._id = o._id.toString();
  return o;
};

const generateDisplayName = contact => {
  if (contact.firstName || contact.lastName) {
    return `${contact.firstName || ""}${
      contact.firstName && contact.lastName ? ` ` : ``
    }${contact.lastName || ""}`;
  }
  return contact.email || contact.homePhone || contact.workPhone || "?";
};
