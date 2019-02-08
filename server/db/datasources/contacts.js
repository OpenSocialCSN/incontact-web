import { ObjectId } from "mongodb";

import prepare from "./prepare";

let Social;

export default class ContactsDataSource {
  constructor(db) {
    this.db = db;
    this.store = db.collection("contacts");
    Social = db.collection("social");
  }

  //QUERIES
  getContact = async (root, { _id }) => {
    return prepare(await this.store.findOne(ObjectId(_id)));
  };

  getContacts = async (root, { _id }) => {
    return (await this.store.find({}).toArray()).map(prepare);
  };

  getContactsForUser = async ({ _id }, { first = 0, skip = 0 }) => {
    return (await this.store
      .find({ userId: _id })
      .limit(first)
      .skip(skip)
      .toArray()).map(prepare);
  };

  getSocialForContact = async ({ _id }) => {
    const res = await Social.findOne(ObjectId(_id));
    return res ? prepare(res) : null;
  };

  //MUTAITONS
  createContact = async (root, args) => {
    const res = await this.store.insert(args);
    return prepare(res.ops[0]);
  };

  updateContact = async (root, args) => {
    const query = { _id: ObjectId(args._id) };
    delete args._id;
    args.updatedOn = new Date().getTime();
    await this.store.update(query, { $set: args });
    const updated = await this.store.findOne(ObjectId(query._id));
    return updated;
  };

  addSocial = async (root, args) => {
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
  };

  deleteContact = async (root, args) => {
    const res = await this.store.deleteOne({ _id: ObjectId(args._id) });
    // return delete count
    return res.result.n;
  };

  deleteAllContacts = async () => {
    const res = await this.store.remove({});
    return res.result.n;
  };

  clearCollection = async () => {
    await this.store.remove({});
    await Social.remove({});
  };
}
