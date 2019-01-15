import authClient from "./googleAuth";
import { getConnections } from "./getConnections";

const establishGoogleEndpoints = function(expressApp, graphQlResolvers) {
  expressApp.get("/integrations/google/authUrl", (req, res) => {
    // res.send(authClient.getAuthUrl());
    const authUrl = authClient.getAuthUrl();
    res.statusCode = 302;
    res.setHeader("Location", authUrl);
    res.end();
  });

  expressApp.get("/integrations/google/oauth2callback", async (req, res) => {
    const code = req.query.code;
    const tokens = await authClient.getToken(code);
    const connections = await getConnections(tokens);
    console.log(`found ${connections.length} connections`);
    // console.log("connections:", connections);

    res.send(connections);
    connections.forEach(async c => {
      const { social } = c;
      delete c.social;
      c.userId = "5c3cd65a8474e01b17a8101d"; //TODO:
      const { _id } = await graphQlResolvers.Mutation.createContact(null, c);
      if (social) {
        social.contactId = _id;
        graphQlResolvers.Mutation.addSocial(null, social);
      }
    });

    // res.statusCode = 302;
    // res.setHeader("Location", "http://localhost:3000");
    // res.end();
  });
};

export default establishGoogleEndpoints;

export const executeQuery = query => {
  return fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query
    })
  })
    .then(r => r.json())
    .then(res => {
      return new Promise((resolve, reject) => {
        if (res.errors) {
          reject(res.errors);
        } else {
          resolve(res.data);
        }
      });
    });
};
