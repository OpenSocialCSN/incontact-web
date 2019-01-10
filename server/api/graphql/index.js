import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

import { getResolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = `mongodb://${dbUser}:${dbPass}@ds149984.mlab.com:49984/roddy-dev`;

async function establishGraphQL(app) {
  try {
    const db = await MongoClient.connect(dbUrl);
    const mongoCollections = {
      Users: db.collection("users"),
      Contacts: db.collection("contacts")
    };
    const resolvers = getResolvers(mongoCollections);
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });
    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
  } catch (e) {
    console.log(e);
  }
}

export default establishGraphQL;
