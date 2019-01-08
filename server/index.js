// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { MongoClient } from "mongodb";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import cors from "cors";

import { getResolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
  require("babel-core/register");
  require("babel-polyfill");
}

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbUrl = `mongodb://${dbUser}:${dbPass}@ds149984.mlab.com:49984/roddy-dev`;

async function establishGraphQL() {
  try {
    const db = await MongoClient.connect(dbUrl);

    const Collections = {
      Users: db.collection("users"),
      Contacts: db.collection("contacts")
    };

    const resolvers = getResolvers(Collections);
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
    app.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    );
  } catch (e) {
    console.log(e);
  }
}

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
establishGraphQL();

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
