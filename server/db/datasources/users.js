import { ObjectId } from "mongodb";

import prepare from "./prepare";

export default class UsersDataSource {
  constructor(db) {
    this.db = db;
    this.store = db.collection("users");
  }

  // QUERY
  getUser = async (root, { _id }) => {
    return prepare(await this.store.findOne(ObjectId(_id)));
  };

  getUsers = async () => {
    return (await this.store.find({}).toArray()).map(prepare);
  };

  getIntegrations = async ({ _id }) => {
    const res = await this.store.findOne(ObjectId(_id));
    const integrations = res && res.integrations ? res.integrations : [];
    return integrations;
  };

  // MUTATIONS
  createUser = async (root, args, context, info) => {
    const res = await this.store.insertOne(args);
    return prepare(res.ops[0]);
  };

  updateUser = async (root, args) => {
    const query = { _id: ObjectId(args._id) };
    delete args._id;
    args.updatedOn = new Date().getTime();
    await this.store.update(query, { $set: args });
    const updated = await this.store.findOne(ObjectId(query._id));
    return updated;
  };

  addUserIntegration = async (root, args) => {
    const _id = ObjectId(args.userId);
    const user = await this.store.findOne(_id);
    args._id = new ObjectId();
    if (user.integrations) {
      // prevent multiple blank integrations being created
      // if user tries multiple times to sync
      if (args.syncStatus === "UNAUTHED") {
        const existing = user.integrations.find(
          acc => acc.syncStatus === "UNAUTHED"
        );
        if (existing) return existing;
      }
      user.integrations.push(args);
    } else {
      user.integrations = [args];
    }
    const query = { _id: ObjectId(args.userId) };
    delete args.userId;
    await this.store.update(query, { $set: user });
    return args;
  };

  updateUserIntegration = async (root, args) => {
    const userId = ObjectId(args.userId);
    delete args.userId;
    const user = await this.store.findOne(userId);
    const integrations = user.integrations || [];
    //id check must not be triple equals ===
    const acctIndex = integrations.findIndex(
      acct => acct && acct._id == args._id
    );
    if (acctIndex < 0)
      return new Error(`No account found with id: ${args._id}`);
    const updateObject = Object.assign(integrations[acctIndex], args);
    integrations[acctIndex] = updateObject;
    const query = { _id: userId };
    await this.store.update(query, { $set: user });
    return updateObject;
  };

  deleteUserIntegration = async (root, { _id, userId }) => {
    userId = ObjectId(userId);
    const user = await this.store.findOne(userId);
    const { integrations } = user;
    const accIndex = integrations.findIndex(acc => acc._id == _id);
    if (accIndex < 0) return 0; // no acc found
    integrations.splice(accIndex, 1);
    await this.store.update({ _id: userId }, { $set: user });
    return 1;
  };

  clearCollection = async () => this.store.remove({});
}
