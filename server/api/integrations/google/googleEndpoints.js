import authClient from "./googleAuth";
import { getConnections } from "./getConnections";

const establishGoogleEndpoints = function(expressApp, graphQlResolvers) {
  expressApp.get("/integrations/google/authUrl", (req, res) => {
    const { userId, userAccountId, forwardingRoute } = req.query;
    const authUrl = authClient.getAuthUrl({
      userId,
      userAccountId,
      forwardingRoute
    });
    res.statusCode = 302;
    res.setHeader("Location", authUrl);
    res.end();
  });

  expressApp.get("/integrations/google/oauth2callback", async (req, res) => {
    const code = req.query.code;
    const tokens = await authClient.getToken(code);
    const connections = await getConnections(tokens);
    console.log(`found ${connections.length} connections`);
    let { userId, userAccountId, forwardingRoute } = JSON.parse(
      req.query.state
    );
    connections.forEach(async c => {
      const { social } = c;
      delete c.social;
      c.userId = userId;
      const { _id } = await graphQlResolvers.Mutation.createContact(null, c);
      if (social) {
        social.contactId = _id;
        graphQlResolvers.Mutation.addSocial(null, social);
      }
    });

    graphQlResolvers.Mutation.updateUserAccount(null, {
      userId,
      _id: userAccountId,
      syncStatus: "SYNCED"
    });

    forwardingRoute = forwardingRoute || "";
    res.statusCode = 302;
    res.setHeader(
      "Location",
      process.env.NODE_ENV === "production"
        ? `https://incontactme.herokuapp.com/${forwardingRoute}`
        : `http://localhost:3000/${forwardingRoute}`
    );

    // res.send(connections);

    res.end();
  });
};

export default establishGoogleEndpoints;
