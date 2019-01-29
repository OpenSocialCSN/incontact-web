import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import bodyParser from "body-parser";

import { getResolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import dbInstance from "../../db/dbInstance";
import UsersDataSource from "../../db/datasources/users";
import ContactsDataSource from "../../db/datasources/contacts";

async function establishGraphQL(app) {
  let resolvers;
  try {
    const db = await dbInstance.getConnection();
    const datasources = {
      Users: new UsersDataSource(db),
      Contacts: new ContactsDataSource(db)
    };
    resolvers = getResolvers(datasources);
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });
    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
  } catch (e) {
    console.log(e);
  }
  return resolvers;
}

export default establishGraphQL;
