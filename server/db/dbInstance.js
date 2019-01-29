import { MongoClient } from "mongodb";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

class DbInstance {
  constructor() {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    this.dbUrl = `mongodb://${dbUser}:${dbPass}@ds149984.mlab.com:49984/roddy-dev`;
  }

  async getConnection() {
    return (
      this.connection || this.connectingPromise || this.connectToDatabase()
    );
  }

  async connectToDatabase() {
    try {
      this.connectingPromise = MongoClient.connect(this.dbUrl);
      this.connection = await this.connectingPromise;
      this.connectingPromise = null;
      return this.connection;
    } catch (e) {
      console.log(`Error connecting to database:`, e);
    }
  }
}

export default new DbInstance();
