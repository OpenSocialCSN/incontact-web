import "babel-core/register";
import "babel-polyfill";
import express from "express";

import establishIntegrationEndpoints from "./integrations";
import establishGraphQl from "./graphql";

const exampleRouter = express.Router();
exampleRouter.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
exampleRouter.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

const establishEndpoints = async function(app) {
  const graphQlResolvers = await establishGraphQl(app);
  establishIntegrationEndpoints(app, graphQlResolvers);
  app.use("/", exampleRouter);
};

export default establishEndpoints;
